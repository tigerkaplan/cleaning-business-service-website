const endpoint = process.env.QUOTE_API_URL || 'http://localhost:3000/api/quote-request'

const payload = {
  name: 'Milestone Test Lead',
  phone: '07700 900000',
  email: 'milestone-test@example.com',
  service_type: 'Domestic',
  postcode: 'BN1 1AA',
  property_type: 'Flat',
  bedrooms: '2',
  bathrooms: '1',
  preferred_date: null,
  urgency: 'Medium',
  parking_access: 'Test only',
  photo_url: 'https://example.com/test-photos',
  message: 'Milestone 1 test submission. Delete after verification.',
  consent: true,
  website: '',
}

async function main() {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const body = await response.text()
  if (!response.ok) {
    console.error(`Quote API test failed: ${response.status}`)
    console.error(body)
    process.exit(1)
  }
  console.log('Quote API test passed.')
  console.log(body)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
