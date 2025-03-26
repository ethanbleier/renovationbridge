type FormType = 'contact' | 'get-started' | 'calculator' | 'referral' | 'guide' | 'contractor';

// Default tags to apply to all submissions
const DEFAULT_TAGS = ['website-lead', 'renovation-bridge'];

// Get specific tags based on form type
export function getFormTags(formType: FormType): string[] {
  const tags = [...DEFAULT_TAGS];
  
  switch (formType) {
    case 'guide':
      tags.push('urgent-guide');
      break;
    case 'contractor':
      tags.push('contractor-application');
      break;
    default:
      tags.push('urgent-call');
      break;
  }
  
  // Add specific form type tag
  tags.push(formType);
  
  return tags;
}

// Format data for GoHighLevel with proper tags
export function formatGHLData(formData: any, formType: FormType) {
  // Get name components if available
  const firstName = formData.firstName || (formData.name ? formData.name.split(' ')[0] : '');
  const lastName = formData.lastName || (formData.name && formData.name.includes(' ') 
    ? formData.name.split(' ').slice(1).join(' ') 
    : '');
  
  // Extract description/message content from various field names
  let description = '';
  if (formData.projectDescription) {
    description = formData.projectDescription;
  } else if (formData.message) {
    description = formData.message;
  } else if (formData.description) {
    description = formData.description;
  }
  
  // Base data structure for GHL
  const ghlData = {
    email: formData.email,
    phone: formData.phone,
    firstName,
    lastName,
    // Add the description to a note field that GHL will display in the dashboard
    note: description,
    // Add the project description to the dedicated contact.project_description field
    contact: {
      project_description: description
    },
    customField: {
      ...Object.entries(formData)
        .filter(([key]) => !['email', 'phone', 'firstName', 'lastName', 'name', 'message', 'projectDescription', 'description'].includes(key))
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
    },
    tags: getFormTags(formType)
  };
  
  return ghlData;
}

// Generic function to submit to GoHighLevel
export async function submitToGHL(formData: any, formType: FormType) {
  try {
    // Get GoHighLevel API credentials
    const apiKey = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;
    
    if (!apiKey || !locationId) {
      throw new Error('GoHighLevel API credentials not configured');
    }
    
    // Format the data
    const ghlData = formatGHLData(formData, formType);
    
    // Send the data to GoHighLevel's contact API
    const ghlResponse = await fetch(`https://rest.gohighlevel.com/v1/contacts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(ghlData)
    });
    
    // Handle the response
    const responseData = await ghlResponse.json();
    
    if (!ghlResponse.ok) {
      console.error('GoHighLevel API error:', responseData);
      throw new Error('Failed to submit to GoHighLevel');
    }
    
    return { success: true, data: responseData };
  } catch (error) {
    console.error('Error in GoHighLevel submission:', error);
    throw error;
  }
} 