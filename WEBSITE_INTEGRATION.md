# AuctusStudio Website - AuctusApp Integration (Website Side)

**Status:** Implementation Complete - Ready for Testing  
**Date:** January 29, 2026  
**Version:** 1.0.0

---

## 📋 Overview

This document describes the website-side implementation for integrating AuctusStudio marketing website with AuctusApp's client portal system. Website visitors can sign up, and their accounts are automatically created in AuctusApp with phased portal access.

---

## 🔧 Changes Implemented

### 1. **API Configuration Updates** ([script.js](script.js))

Added new API endpoints for portal integration:

```javascript
const API_CONFIG = {
    BACKEND_URL: 'https://auctus-app.vercel.app',  // Production
    
    // New endpoints
    WEBSITE_REGISTER: '/api/website-integration/register',  // Webhook integration
    PORTAL_FEATURES: '/api/client/portal/features',         // Feature flags
    PORTAL_URL: '/portal/coming-soon'                       // Portal redirect
};
```

### 2. **Signup Flow Updates** ([script.js](script.js))

**Changed:**
- **API Endpoint**: `API_CONFIG.REGISTER` → `API_CONFIG.WEBSITE_REGISTER`
- **Field Names**: `companyName` → `company`, `phoneNumber` → `phone`
- **Response Handling**: Now expects `credentials` object with email and password
- **Success Message**: Informs user to check email for magic link
- **Redirect**: Goes to login page (3 seconds) instead of home page

**Request Payload:**
```javascript
{
    company: "ACME Corp",           // Was: companyName
    contactName: "John Doe",
    email: "john@acme.com",
    phone: "+1-555-0123",          // Was: phoneNumber
    password: "********",
    confirmPassword: "********"
}
```

**Response Expected:**
```javascript
{
    success: true,
    client: { id: 123, ... },
    credentials: {
        email: "john@acme.com",
        temporaryPassword: "generated-password"
    },
    magicLink: "https://auctus-app.vercel.app/portal/auth/magic/..."
}
```

### 3. **Login Flow Updates** ([script.js](script.js))

**Changed:**
- **Success Redirect**: `router.navigate('home')` → `window.location.href = API_CONFIG.PORTAL_URL`
- **Message**: "Redirecting..." → "Redirecting to your portal..."
- **Behavior**: Full page navigation to AuctusApp portal instead of internal route

**After successful login:**
```javascript
// Tokens stored in localStorage
localStorage.setItem('accessToken', data.accessToken);
localStorage.setItem('refreshToken', data.refreshToken);

// Redirect to AuctusApp portal (Phase 1: coming-soon page)
window.location.href = 'https://auctus-app.vercel.app/portal/coming-soon';
```

### 4. **Portal Integration Utilities** ([portal-integration.js](portal-integration.js))

New utility file with helper functions:

**Key Functions:**
- `isAuthenticated()` - Check if user has valid token
- `getPortalFeatures()` - Fetch feature flags from AuctusApp
- `hasFeatureAccess(featureName)` - Check specific feature availability
- `redirectToPortalIfAuthenticated()` - Auto-redirect logic
- `logout()` - Clear tokens and redirect to login
- `getCurrentUser()` - Decode JWT to get user info
- `isTokenExpired()` - Check token expiration
- `refreshAccessToken()` - Refresh expired token

**Usage Examples:**
```javascript
// Check if user can access project dashboard
const canView = await hasFeatureAccess('projectDashboard');

// Get all features
const features = await getPortalFeatures();
// Returns: { allowPortalAccess: true, enableAccountSettings: false, ... }

// Auto-redirect authenticated users
await redirectToPortalIfAuthenticated();
```

### 5. **HTML Script Loading** ([index.html](index.html))

Added portal integration script:
```html
<script src="portal-integration.js"></script>
<script src="script.js"></script>
```

---

## 🔄 User Flow

### **New User Signup Flow**

```
1. User fills signup form on website
   ↓
2. Form submits to /api/website-integration/register
   ↓
3. AuctusApp webhook creates:
   - Client record (clientType: 'website')
   - ClientPortalUser record
   - ClientPortalFeatures (Phase 1: auth-only)
   - Magic link token (24hr expiry)
   ↓
4. Email sent with:
   - Temporary credentials
   - Magic link to portal
   ↓
5. User redirected to login page
   ↓
6. Success message: "Check your email for login credentials"
```

### **Login Flow (Existing Users)**

