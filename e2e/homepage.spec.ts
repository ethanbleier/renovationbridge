import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('should navigate to the home page', async ({ page }) => {
    // Start from the homepage
    await page.goto('/');
    
    // Verify that page has loaded
    await expect(page).toHaveTitle(/Renovation Bridge/);
  });

  test('should have main navigation elements', async ({ page }) => {
    await page.goto('/');
    
    // Check for navigation menu
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();
    
    // Check for common navigation links
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
    
    // Check for main content section
    await expect(page.getByRole('main')).toBeVisible();
  });
}); 