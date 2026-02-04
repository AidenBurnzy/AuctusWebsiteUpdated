const crypto = require('crypto');
const { corsMiddleware, errorResponse, successResponse } = require('../middleware/response');

module.exports = async (req, res) => {
  // Handle CORS
  if (corsMiddleware(req, res)) return;

  if (req.method !== 'POST') {
    return errorResponse(res, 405, 'Method not allowed');
  }

  const webhookSecret = process.env.WEBHOOK_SECRET;
  const backendUrl = process.env.AUCTUS_APP_URL || 'https://auctus-app.vercel.app';

  if (!webhookSecret) {
    return errorResponse(res, 500, 'Webhook not configured');
  }

  try {
    const payload = req.body && typeof req.body === 'object' ? req.body : {};

    // Ensure required fields are present (backend requires these)
    const sanitizedPayload = {
      email: payload.email,
      company: payload.company || 'Individual',
      contactName: payload.contactName || 'Website Client',
      phone: payload.phone || 'N/A',
      websiteUrl: payload.websiteUrl,
      password: payload.password,
      confirmPassword: payload.confirmPassword,
    };

    if (!sanitizedPayload.email) {
      return errorResponse(res, 400, 'Email is required');
    }

    if (!sanitizedPayload.password || !sanitizedPayload.confirmPassword) {
      return errorResponse(res, 400, 'Password and confirmation are required');
    }

    if (sanitizedPayload.password !== sanitizedPayload.confirmPassword) {
      return errorResponse(res, 400, 'Passwords do not match');
    }

    const bodyText = JSON.stringify(sanitizedPayload);
    const signature = crypto
      .createHmac('sha256', webhookSecret)
      .update(bodyText, 'utf-8')
      .digest('hex');

    const response = await fetch(`${backendUrl}/api/website-integration/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': signature,
      },
      body: bodyText,
    });

    const data = await response.json();
    return successResponse(res, response.status, data);
  } catch (error) {
    console.error('Website register proxy error:', error);
    return errorResponse(res, 500, 'Internal server error');
  }
};