```
1. User enters email + password
   ↓
2. POST to /api/auth/login
   ↓
3. Receives accessToken + refreshToken
   ↓
4. Tokens stored in localStorage
   ↓
5. Redirected to portal (window.location.href)
   ↓
6. Portal checks clientType and features
   ↓
7. Phase 1: Shows "Coming Soon" page
   Phase 2+: Shows dashboard with enabled features
```

---

## 🎯 Portal Access Phases

### **Phase 1: Authentication Only** (Current)

**What users see:**
- ✅ Can sign up via website
- ✅ Receive email with credentials
- ✅ Can login successfully
- ✅ Redirected to portal "Coming Soon" page
- ❌ No dashboard features yet

**Feature Flags:**
```javascript
{
    allowPortalAccess: true,
    enableAccountSettings: false,
    enableProjectDashboard: false,
    enableSupportMessaging: false,
    enableFileManagement: false,
    enableAnalytics: false,
    enableInvoiceHistory: false
}
```

### **Phase 2: Account & Projects** (Future - Weeks 3-6)

**What users will see:**
- ✅ Account Settings page (profile, password, email)
- ✅ Project Dashboard (website build progress)
- ❌ Support/files/analytics not yet available

**Feature Flags:**
```javascript
{
    allowPortalAccess: true,
    enableAccountSettings: true,    // NEW
    enableProjectDashboard: true,   // NEW
    enableSupportMessaging: false,
    // ... rest still disabled
}
```

### **Phase 3: Premium Features** (Future - Weeks 7+)

**What users will see:**
- ✅ Support messaging (tickets/chat)
- ✅ File management (downloads/uploads)
- ✅ Analytics (website performance)
- ✅ Invoice history (billing)

---

## 🔐 Security & Authentication

### **Token Storage**
- `localStorage.accessToken` - JWT access token (15-min expiry)
- `localStorage.refreshToken` - Refresh token (longer expiry)
- `localStorage.websiteClientEmail` - Email for reference

### **Token Flow**
```javascript
// On login success
localStorage.setItem('accessToken', data.accessToken);
localStorage.setItem('refreshToken', data.refreshToken);

// On API calls
headers: {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
}

// On token expiry
if (isTokenExpired()) {
    const refreshed = await refreshAccessToken();
    if (!refreshed) {
        logout(); // Force re-login
    }
}
```

### **CORS Configuration**
AuctusApp backend must allow website origin:
```
Access-Control-Allow-Origin: https://auctus-studio.vercel.app
Access-Control-Allow-Credentials: true
```

---

## 🧪 Testing Checklist

### **Phase 1 Testing**

- [ ] **Signup Flow**
  - [ ] Fill signup form with valid data
  - [ ] Submit form
  - [ ] Verify API call to `/api/website-integration/register`
  - [ ] Check success message displayed
  - [ ] Verify redirect to login page after 3 seconds
  - [ ] Check email received with credentials and magic link

- [ ] **Login Flow**
  - [ ] Enter email + password from signup email
  - [ ] Submit login form
  - [ ] Verify tokens stored in localStorage
  - [ ] Check redirect to portal URL
  - [ ] Verify "Coming Soon" page displayed

- [ ] **Portal Features API**
  - [ ] Open browser console
  - [ ] Run: `await getPortalFeatures()`
  - [ ] Verify returns Phase 1 feature flags
  - [ ] Check `allowPortalAccess: true`
  - [ ] Check all other features: `false`

- [ ] **Token Expiration**
  - [ ] Wait for token to expire (15 min)
  - [ ] Try accessing portal
  - [ ] Verify auto-refresh or logout

### **Manual Test Script**

```javascript
// Open browser console on website

// 1. Check if authenticated
console.log('Authenticated:', isAuthenticated());

// 2. Get current user from token
console.log('User:', getCurrentUser());

// 3. Check token expiration
console.log('Token expired:', isTokenExpired());

// 4. Fetch portal features
const features = await getPortalFeatures();
console.log('Features:', features);

// 5. Check specific feature access
const hasSettings = await hasFeatureAccess('accountSettings');
console.log('Has account settings:', hasSettings);  // Should be false in Phase 1

// 6. Logout
logout();
```

---

## 📁 Files Modified

| File | Changes | Status |
|------|---------|--------|
| [script.js](script.js) | Added WEBSITE_REGISTER endpoint, updated signup/login flows | ✅ Updated |
| [index.html](index.html) | Added portal-integration.js script | ✅ Updated |
| [portal-integration.js](portal-integration.js) | New utility file for portal integration | ✅ New |
| [WEBSITE_INTEGRATION.md](WEBSITE_INTEGRATION.md) | This documentation file | ✅ New |

---

