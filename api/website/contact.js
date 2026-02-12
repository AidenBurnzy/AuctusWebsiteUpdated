const { Resend } = require('resend');
const { corsMiddleware, errorResponse, successResponse } = require('../middleware/response');

module.exports = async (req, res) => {
  if (corsMiddleware(req, res)) return;

  if (req.method !== 'POST') {
    return errorResponse(res, 405, 'Method not allowed');
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const toList = (process.env.CONTACT_TO || 'founder.auctusventures@gmail.com,nicholas.auctusventures@gmail.com')
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean);

  if (!apiKey || !from) {
    return errorResponse(res, 500, 'Email service is not configured');
  }

  try {
    const payload = req.body && typeof req.body === 'object' ? req.body : {};
    const name = (payload.name || '').trim();
    const email = (payload.email || '').trim();
    const company = (payload.company || '').trim();
    const phone = (payload.phone || '').trim();
    const service = (payload.service || '').trim();
    const timeline = (payload.timeline || '').trim();
    const message = (payload.message || '').trim();

    if (!name || !email || !message) {
      return errorResponse(res, 400, 'Name, email, and message are required');
    }

    const resend = new Resend(apiKey);

    const subject = `New Auctus contact: ${name}${service ? ` (${service})` : ''}`;
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      phone ? `Phone: ${phone}` : null,
      service ? `Service: ${service}` : null,
      timeline ? `Timeline: ${timeline}` : null,
      '',
      message
    ].filter(Boolean).join('\n');

    await resend.emails.send({
      from,
      to: toList,
      reply_to: email,
      subject,
      text
    });

    return successResponse(res, 200, {
      message: 'Thanks for reaching out! We will get back to you within 24 hours.'
    });
  } catch (error) {
    console.error('Contact email error:', error);
    return errorResponse(res, 500, 'Failed to send message');
  }
};
