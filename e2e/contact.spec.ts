import { test, expect } from '@playwright/test';

// Mark all tests in this file as slow
test.describe.configure({ mode: 'serial', timeout: 60000 });

test.describe('Contact form', () => {
  test('should validate required fields', async ({ page }) => {
    // Navigate to contact page or page containing the contact form
    await page.goto('/contact');
    
    // Try to submit the form without filling any fields
    const submitButton = page.getByRole('button', { name: /submit/i });
    await submitButton.click();
    
    // Check for validation errors
    await expect(page.getByText(/name is required/i)).toBeVisible();
    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/message is required/i)).toBeVisible();
  });
  
  test('should submit the form with valid data', async ({ page }) => {
    test.slow();
    
    await page.route('**/api/submit-contact', async route => {
      // Increase simulated delay to better handle mobile device timing
      await new Promise(resolve => setTimeout(resolve, 500));
      await route.fulfill({ 
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      });
    });
    
    // Navigate with a longer timeout for mobile devices
    await page.goto('/contact', { timeout: 30000 });
    
    // Fill the form with explicit waiting between interactions
    await page.getByLabel(/name/i).fill('Test User');
    await page.waitForTimeout(100);
    
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.waitForTimeout(100);
    
    await page.getByLabel(/message/i).fill('This is a test message from Playwright e2e test');
    await page.waitForTimeout(100);
    
    // Submit the form
    const submitButton = page.getByRole('button', { name: /submit/i });
    await submitButton.click();
    
    // Verify success state with increased timeout specifically for this assertion
    await expect(page.getByText(/thank you/i), 
      'Success message should appear after submission').toBeVisible({ timeout: 15000 });
  });
}); 