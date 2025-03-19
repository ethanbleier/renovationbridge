/**
 * Prefixes image paths with the correct base path for GitHub Pages deployment
 */
export function getImagePath(path: string): string {
  // When in production (GitHub Pages), add the repository name as prefix
  const basePath = process.env.NODE_ENV === 'production' ? '/renovationbridge' : '';
  
  // Only add the prefix if the path starts with a slash (i.e., it's a relative path)
  if (path.startsWith('/')) {
    return `${basePath}${path}`;
  }
  
  return path;
} 