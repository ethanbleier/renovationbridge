import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const error = url.searchParams.get('error') || 'unknown_error';
  const details = url.searchParams.get('details') || '';
  
  let errorMessage = 'An unknown error occurred.';
  
  switch (error) {
    case 'missing_code':
      errorMessage = 'Authorization code was missing from the response.';
      break;
    case 'missing_credentials':
      errorMessage = 'GoHighLevel client ID or client secret is not configured.';
      break;
    case 'token_exchange':
      errorMessage = 'Failed to exchange authorization code for access token.';
      break;
    case 'save_token':
      errorMessage = 'Failed to save access token.';
      break;
    default:
      errorMessage = 'An unknown error occurred during the OAuth process.';
  }
  
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>GoHighLevel OAuth Error</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }
        .error-container {
          margin-top: 50px;
          padding: 30px;
          border-radius: 10px;
          background-color: #fff0f0;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: 1px solid #ffcccb;
        }
        h1 {
          color: #d32f2f;
          margin-bottom: 20px;
        }
        p {
          margin-bottom: 15px;
        }
        .icon {
          font-size: 64px;
          color: #d32f2f;
          margin-bottom: 20px;
        }
        .details {
          margin-top: 20px;
          text-align: left;
          background-color: #f5f5f5;
          padding: 15px;
          border-radius: 5px;
          overflow-wrap: break-word;
          font-size: 0.9em;
          display: ${details ? 'block' : 'none'};
        }
        .buttons {
          margin-top: 30px;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          margin: 0 10px;
          background-color: #313bc0;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: 500;
        }
        .button:hover {
          background-color: #252d9d;
        }
      </style>
    </head>
    <body>
      <div class="error-container">
        <div class="icon">✗</div>
        <h1>OAuth Error</h1>
        <p>${errorMessage}</p>
        <div class="details">${details}</div>
        <div class="buttons">
          <a href="/api/auth/ghl" class="button">Try Again</a>
          <a href="/" class="button">Back to Home</a>
        </div>
      </div>
    </body>
  </html>
  `;
  
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
} 