## 🚀 Deployment Steps

### **1. Environment Variables** (Vercel Dashboard)

```bash
# No new environment variables needed on website side
# Website uses BACKEND_URL auto-detection based on hostname
```

### **2. Deploy to Vercel**

```bash
# Commit changes
git add .
git commit -m "feat: integrate website with AuctusApp portal system"
git push origin main

# Vercel auto-deploys from main branch
```

### **3. Verify Deployment**

- [ ] Visit https://auctus-studio.vercel.app
- [ ] Test signup flow end-to-end
- [ ] Test login redirect to portal
- [ ] Check browser console for errors
- [ ] Verify API calls reach AuctusApp backend

---

## 🔗 Integration Points

### **Website → AuctusApp**

| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `/api/website-integration/register` | POST | Create new client via webhook | No (HMAC signature) |
| `/api/auth/login` | POST | Authenticate user | No |
| `/api/auth/refresh` | POST | Refresh access token | No (refresh token) |
| `/api/client/portal/features` | GET | Get client feature flags | Yes (Bearer token) |
| `/portal/coming-soon` | GET | Portal landing page | Yes (redirects to login if not authed) |

### **Data Flow**

```
AuctusStudio Website (Frontend)
    ↓ (Signup)
AuctusApp Webhook (/api/website-integration/register)
    ↓ (Creates)
Database (Client + ClientPortalFeatures + ClientPortalUser)
    ↓ (Email)
User receives credentials + magic link
    ↓ (Login)
Website calls /api/auth/login
    ↓ (Tokens)
Website redirects to /portal/coming-soon
    ↓ (Auth check)
Portal validates tokens and shows Phase 1 page
```

---

## 📞 Troubleshooting

### **Issue: Signup form submits but no email received**

**Possible causes:**
- Webhook endpoint unreachable
- HMAC signature validation failing
- Email service (Resend) not configured
- Client record not created

**Debug steps:**
```bash
# Check AuctusApp logs for webhook errors
# Verify DATABASE_URL_WEBSITE is set
# Check Integration Logs in AuctusApp admin
# Test webhook endpoint manually:

curl -X POST https://auctus-app.vercel.app/api/website-integration/register \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Test Corp",
    "contactName": "Test User",
    "email": "test@example.com",
    "phone": "+1-555-0123",
    "password": "testpass123",
    "confirmPassword": "testpass123"
  }'
```

### **Issue: Login succeeds but redirect fails**

**Possible causes:**
- Portal URL incorrect
- CORS blocking redirect
- Portal page not deployed

**Debug steps:**
```javascript
// Check portal URL configuration
console.log('Portal URL:', API_CONFIG.PORTAL_URL);

// Verify tokens received
console.log('Access Token:', localStorage.getItem('accessToken'));

// Manually navigate to portal
window.location.href = 'https://auctus-app.vercel.app/portal/coming-soon';
```

### **Issue: getPortalFeatures() returns null**

**Possible causes:**
- Token expired
- Feature endpoint unreachable
- Client features not initialized

**Debug steps:**
```javascript
// Check if authenticated
console.log('Auth token exists:', !!localStorage.getItem('accessToken'));

// Check token expiration
console.log('Token expired:', isTokenExpired());

// Manually call API
const response = await fetch('https://auctus-app.vercel.app/api/client/portal/features', {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
});
console.log('Response:', await response.json());
```

---

## 🎯 Next Steps

### **Immediate (This Week)**
- [ ] Deploy website changes to production
- [ ] Test Phase 1 flow end-to-end
- [ ] Monitor signup conversion rate
- [ ] Check Integration Logs in AuctusApp admin

### **Phase 2 Preparation (Weeks 3-6)**
- [ ] Design Account Settings UI
- [ ] Design Project Dashboard UI
- [ ] Plan feature flag rollout strategy
- [ ] Update this documentation for Phase 2

### **Future Enhancements**
- [ ] Add OAuth login (Google, GitHub)
- [ ] Implement password reset flow
- [ ] Add email verification requirement
- [ ] Support SSO for enterprise clients

---

## 📚 Related Documentation

- **AuctusApp Integration Guide**: See `WEBSITE_CLIENT_INTEGRATION.md` in AuctusApp repo
- **Architecture Decision Log**: See `ARCHITECTURE_DECISION_LOG.md` in AuctusApp repo
- **API Documentation**: See `AUTH_SETUP.md` for auth endpoints
- **Database Schema**: See `schema.sql` and AuctusApp `schema.prisma`

---

**Questions or Issues?**  
Check AuctusApp integration logs or contact the development team.
