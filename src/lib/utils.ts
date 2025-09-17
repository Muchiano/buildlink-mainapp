import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getFilenameFromUrl = (url: string): string => {
  try {
    // Handle both full URLs and relative paths
    let pathname;
    if (url.startsWith('http')) {
      const urlObj = new URL(url);
      pathname = urlObj.pathname;
    } else {
      pathname = url;
    }
    
    // Extract filename from path
    const filename = pathname.split('/').pop() || '';
    
    // Decode URL-encoded characters
    return decodeURIComponent(filename);
  } catch (error) {
    console.error('Error parsing filename from URL:', error);
    return 'document.pdf';
  }
};