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
      email: payload.email ? payload.email.toLowerCase() : '',
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

    console.log('Forwarding login to:', `${backendUrl}/api/auth/login`);

    // Forward login request to AuctusApp backend (server-to-server, no CORS issues)
    const response = await fetch(`${backendUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginPayload),
    });

    const data = await response.json();
    console.log('Backend response status:', response.status);
    
    return successResponse(res, response.status, data);
  } catch (error) {
    console.error('Website login proxy error:', error);
    return errorResponse(res, 500, 'Internal server error');
  }
};
