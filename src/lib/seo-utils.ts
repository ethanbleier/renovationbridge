import { JSDOM } from 'jsdom';

/**
 * Extracts clean text content from HTML for use in meta descriptions
 * @param html - The HTML content to extract text from
 * @param maxLength - Maximum length of the extracted text (default: 160)
 * @returns Cleaned and truncated text for meta descriptions
 */
export function extractTextFromHtml(html: string, maxLength: number = 160): string {
  try {
    // Create a DOM from the HTML string
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Remove scripts, styles, and other non-content elements
    const elementsToRemove = [
      'script', 'style', 'iframe', 'noscript', 'svg',
      'nav', 'footer', 'header', 'aside'
    ];
    
    elementsToRemove.forEach(tag => {
      const elements = document.querySelectorAll(tag);
      elements.forEach(el => el.parentNode?.removeChild(el));
    });

    // Get the text content
    let text = document.body.textContent || '';
    
    // Clean the text
    text = text
      .replace(/\s+/g, ' ')  // Replace multiple spaces, tabs, etc. with a single space
      .replace(/\n+/g, ' ')  // Replace multiple new lines with a single space
      .trim();               // Remove leading/trailing whitespace
    
    // Truncate to maxLength and add ellipsis if needed
    if (text.length <= maxLength) {
      return text;
    }
    
    // Try to cut at the last complete sentence within maxLength
    const truncated = text.substring(0, maxLength);
    const lastSentenceEnd = Math.max(
      truncated.lastIndexOf('.'),
      truncated.lastIndexOf('!'),
      truncated.lastIndexOf('?')
    );
    
    if (lastSentenceEnd > 0) {
      return text.substring(0, lastSentenceEnd + 1);
    }
    
    // If we can't find a sentence boundary, cut at the last word
    const lastWordEnd = truncated.lastIndexOf(' ');
    return text.substring(0, lastWordEnd) + '...';
  } catch (error) {
    console.error('Error extracting text from HTML:', error);
    return '';
  }
}

/**
 * Creates a canonical URL from a path
 * @param path - The path segment of the URL (e.g., '/blog/post-1')
 * @returns Full canonical URL
 */
export function createCanonicalUrl(path: string): string {
  const baseUrl = 'https://renovationbridge.com';
  // Remove any trailing slashes from the base URL
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  // Ensure the path starts with a slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${cleanBaseUrl}${cleanPath}`;
}

/**
 * Creates breadcrumb items array for structured data
 * @param segments - Array of breadcrumb segments, each with name and path
 * @returns Breadcrumb items array for structured data
 */
export function createBreadcrumbItems(
  segments: Array<{ name: string; path: string }>
): Array<{ name: string; item: string }> {
  const baseUrl = 'https://renovationbridge.com';
  let currentPath = '';
  
  return segments.map(segment => {
    currentPath = currentPath 
      ? `${currentPath}/${segment.path}` 
      : `/${segment.path}`;
    
    return {
      name: segment.name,
      item: `${baseUrl}${currentPath}`
    };
  });
} 