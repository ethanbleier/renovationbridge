import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const formData = await request.json();
    
    // Get your GoHighLevel API key from environment variables
    const apiKey = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;
    
    if (!apiKey || !locationId) {
      throw new Error('GoHighLevel API credentials not configured');
    }
    
    // Format the data for GoHighLevel
    const ghlData = {
      email: formData.email,
      phone: formData.phone,
      firstName: formData.name.split(' ')[0],
      lastName: formData.name.includes(' ') ? formData.name.split(' ').slice(1).join(' ') : '',
      customField: {
        "city": formData.city,
        "description": formData.description
      },
      tags: ["website-lead", "renovation-bridge"]
    };
    
    // Send the data to GoHighLevel's contact API
    const ghlResponse = await fetch(`https://rest.gohighlevel.com/v1/contacts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(ghlData)
    });
    
    if (!ghlResponse.ok) {
      const errorData = await ghlResponse.json();
      console.error('GoHighLevel API error:', errorData);
      throw new Error('Failed to submit to GoHighLevel');
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in GoHighLevel submission:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
} 