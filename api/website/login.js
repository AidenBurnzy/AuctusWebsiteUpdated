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

    // Ensure required fields are present
    const loginPayload = {
      email: payload.email,
      password: payload.password,
    };

    if (!loginPayload.email) {
      return errorResponse(res, 400, 'Email is required');
    }

    if (!loginPayload.password) {
      return errorResponse(res, 400, 'Password is required');
    }

    // Forward login request to AuctusApp backend (server-to-server, no CORS issues)
    const response = await fetch(`${backendUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginPayload),
    });

    const data = await response.json();
    return successResponse(res, response.status, data);
  } catch (error) {
    console.error('Website login proxy error:', error);
    return errorResponse(res, 500, 'Internal server error');
  }
};
