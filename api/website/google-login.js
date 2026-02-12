const { OAuth2Client } = require('google-auth-library');
const { corsMiddleware, errorResponse, successResponse } = require('../middleware/response');

const clientId = process.env.GOOGLE_CLIENT_ID;
const googleClient = clientId ? new OAuth2Client(clientId) : null;

module.exports = async (req, res) => {
  if (corsMiddleware(req, res)) return;

  if (req.method !== 'POST') {
    return errorResponse(res, 405, 'Method not allowed');
  }

  if (!clientId || !googleClient) {
    return errorResponse(res, 500, 'Google sign-in is not configured');
  }

  const { idToken } = req.body || {};
  if (!idToken) {
    return errorResponse(res, 400, 'Google ID token is required');
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: clientId
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return errorResponse(res, 400, 'Invalid Google token');
    }

    const exchangeUrl = process.env.AUCTUS_GOOGLE_AUTH_URL;
    if (!exchangeUrl) {
      return errorResponse(res, 501, 'Google sign-in exchange is not configured');
    }

    const exchangeResponse = await fetch(exchangeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ idToken, email: payload.email })
    });

    const data = await exchangeResponse.json();

    if (!exchangeResponse.ok) {
      return errorResponse(res, exchangeResponse.status, data.error || data.message || 'Google sign-in failed');
    }

    const redirectUrl = data.magicLink || data.redirectUrl;
    if (!redirectUrl) {
      return errorResponse(res, 500, 'Missing portal redirect URL');
    }

    return successResponse(res, 200, {
      redirectUrl
    });
  } catch (error) {
    console.error('Google sign-in error:', error);
    return errorResponse(res, 500, 'Google sign-in failed');
  }
};
