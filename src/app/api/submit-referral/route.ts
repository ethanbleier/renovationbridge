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
    
    // Format the data for GoHighLevel - adjusted for real estate referral form
    const ghlData = {
      email: formData.homeownersEmail,
      phone: formData.homeownersPhone,
      firstName: formData.homeownersFullName.split(' ')[0],
      lastName: formData.homeownersFullName.includes(' ') ? formData.homeownersFullName.split(' ').slice(1).join(' ') : '',
      customField: {
        "homeownersAddress": formData.homeownersAddress,
        "projectDescription": formData.projectDescription,
        "agentsFullName": formData.agentsFullName,
        "referralSource": "Real Estate Agent"
      },
      tags: ["website-lead", "renovation-bridge", "real-estate-referral"]
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