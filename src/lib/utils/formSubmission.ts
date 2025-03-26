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
  
  // Standard contact fields
  const standardFields = ['email', 'phone', 'firstName', 'lastName', 'name', 'message', 'projectDescription', 'description'];
  
  // Create custom fields array for GHL in the required format
  const customFieldsArray = [];
  
  // Add project description to customFields
  if (description) {
    customFieldsArray.push({
      name: 'project_description',
      value: description
    });
    
    // Add to the new description_of_work field as well
    customFieldsArray.push({
      name: 'description_of_work',
      value: description
    });
  }
  
  // Map common fields with support for variations in field names
  const fieldMappings = {
    'projectTypes': 'project_types_full',
    'project_types': 'project_types_full',
    'projectSize': 'project_size',
    'project_size': 'project_size',
    'projectStage': 'project_stage',
    'project_stage': 'project_stage',
    'comment': 'comment',
    'additionalComments': 'additional_comments',
    'projectTimeline': 'project_time_line',
    'project_time_line': 'project_time_line',
    'projectBudget': 'project_budget',
    'project_budget': 'project_budget'
  };
  
  // Add all custom fields to the array
  Object.entries(formData)
    .filter(([key]) => !standardFields.includes(key))
    .forEach(([key, value]) => {
      // Skip empty values
      if (value === undefined || value === null || value === '') return;
      
      // Use mapped field name if available
      const fieldName = fieldMappings[key as keyof typeof fieldMappings] || key;
      
      customFieldsArray.push({
        name: fieldName,
        value: value
      });
    });
  
  // Base data structure for GHL
  const ghlData = {
    email: formData.email,
    phone: formData.phone,
    firstName,
    lastName,
    // Add the description to a note field that GHL will display in the dashboard
    note: description,
    // Use the proper format for customFields (plural) as an array of objects with name/value pairs
    customFields: customFieldsArray,
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
    
    // Log the data being sent to GHL for debugging
    console.log('Submitting to GHL:', {
      formType,
      originalData: formData,
      formattedData: ghlData,
      customFieldsCount: ghlData.customFields.length
    });
    
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
    
    // Log the GHL response for debugging
    console.log('GHL response:', responseData);
    console.log('Custom fields sent:', ghlData.customFields);
    
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