// CORS middleware for Vercel
function corsMiddleware(req, res) {
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:8000',
    process.env.FRONTEND_URL,
  ].filter(Boolean);

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true; // Request handled
  }
  return false;
}

// Error response helper
function errorResponse(res, statusCode, message, details = null) {
  res.status(statusCode).json({
    error: message,
    ...(details && { details }),
  });
}

// Success response helper
function successResponse(res, statusCode, data) {
  res.status(statusCode).json(data);
}

module.exports = {
  corsMiddleware,
  errorResponse,
  successResponse,
};
