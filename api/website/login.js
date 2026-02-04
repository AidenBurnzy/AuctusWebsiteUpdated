const { corsMiddleware, errorResponse, successResponse } = require('../middleware/response');

module.exports = async (req, res) => {
  // Handle CORS
  if (corsMiddleware(req, res)) return;

  if (req.method !== 'POST') {
    return errorResponse(res, 405, 'Method not allowed');
  }

  const backendUrl = process.env.AUCTUS_APP_URL || 'https://auctus-app.vercel.app';

  try {
    const payload = req.body && typeof req.body === 'object' ? req.body : {};

    console.log('Login proxy received:', { email: payload.email, hasPassword: !!payload.password });

    // Ensure required fields are present
    const loginPayload = {
      email: payload.email ? payload.email.toLowerCase().trim() : '',
      password: payload.password,
    };

    if (!loginPayload.email) {
      console.log('Login error: Email is missing');
      return errorResponse(res, 400, 'Email is required');
    }

    if (!loginPayload.password) {
      console.log('Login error: Password is missing');
      return errorResponse(res, 400, 'Password is required');
    }

    console.log('Requesting magic link from:', `${backendUrl}/api/auth/generate-magic-link`);

    // Request magic link from AuctusApp (validates credentials and generates link)
    const response = await fetch(`${backendUrl}/api/auth/generate-magic-link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginPayload),
    });

    const data = await response.json();
    console.log('Backend response status:', response.status);
    console.log('Backend response data:', JSON.stringify(data));

    if (!response.ok) {
      return errorResponse(res, response.status, data.error || 'Invalid email or password');
    }

    // Return success with magic link redirect URL
    return successResponse(res, 200, {
      success: true,
      redirectUrl: data.magicLink || data.redirectUrl,
      message: 'Redirecting to portal...',
    });
  } catch (error) {
    console.error('Website login proxy error:', error);
    return errorResponse(res, 500, 'Internal server error');
  }
};
