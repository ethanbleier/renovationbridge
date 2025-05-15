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
  
  // Extract description/message content (prioritize)
  const description = formData.additional_comments || // Explicit field from get-started
                     formData.message ||           // Field from contact form
                     formData.projectDescription || // Field from contact form (legacy variants)
                     formData.project_description || // Field from contact form (legacy variants)
                     formData.description ||        // Field from contact form (legacy variants)
                     formData.work_description ||   // Field from contact form (legacy variants)
                     formData.project_details ||    // Field from contact form (legacy variants)
                     "No description provided";

  // Extract city (handle different possible field names)
  const cityOrLocation = formData.city || formData.propertyCity || formData.location;
  
  // Fields to exclude from the customField object
  const standardFields = [
    'email', 'phone', 'firstName', 'lastName', 'name', 'note',
    'tags', 'dnd', 'contact', 'city',// GHL system fields 
    // Explicitly handled/mapped fields
    'message', 'projectDescription', 'description', 'additional_comments',
    'work_description', 'project_details', 'location', 'propertyCity',
    // Contractor form specific fields that are explicitly mapped
    'licenseNumber', 'hearAboutUs', 'website' 
  ];

  // Build the customField OBJECT
  const customFieldObject: { [key: string]: any } = {};

  // Add description using the key GHL expects (based on get-started form)
  if (description && description !== "No description provided") {
    customFieldObject['additional_comments'] = description;
  }

  // Add city using the new 'location' key expected by GHL
  if (cityOrLocation) {
    // Map the extracted value to the 'location' custom field key
    customFieldObject['location'] = cityOrLocation; 
  }

  // Contractor specific custom fields
  if (formType === 'contractor') {
    if (formData.licenseNumber) {
      customFieldObject['license'] = formData.licenseNumber;
    }
    if (formData.hearAboutUs) {
      customFieldObject['hear_about_us'] = formData.hearAboutUs;
    }
    if (formData.website) {
      customFieldObject['website'] = formData.website;
    }
    // Shotgun approach for description fields for contractor forms
    if (description && description !== "No description provided") {
      customFieldObject['project_description'] = description;
      customFieldObject['project_details'] = description;
      customFieldObject['work_description'] = description;
      // 'additional_comments' is already added above
    }
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
async function trackFacebookFormSubmission(formData: any, formType: FormType) {
  try {
    // Only use server-side events since they're reliably working
    console.log('Tracking Facebook conversion with server-side event');
    
    // Enhanced extraction of user data with better fallbacks
    const firstName = formData.firstName || 
                     (formData.name ? formData.name.split(' ')[0] : '') ||
                     (formData.fullName ? formData.fullName.split(' ')[0] : '');
                     
    const lastName = formData.lastName || 
                    (formData.name && formData.name.includes(' ') ? formData.name.split(' ').slice(1).join(' ') : '') ||
                    (formData.fullName && formData.fullName.includes(' ') ? formData.fullName.split(' ').slice(1).join(' ') : '');
      
    // Enhanced message extraction with more fallbacks
    const message = formData.message || 
                   formData.additional_comments || 
                   formData.projectDescription || 
                   formData.description ||
                   formData.comments ||
                   formData.project_details ||
                   formData.work_description ||
                   formData.details ||
                   '';
                   
    // Enhanced city extraction with more fallbacks
    const city = formData.city || 
                formData.propertyCity ||
                formData.location ||
                formData.propertyLocation ||
                formData.userCity ||
                '';
    
    // Ensure email and phone are properly extracted even with different field names
    const email = formData.email || formData.userEmail || '';
    const phone = formData.phone || formData.phoneNumber || formData.userPhone || formData.contactPhone || '';
    
    // Add debugging for tracking issues
    console.log('FB Server Event - Form Type:', formType);
    console.log('FB Server Event - Data:', {
      email,
      phone,
      firstName,
      lastName,
      city,
      message: message.substring(0, 50) + (message.length > 50 ? '...' : '') // Truncate for logs
    });
    
    // Get Facebook API credentials
    const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
    const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
    const FB_APP_ID = process.env.FB_APP_ID; // Get the App ID

    if (!FB_ACCESS_TOKEN || !FB_PIXEL_ID) {
      console.error('Facebook API credentials missing:', {
        hasAccessToken: !!FB_ACCESS_TOKEN,
        hasPixelId: !!FB_PIXEL_ID
      });
      return false;
    }
    
    // Try to use the existing server API endpoint first
    try {
      console.log('Attempting to use server API endpoint for Facebook tracking');
      
      // Create a minimal payload for the server API
      const serverPayload = {
        event_name: 'Lead',
        user_data: {
          email,
          phone,
          firstName,
          lastName
        },
        custom_data: {
          form_type: formType,
          city,
          message: message.substring(0, 255) // Truncate message to reasonable length
        }
      };
      
      // Use an absolute URL for the API endpoint
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://renovationbridge.com';
      const apiUrl = new URL('/api/fb-events', baseUrl).toString();
      
      console.log('Sending FB event to API endpoint:', apiUrl);
      
      const serverResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serverPayload)
      });
      
      if (serverResponse.ok) {
        const serverData = await serverResponse.json();
        console.log('Facebook server API response:', serverData);
        return true;
      } else {
        console.error('Facebook server API error:', {
          status: serverResponse.status,
          statusText: serverResponse.statusText
        });
        // Fall back to direct API call
      }
    } catch (serverError) {
      console.error('Error using server API for Facebook tracking, falling back to direct API:', serverError);
      // Continue to direct API call
    }
    
    // Hash user data for Facebook
    console.log('Falling back to direct Facebook API call');
    
    try {
      const crypto = require('crypto');
      
      // Hash user data for Facebook
      const hashedUserData: any = {};
      
      if (email) {
        hashedUserData.em = [crypto.createHash('sha256').update(email.toLowerCase().trim()).digest('hex')];
        hashedUserData.external_id = [crypto.createHash('sha256').update(email.toLowerCase().trim()).digest('hex')];
      }
      
      if (phone) {
        // Remove all non-numeric characters
        const cleanPhone = phone.replace(/\D/g, '');
        hashedUserData.ph = [crypto.createHash('sha256').update(cleanPhone).digest('hex')];
      }
      
      if (firstName) {
        hashedUserData.fn = [crypto.createHash('sha256').update(firstName.toLowerCase().trim()).digest('hex')];
      }
      
      if (lastName) {
        hashedUserData.ln = [crypto.createHash('sha256').update(lastName.toLowerCase().trim()).digest('hex')];
      }
      
      // Create the payload with data, access_token, and optionally app_id
      const payload: any = {
        data: [
          {
            event_name: 'Lead',
            event_time: Math.floor(Date.now() / 1000),
            action_source: 'website',
            user_data: hashedUserData,
            custom_data: {
              form_type: formType,
              city,
              message: message.substring(0, 255) // Truncate message to reasonable length
            },
          },
        ],
        access_token: FB_ACCESS_TOKEN,
        ...(FB_APP_ID && { app_id: FB_APP_ID })
      };

      // Send directly to Facebook - access token is now in the body
      const url = `https://graph.facebook.com/v18.0/${FB_PIXEL_ID}/events`;
      console.log('Sending FB event directly to Facebook API');
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error('Facebook API response not OK:', {
          status: response.status,
          statusText: response.statusText
        });
      }
      
      const data = await response.json();
      
      if (data.error) {
        console.error('Facebook API error:', data.error);
        return false;
      }
      
      console.log('Facebook event sent successfully:', data);
      return true;
    } catch (directApiError) {
      console.error('Error in direct Facebook API call:', directApiError);
      return false;
    }
  } catch (error) {
    console.error('Error tracking Facebook form submission:', error);
    // Don't throw - we don't want to block the form submission
    return false;
  }
}

// Helper function to hash data according to Facebook requirements
function hashData(data: string): string {
  if (!data) return '';
  
  const crypto = require('crypto');
  return crypto
    .createHash('sha256')
    .update(data.trim().toLowerCase())
    .digest('hex');
}

// Generic function to submit to GoHighLevel
export async function submitToGHL(formData: any, formType: FormType, credentials?: GHLCredentials) {
  try {
    // Track form submission in Facebook (server-side only)
    // Important: await this directly to ensure it completes before proceeding
    const fbSuccess = await trackFacebookFormSubmission(formData, formType);
    console.log('Facebook tracking result:', fbSuccess ? 'Success' : 'Failed');
    
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
    
    return { success: true, data: responseData };
  } catch (error) {
    console.error('Error in GoHighLevel submission:', error);
    throw error;
  }
} 