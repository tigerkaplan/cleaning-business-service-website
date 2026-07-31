const fs = require('fs')
const path = require('path')

const root = process.cwd()
const activeDirs = ['app', 'components', 'config', 'content', 'lib', 'types']
const banned = [
  '[BRAND_NAME]',
  '[PHONE]',
  '[EMAIL]',
  '[BRAND_DOMAIN]',
  '[WHATSAPP_NUMBER]',
  '[ICO REGISTRATION NUMBER]',
]

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, files)
    else if (/\.(ts|tsx|js|jsx|md|css)$/.test(entry.name)) files.push(full)
  }
  return files
}

const matches = []
for (const dir of activeDirs) {
  for (const file of walk(path.join(root, dir))) {
    const text = fs.readFileSync(file, 'utf8')
    for (const token of banned) {
      if (text.includes(token)) matches.push(`${path.relative(root, file)} contains ${token}`)
    }
  }
}

if (matches.length > 0) {
  console.error('Customer-facing placeholder scan failed:')
  console.error(matches.join('\n'))
  process.exit(1)
}
console.log('Placeholder scan passed.')
