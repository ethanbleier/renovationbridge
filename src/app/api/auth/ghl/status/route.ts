import { NextResponse } from 'next/server';

export async function GET() {
  // Check if GHL access token is available
  const accessToken = process.env.GHL_ACCESS_TOKEN;
  const refreshToken = process.env.GHL_REFRESH_TOKEN;
  const expiresAt = process.env.GHL_TOKEN_EXPIRES_AT ? parseInt(process.env.GHL_TOKEN_EXPIRES_AT) : 0;
  const locationId = process.env.GHL_LOCATION_ID;
  
  // Determine token status
  let tokenStatus = 'missing';
  let expiresIn = 0;
  
  if (accessToken && refreshToken) {
    if (expiresAt > Date.now()) {
      tokenStatus = 'valid';
      expiresIn = Math.floor((expiresAt - Date.now()) / 1000 / 60); // minutes
    } else {
      tokenStatus = 'expired';
    }
  }
  
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>GoHighLevel Connection Status</title>
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
        .status-container {
          margin-top: 50px;
          padding: 30px;
          border-radius: 10px;
          background-color: #f2f0e9;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #313bc0;
          margin-bottom: 20px;
        }
        p {
          margin-bottom: 15px;
        }
        .status {
          font-size: 24px;
          font-weight: bold;
          margin: 20px 0;
          padding: 10px;
          border-radius: 5px;
        }
        .status.valid {
          color: #4CAF50;
          background-color: rgba(76, 175, 80, 0.1);
        }
        .status.expired {
          color: #FF9800;
          background-color: rgba(255, 152, 0, 0.1);
        }
        .status.missing {
          color: #F44336;
          background-color: rgba(244, 67, 54, 0.1);
        }
        .info-table {
          width: 100%;
          margin-top: 20px;
          text-align: left;
          border-collapse: collapse;
        }
        .info-table td {
          padding: 8px;
          border-bottom: 1px solid #ddd;
        }
        .info-table td:first-child {
          font-weight: bold;
          width: 140px;
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
      <div class="status-container">
        <h1>GoHighLevel Connection Status</h1>
        
        <div class="status ${tokenStatus}">
          ${tokenStatus === 'valid' ? '✓ Connected' : 
            tokenStatus === 'expired' ? '⚠ Token Expired' : 
            '✗ Not Connected'}
        </div>
        
        <table class="info-table">
          <tr>
            <td>Status:</td>
            <td>
              ${tokenStatus === 'valid' ? 'Token is valid' : 
                tokenStatus === 'expired' ? 'Token has expired and needs refresh' : 
                'No access token available'}
            </td>
          </tr>
          ${tokenStatus !== 'missing' ? `
          <tr>
            <td>Expires in:</td>
            <td>${tokenStatus === 'valid' ? `${expiresIn} minutes` : 'Expired'}</td>
          </tr>
          <tr>
            <td>Location ID:</td>
            <td>${locationId || 'Not set'}</td>
          </tr>
          ` : ''}
        </table>
        
        <div class="buttons">
          ${tokenStatus !== 'valid' ? `<a href="/api/auth/ghl" class="button">${tokenStatus === 'expired' ? 'Refresh Token' : 'Connect'}</a>` : ''}
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