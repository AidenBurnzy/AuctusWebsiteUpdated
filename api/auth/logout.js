const { corsMiddleware, errorResponse, successResponse } = require('../../middleware/response');
const { authenticateToken } = require('../../middleware/auth');

module.exports = async (req, res) => {
  // Handle CORS
  if (corsMiddleware(req, res)) return;

  // Only allow POST
  if (req.method !== 'POST') {
    return errorResponse(res, 405, 'Method not allowed');
  }

  try {
    // Authenticate the request
    authenticateToken(req, res, async () => {
      try {
        // Token is valid, logout is successful
        // In a stateless JWT system, logout is handled client-side by removing the token
        // This endpoint serves as a confirmation endpoint and can be used to:
        // - Blacklist tokens (if you implement token blacklisting)
        // - Clear server-side sessions
        // - Update user last_logout time (optional)

        successResponse(res, 200, {
          message: 'Logged out successfully',
        });
      } catch (error) {
        console.error('Logout error:', error);
        errorResponse(res, 500, 'Failed to logout');
      }
    });
  } catch (error) {
    console.error('Auth error:', error);
    errorResponse(res, 401, 'Unauthorized');
  }
};
