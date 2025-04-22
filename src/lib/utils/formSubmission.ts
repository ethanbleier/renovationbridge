import { getStoredTokens } from '@/utils/ghlAuth';
import { sendFacebookEvent } from '@/lib/fbEvents';

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
  
  // Extract description/message content (prioritize)
  const description = formData.additional_comments || // Explicit field from get-started
                     formData.message ||           // Field from contact form
                     formData.projectDescription || // Field from contact form (legacy variants)
                     formData.description ||        // Field from contact form (legacy variants)
                     formData.work_description ||   // Field from contact form (legacy variants)
                     formData.project_details ||    // Field from contact form (legacy variants)
                     "No description provided";

  // Extract city (handle different possible field names)
  const city = formData.city || formData.propertyCity;
  
  // Fields to exclude from the customField object
  const standardFields = [
    'email', 'phone', 'firstName', 'lastName', 'name', 'note',
    'tags', 'dnd', 'contact', // GHL system fields 
    // Explicitly handled/mapped fields
    'message', 'projectDescription', 'description', 'additional_comments',
    'work_description', 'project_details', 'city', 'propertyCity' 
  ];

  // Build the customField OBJECT
  const customFieldObject: { [key: string]: any } = {};

  // Add description using the key GHL expects (based on get-started form)
  if (description && description !== "No description provided") {
    customFieldObject['additional_comments'] = description;
  }

  // Add city using the key GHL might expect (based on get-started form)
  if (city) {
    // Using propertyCity as the key, matching get-started form's successful submission key
    customFieldObject['propertyCity'] = city; 
  }

  // Add any other non-standard fields from formData
  Object.entries(formData).forEach(([key, value]) => {
    if (!standardFields.includes(key) && value !== undefined && value !== '' && value !== null) {
      customFieldObject[key] = value;
    }
  });

  // Base data structure for GHL
  const ghlData: any = {
    email: formData.email,
    phone: formData.phone,
    firstName,
    lastName,
    note: description, // Keep note for quick view in GHL
    tags: getFormTags(formType)
  };

  // Only add customField key if the object is not empty
  if (Object.keys(customFieldObject).length > 0) {
    ghlData.customField = customFieldObject;
  }

  return ghlData;
}

// Interface for GoHighLevel credentials
interface GHLCredentials {
  apiKey: string;
  locationId: string;
}

// Simplified function to track form submission in Facebook - server-side only
function trackFacebookFormSubmission(formData: any, formType: FormType) {
  try {
    // Only use server-side events since they're reliably working
    console.log('Tracking Facebook conversion with server-side event');
    
    // Extract user data
    const firstName = formData.firstName || (formData.name ? formData.name.split(' ')[0] : '');
    const lastName = formData.lastName || (formData.name && formData.name.includes(' ') 
      ? formData.name.split(' ').slice(1).join(' ') 
      : '');
      
    const message = formData.message || 
                   formData.additional_comments || 
                   formData.projectDescription || 
                   formData.description || 
                   '';
                   
    const city = formData.city || formData.propertyCity || '';
    
    return sendFacebookEvent({
      event_name: 'Lead',
      user_data: {
        email: formData.email,
        phone: formData.phone,
        firstName,
        lastName
      },
      custom_data: {
        form_type: formType,
        location: typeof window !== 'undefined' ? window.location.pathname : '/',
        city,
        message
      }
      // No test_event_code here - this avoids the "forced" test code issues
    });
  } catch (error) {
    console.error('Error tracking Facebook form submission:', error);
    // Don't throw - we don't want to block the form submission
    return Promise.resolve(false);
  }
}

// Generic function to submit to GoHighLevel
export async function submitToGHL(formData: any, formType: FormType, credentials?: GHLCredentials) {
  try {
    // Track form submission in Facebook (server-side only)
    const fbPromise = trackFacebookFormSubmission(formData, formType);
    
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
    
    // Send the data back to GoHighLevel's original contact POST API
    const ghlResponse = await fetch(`https://rest.gohighlevel.com/v1/contacts/`, { // Reverted endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      // Send the ghlData object directly as before
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
    
    // Wait for FB tracking to complete, but don't block on it
    await fbPromise.catch(e => console.error('FB tracking failed but form submission succeeded:', e));
    
    return { success: true, data: responseData };
  } catch (error) {
    console.error('Error in GoHighLevel submission:', error);
    throw error;
  }
} 