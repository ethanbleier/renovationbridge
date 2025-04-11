import { getStoredTokens } from '@/utils/ghlAuth';

type FormType = 'contact' | 'get-started' | 'calculator' | 'referral' | 'guide' | 'contractor' | 'pdf-lead';

// Default tags to apply to all submissions
const DEFAULT_TAGS = ['website-lead', 'renovation-bridge'];

// Get specific tags based on form type
export function getFormTags(formType: FormType): string[] {
  const tags = [...DEFAULT_TAGS];
  
  // Base tags by form type
  switch (formType) {
    case 'contact':
    case 'get-started':
      tags.push('urgent-call');
      break;
    case 'guide':
      tags.push('urgent-guide');
      break;
    case 'contractor':
      tags.push('contractor-app');
      break;
    case 'referral':
      tags.push('referral');
      break;
    case 'pdf-lead':
      tags.push('pdf-download');
      tags.push('pricing');
      break;
    case 'calculator':
      tags.push('urgent-call');
      tags.push('pricing');
      break;
    default:
      break;
  }
  
  // Always add the form type as a tag
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

// Interface for GoHighLevel credentials
interface GHLCredentials {
  apiKey: string;
  locationId: string;
}

// Generic function to submit to GoHighLevel
export async function submitToGHL(formData: any, formType: FormType, credentials?: GHLCredentials) {
  try {
    // Get GoHighLevel API credentials from provided credentials, environment or token storage
    const tokenData = getStoredTokens();
    const apiKey = credentials?.apiKey || tokenData?.accessToken || process.env.GHL_API_KEY || process.env.NEXT_PUBLIC_GHL_API_KEY;
    const locationId = credentials?.locationId || tokenData?.locationId || process.env.GHL_LOCATION_ID || process.env.NEXT_PUBLIC_GHL_LOCATION_ID;
    
    if (!apiKey || !locationId) {
      throw new Error('GoHighLevel API credentials not configured');
    }
    
    // Format the data
    const ghlData = formatGHLData(formData, formType);
    
    // Log the formatted data being sent to GHL
    console.log('GHL Request - Form Type:', formType);
    console.log('GHL Request - Formatted Data:', JSON.stringify(ghlData, null, 2));
    
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
    
    // Log the complete response from GHL
    console.log('GHL Response - Status:', ghlResponse.status);
    console.log('GHL Response - Data:', JSON.stringify(responseData, null, 2));
    
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