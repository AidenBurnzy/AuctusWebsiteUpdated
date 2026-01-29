// ===================================================================
// PORTAL INTEGRATION UTILITIES
// Helper functions for integrating with AuctusApp client portal
// ===================================================================

/**
 * Check if user has a valid access token
 * @returns {boolean}
 */
function isAuthenticated() {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken;
}

/**
 * Get client's portal feature flags from AuctusApp
 * @returns {Promise<Object>} Feature flags object
 */
async function getPortalFeatures() {
    try {
        const accessToken = localStorage.getItem('accessToken');
        
        if (!accessToken) {
            throw new Error('Not authenticated');
        }

        const response = await fetch(API_CONFIG.PORTAL_FEATURES, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch portal features');
        }

        const data = await response.json();
        return data.features || {};
    } catch (error) {
        console.error('Error fetching portal features:', error);
        return null;
    }
}

/**
 * Check if a specific portal feature is enabled for the current user
 * @param {string} featureName - Name of the feature (e.g., 'accountSettings', 'projectDashboard')
 * @returns {Promise<boolean>}
 */
async function hasFeatureAccess(featureName) {
    const features = await getPortalFeatures();
    
    if (!features) {
        return false;
    }

    // Convert camelCase to feature flag format (e.g., accountSettings -> enableAccountSettings)
    const featureKey = `enable${featureName.charAt(0).toUpperCase()}${featureName.slice(1)}`;
    return features[featureKey] === true;
}

/**
 * Redirect user to portal if authenticated
 * @param {string} defaultPage - Default page to redirect to if not authenticated
 */
async function redirectToPortalIfAuthenticated(defaultPage = 'home') {
    if (isAuthenticated()) {
        // Check portal access
        const features = await getPortalFeatures();
        
        if (features && features.allowPortalAccess) {
            // User has portal access - redirect to portal
            window.location.href = API_CONFIG.PORTAL_URL;
            return true;
        }
    }
    
    return false;
}

/**
 * Logout user and clear all auth data
 */
function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('websiteClientEmail');
    localStorage.removeItem('rememberMe');
    
    // Redirect to login page
    if (typeof router !== 'undefined') {
        router.navigate('login');
    } else {
        window.location.hash = '#login';
    }
}

/**
 * Get current user info from token (basic JWT decode)
 * @returns {Object|null} User info or null if not authenticated
 */
function getCurrentUser() {
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
        return null;
    }

    try {
        // Basic JWT decode (payload is the middle part)
        const base64Url = accessToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

/**
 * Check if token is expired
 * @returns {boolean}
 */
function isTokenExpired() {
    const user = getCurrentUser();
    
    if (!user || !user.exp) {
        return true;
    }

    // exp is in seconds, Date.now() is in milliseconds
    return user.exp * 1000 < Date.now();
}

/**
 * Refresh access token using refresh token
 * @returns {Promise<boolean>} True if refresh successful
 */
async function refreshAccessToken() {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
            return false;
        }

        const response = await fetch(API_CONFIG.BACKEND_URL + '/api/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken);
            return true;
        }

        return false;
    } catch (error) {
        console.error('Error refreshing token:', error);
        return false;
    }
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isAuthenticated,
        getPortalFeatures,
        hasFeatureAccess,
        redirectToPortalIfAuthenticated,
        logout,
        getCurrentUser,
        isTokenExpired,
        refreshAccessToken
    };
}
