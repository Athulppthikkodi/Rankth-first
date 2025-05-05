import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch('https://apitester.acodez.ca/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'RankthUI/1.0',
      },
      body: JSON.stringify(body),
      credentials: 'include'
    })

    // Check content type header
    const contentType = response.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      const text = await response.text()
      let errorMessage = 'Server returned non-JSON response'
      
      // Check if response appears to be HTML
      if (text.trim().toLowerCase().startsWith('<!doctype') || text.trim().startsWith('<html')) {
        errorMessage = 'Server returned HTML instead of JSON. This usually indicates a server error or incorrect API URL'
      }
      
      console.error('Invalid response format:', {
        status: response.status,
        contentType,
        body: text.substring(0, 500) // Increased preview length for better debugging
      })
      
      return NextResponse.json(
        {
          errors: [{
            message: errorMessage,
            status: response.status,
            contentType,
            details: text.substring(0, 500)
          }]
        },
        { status: 502 }
      )
    }

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { errors: [{ message: data.message || 'API request failed' }] },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('API Route Error:', error)
    return NextResponse.json(
      { errors: [{ message: String(error) }] },
      { status: 500 }
    )
  }
}
