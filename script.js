// ===================================================================
// AUCTUS STUDIO - SINGLE PAGE APPLICATION
// Complete SPA restructuring for smooth, fast, consistent experience
// ===================================================================

// ===================================================================
// API CONFIGURATION
// Configure API endpoints based on environment
// ===================================================================
const API_CONFIG = {
    // Get the base URL based on environment
    BACKEND_URL: (function() {
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;
        
        // Production: Vercel deployment
        if (hostname.includes('vercel.app')) {
            // Use auctus-app backend for all Vercel deployments
            return 'https://auctus-app.vercel.app';
        }
        
        // Local development
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost:3000';
        }
        
        // Default fallback
        return `${protocol}//${hostname}:3000`;
    })(),
    
    // API endpoints
    get LOGIN() {
        return '/api/website/login';
    },
    get REGISTER() {
        return this.BACKEND_URL + '/api/public/register';
    },
    get WEBSITE_REGISTER() {
        return this.BACKEND_URL + '/api/website-integration/register';
    },
    get WEBSITE_REGISTER_PROXY() {
        return '/api/website/register';
    },
    get PORTAL_FEATURES() {
        return this.BACKEND_URL + '/api/client/portal/features';
    },
    get PORTAL_URL() {
        // Portal is hosted on same domain as AuctusApp backend
        return this.BACKEND_URL + '/client-login';
    }
};

// Build a portal redirect URL with optional token handoff (for cross-domain login)
function buildPortalRedirectUrl(accessToken, refreshToken) {
    try {
        const url = new URL(API_CONFIG.PORTAL_URL, window.location.origin);

        if (accessToken) {
            const hashParams = new URLSearchParams();
            hashParams.set('access_token', accessToken);
            if (refreshToken) {
                hashParams.set('refresh_token', refreshToken);
            }
            hashParams.set('source', 'auctus-studio');
            url.hash = hashParams.toString();
        }

        return url.toString();
    } catch (error) {
        console.error('Error building portal redirect URL:', error);
        return API_CONFIG.PORTAL_URL;
    }
}

// ===================================================================
// PAGES CONTENT REGISTRY
// All page content stored as template literals for instant loading
// ===================================================================

const PAGES = {
    home: {
        title: 'Home',
        icon: 'fa-home',
        filename: 'Home',
        content: `
            <div class="editor-content">
                <div class="welcome-screen">
                    <div class="hero-section">
                        <div class="breadcrumb-path">
                            <span><i class="fas fa-home"></i> Welcome</span>
                        </div>
                        
                        <h1>Auctus Studio</h1>
                        <p class="hero-subtitle">Professional Web Design & Development</p>
                        <p class="hero-description">Transform your vision into a stunning web presence. We blend creative design, modern technology, and expert craftsmanship to create websites that drive results.</p>
                        
                        <div class="hero-buttons" id="home-hero-buttons">
                            <!-- Buttons populated by JavaScript -->
                        </div>
                    </div>
                    
                    <div class="version-info">
                        <p>Auctus Studio v1.0.0 - Built for creators, by creators</p>
                        <button id="reset-tutorial-btn" style="margin-top: 12px; padding: 6px 12px; font-size: 12px; background: rgba(139, 92, 246, 0.2); border: 1px solid rgba(139, 92, 246, 0.4); color: #a78bfa; border-radius: 4px; cursor: pointer; transition: all 0.2s ease;">
                            ↻ Reset Tutorial
                        </button>
                    </div>
                </div>
            </div>
        `
    },
    
    services: {
        title: 'Services',
        icon: 'fa-briefcase',
        filename: 'services.md',
        content: `
            <div class="editor-content services-page">
                <!-- Hero Section -->
                <div class="services-hero">
                    <div class="hero-badge">
                        <span class="badge-icon">✦</span>
                        <span>Web Development</span>
                    </div>
                    <h1 class="page-title">
                        <span class="title-line">We Build</span>
                        <span class="title-line gradient-text">Digital Experiences</span>
                    </h1>
                    <p class="page-subtitle">From concept to launch, we craft custom websites that combine stunning design with powerful functionality.</p>
                </div>

                <!-- What We Do Section -->
                <section class="services-section">
                    <h2 class="section-header">
                        <i class="fas fa-code"></i> What We Do
                    </h2>
                    
                    <div class="service-cards">
                        <div class="service-card">
                            <div class="card-number">01</div>
                            <h3>Websites</h3>
                            <div class="card-features">
                                <span class="feature-tag"><i class="fas fa-bolt"></i> Lightning Fast</span>
                                <span class="feature-tag"><i class="fas fa-mobile-alt"></i> Mobile First</span>
                                <span class="feature-tag"><i class="fas fa-paint-brush"></i> Pixel Perfect</span>
                            </div>
                            <p>Custom-built, responsive websites that captivate your audience and drive results. From elegant portfolios to powerful e-commerce platforms, we craft digital experiences that leave a lasting impression.</p>
                        </div>

                        <div class="service-card">
                            <div class="card-number">02</div>
                            <h3>Apps</h3>
                            <div class="card-features">
                                <span class="feature-tag"><i class="fas fa-rocket"></i> High Performance</span>
                                <span class="feature-tag"><i class="fas fa-lock"></i> Secure & Stable</span>
                                <span class="feature-tag"><i class="fas fa-lightbulb"></i> User Focused</span>
                            </div>
                            <p>Native and cross-platform applications that users love. We build intuitive mobile experiences that seamlessly integrate with your business goals and provide value at every touchpoint.</p>
                        </div>

                        <div class="service-card">
                            <div class="card-number">03</div>
                            <h3>Web Applications</h3>
                            <div class="card-features">
                                <span class="feature-tag"><i class="fas fa-code"></i> Custom Solutions</span>
                                <span class="feature-tag"><i class="fas fa-chart-line"></i> Data Driven</span>
                                <span class="feature-tag"><i class="fas fa-cog"></i> Scalable</span>
                            </div>
                            <p>Custom web applications tailored to your business needs. From dashboards and management systems to client portals, we build powerful tools that streamline your operations and enhance productivity.</p>
                        </div>
                    </div>
                </section>

                <!-- Our Process Section -->
                <section class="services-section">
                    <h2 class="section-header">
                        <i class="fas fa-layer-group"></i> Our Complete Process
                    </h2>
                    
                    <div class="process-steps">
                        <div class="process-step">
                            <div class="step-icon">
                                <i class="fas fa-pencil-ruler"></i>
                            </div>
                            <h3>Design & Develop</h3>
                            <p>We start by designing a mockup of your website either by using your company's current themes, or creating a new design from scratch if you want. We then develop the website using modern technologies to ensure a seamless user experience. We keep you updated with a live preview throughout the process.</p>
                        </div>

                        <div class="process-step">
                            <div class="step-icon">
                                <i class="fas fa-server"></i>
                            </div>
                            <h3>Host & Maintain</h3>
                            <p>Next, we provide reliable hosting solutions and ongoing maintenance to keep your website running smoothly. We set this system up to help you focus on your core business while we handle the technical details.</p>
                        </div>

                        <div class="process-step">
                            <div class="step-icon">
                                <i class="fas fa-rocket"></i>
                            </div>
                            <h3>Launch & Grow</h3>
                            <p>Last step is launching your project and providing ongoing SEO to improve visibility and drive traffic. Our main goal is to help you succeed online. The better your website, the better our portfolio. We promise to make the best version of your project come to life.</p>
                        </div>
                    </div>
                </section>

                <!-- Testimonials Section -->
                <section class="services-section">
                    <h2 class="section-header">
                        <i class="fas fa-quote-left"></i> Client Success Stories
                    </h2>
                    
                    <div class="testimonials">
                        <div class="testimonial">
                            <div class="testimonial-header">
                                <div class="testimonial-avatar">SR</div>
                                <div class="testimonial-info">
                                    <h4>Stephan Roberts</h4>
                                    <p>CEO, Global Windows</p>
                                </div>
                            </div>
                            <p class="testimonial-quote">"Working with Auctus was a great experience. They took the time to understand our business and created a website that truly represents our brand. We've gotten great feedback from our customers."</p>
                            <a href="https://globalwindowsllc.com/" target="_blank" class="testimonial-link">
                                Visit Website <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>

                        <div class="testimonial">
                            <div class="testimonial-header">
                                <div class="testimonial-avatar">SW</div>
                                <div class="testimonial-info">
                                    <h4>Seth Weaver</h4>
                                    <p>Founder, Nightmare Racing</p>
                                </div>
                            </div>
                            <p class="testimonial-quote">"The team was easy to work with and really nailed the design. They were patient with our revision requests and helped us launch a site we're proud to share with people."</p>
                            <a href="https://nightmareracing.netlify.app/" target="_blank" class="testimonial-link">
                                Visit Website <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>

                        <div class="testimonial">
                            <div class="testimonial-header">
                                <div class="testimonial-avatar">JH</div>
                                <div class="testimonial-info">
                                    <h4>Jake Hall</h4>
                                    <p>Founder, Redemption Renovations</p>
                                </div>
                            </div>
                            <p class="testimonial-quote">"Great communication throughout the entire process. They delivered on time and were very responsive whenever we had questions. The site looks professional and works smoothly."</p>
                            <a href="https://redemptionrenovations.netlify.app/" target="_blank" class="testimonial-link">
                                Visit Website <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>
                </section>

                <!-- CTA Section -->
                <section class="services-section cta-section-services">
                    <div class="cta-box">
                        <h2>Ready to Elevate Your Online Presence?</h2>
                        <p>Let's create something extraordinary together.</p>
                        <div class="cta-buttons">
                            <a href="#/pricing" class="btn-primary">View Pricing Plans</a>
                            <a href="#/contact" class="btn-primary">Start Your Project</a>
                            <a href="#/home" class="btn-secondary">Back to Home</a>
                        </div>
                    </div>
                </section>
            </div>
        `
    },
    
    pricing: {
        title: 'Pricing',
        icon: 'fa-tag',
        filename: 'pricing.md',
        content: `
            <div class="editor-content pricing-page">
                <!-- Hero Section -->
                <div class="pricing-hero">
                    <h1 class="page-title">
                        <span class="gradient-text">Transparent Pricing</span>
                    </h1>
                    <p class="page-subtitle">Choose the plan that fits your needs. No hidden fees, no surprises.</p>
                    
                    <!-- Toggle between Monthly and One-Time -->
                    <div class="pricing-toggle">
                        <button class="toggle-btn active" data-plan="monthly">
                            <i class="fas fa-calendar-alt"></i> Monthly Subscription
                        </button>
                        <button class="toggle-btn" data-plan="onetime">
                            <i class="fas fa-shopping-cart"></i> One-Time Purchase
                        </button>
                    </div>
                </div>

                <!-- Monthly Subscription Plans -->
                <div class="pricing-plans-container" id="monthly-plans">
                    <div class="pricing-grid">
                        <!-- Intro Plan -->
                        <div class="pricing-card">
                            <div class="plan-header">
                                <h3>Intro Plan</h3>
                                <div class="plan-price">
                                    <span class="price">$25</span>
                                    <span class="period">/month</span>
                                </div>
                                <p class="setup-fee">Setup: $50 <span class="setup-note">(replaces first month cost)</span></p>
                            </div>
                            <div class="plan-features">
                                <div class="feature"><i class="fas fa-check"></i> 2 pages (Home, Contact)</div>
                                <div class="feature"><i class="fas fa-check"></i> Mobile responsive design</div>
                                <div class="feature"><i class="fas fa-check"></i> Contact form with email notifications</div>
                                <div class="feature"><i class="fas fa-check"></i> Basic SEO setup</div>
                                <div class="feature"><i class="fas fa-check"></i> Hosting & SSL certificate</div>
                                <div class="feature"><i class="fas fa-check"></i> Monthly updates</div>
                                <div class="feature"><i class="fas fa-check"></i> Email support</div>
                            </div>
                            <a href="#/contact?plan=intro" class="plan-btn">Get Started</a>
                        </div>

                        <!-- Starter Plan -->
                        <div class="pricing-card">
                            <div class="plan-header">
                                <h3>Starter Plan</h3>
                                <div class="plan-price">
                                    <span class="price">$100</span>
                                    <span class="period">/month</span>
                                </div>
                                <p class="setup-fee">Setup: $150 <span class="setup-note">(replaces first month cost)</span></p>
                            </div>
                            <div class="plan-features">
                                <div class="feature"><i class="fas fa-check"></i> 5 pages</div>
                                <div class="feature"><i class="fas fa-check"></i> Mobile responsive design</div>
                                <div class="feature"><i class="fas fa-check"></i> Contact form with email notifications</div>
                                <div class="feature"><i class="fas fa-check"></i> Basic SEO setup</div>
                                <div class="feature"><i class="fas fa-check"></i> Hosting & SSL certificate</div>
                                <div class="feature"><i class="fas fa-check"></i> Monthly updates</div>
                                <div class="feature"><i class="fas fa-check"></i> Email support</div>
                                <div class="feature referral"><i class="fas fa-gift"></i> $100 referral bonus</div>
                            </div>
                            <a href="#/contact?plan=starter" class="plan-btn">Get Started</a>
                        </div>

                        <!-- Professional Plan -->
                        <div class="pricing-card featured">
                            <div class="popular-badge">Popular</div>
                            <div class="plan-header">
                                <h3>Professional Plan</h3>
                                <div class="plan-price">
                                    <span class="price">$250</span>
                                    <span class="period">/month</span>
                                </div>
                                <p class="setup-fee">Setup: $300 <span class="setup-note">(replaces first month cost)</span></p>
                            </div>
                            <div class="plan-features">
                                <div class="feature"><i class="fas fa-check"></i> 7-10 pages</div>
                                <div class="feature"><i class="fas fa-check"></i> Admin panel</div>
                                <div class="feature"><i class="fas fa-check"></i> Photo/project gallery with upload</div>
                                <div class="feature"><i class="fas fa-check"></i> Google Analytics integration</div>
                                <div class="feature"><i class="fas fa-check"></i> Social media integration</div>
                                <div class="feature"><i class="fas fa-check"></i> Priority email support</div>
                                <div class="feature"><i class="fas fa-check"></i> 2 hours/month changes included</div>
                                <div class="feature referral"><i class="fas fa-gift"></i> $250 referral bonus</div>
                            </div>
                            <a href="#/contact?plan=professional" class="plan-btn primary">Get Started</a>
                        </div>

                        <!-- Premium Plan -->
                        <div class="pricing-card">
                            <div class="plan-header">
                                <h3>Premium Plan</h3>
                                <div class="plan-price">
                                    <span class="price">$400</span>
                                    <span class="period">/month</span>
                                </div>
                                <p class="setup-fee">Setup: $600 <span class="setup-note">(replaces first month cost)</span></p>
                            </div>
                            <div class="plan-features">
                                <div class="feature"><i class="fas fa-check"></i> Unlimited pages</div>
                                <div class="feature"><i class="fas fa-check"></i> Advanced features (booking, payments)</div>
                                <div class="feature"><i class="fas fa-check"></i> Custom integrations (CRM, scheduling)</div>
                                <div class="feature"><i class="fas fa-check"></i> Customer portals</div>
                                <div class="feature"><i class="fas fa-check"></i> Monthly performance reports</div>
                                <div class="feature"><i class="fas fa-check"></i> 5 hours/month changes included</div>
                                <div class="feature"><i class="fas fa-check"></i> Phone support</div>
                                <div class="feature"><i class="fas fa-check"></i> Priority updates & maintenance</div>
                                <div class="feature referral"><i class="fas fa-gift"></i> $400 referral bonus</div>
                            </div>
                            <a href="#/contact?plan=premium" class="plan-btn">Get Started</a>
                        </div>
                    </div>
                </div>

                <!-- One-Time Purchase Plans -->
                <div class="pricing-plans-container" id="onetime-plans" style="display: none;">
                    <div class="pricing-grid">
                        <!-- Basic Website -->
                        <div class="pricing-card">
                            <div class="plan-header">
                                <h3>Basic Website</h3>
                                <div class="plan-price">
                                    <span class="price">$650</span>
                                    <span class="period">one-time</span>
                                </div>
                            </div>
                            <div class="plan-features">
                                <div class="feature"><i class="fas fa-check"></i> 5 pages</div>
                                <div class="feature"><i class="fas fa-check"></i> Contact form</div>
                                <div class="feature"><i class="fas fa-check"></i> Mobile responsive</div>
                                <div class="feature"><i class="fas fa-check"></i> Full ownership</div>
                                <div class="feature"><i class="fas fa-check"></i> 30 days support after launch</div>
                                <div class="feature"><i class="fas fa-info-circle"></i> Maintenance: $80/hr</div>
                                <div class="feature referral"><i class="fas fa-gift"></i> $100 referral bonus</div>
                            </div>
                            <a href="#/contact?plan=basic-site" class="plan-btn">Purchase Now</a>
                        </div>

                        <!-- Professional Website -->
                        <div class="pricing-card featured">
                            <div class="popular-badge">Popular</div>
                            <div class="plan-header">
                                <h3>Professional Website</h3>
                                <div class="plan-price">
                                    <span class="price">$1,250</span>
                                    <span class="period">one-time</span>
                                </div>
                            </div>
                            <div class="plan-features">
                                <div class="feature"><i class="fas fa-check"></i> 7-10 pages</div>
                                <div class="feature"><i class="fas fa-check"></i> Admin panel</div>
                                <div class="feature"><i class="fas fa-check"></i> Photo/project gallery</div>
                                <div class="feature"><i class="fas fa-check"></i> Full ownership</div>
                                <div class="feature"><i class="fas fa-check"></i> 60 days support after launch</div>
                                <div class="feature"><i class="fas fa-info-circle"></i> Maintenance: $80/hr</div>
                                <div class="feature referral"><i class="fas fa-gift"></i> $250 referral bonus</div>
                            </div>
                            <a href="#/contact?plan=professional-site" class="plan-btn primary">Purchase Now</a>
                        </div>

                        <!-- Premium Website -->
                        <div class="pricing-card">
                            <div class="plan-header">
                                <h3>Premium Website</h3>
                                <div class="plan-price">
                                    <span class="price">$5,000+</span>
                                    <span class="period">one-time</span>
                                </div>
                            </div>
                            <div class="plan-features">
                                <div class="feature"><i class="fas fa-check"></i> Custom features & integrations</div>
                                <div class="feature"><i class="fas fa-check"></i> Unlimited pages</div>
                                <div class="feature"><i class="fas fa-check"></i> Advanced functionality</div>
                                <div class="feature"><i class="fas fa-check"></i> Full ownership</div>
                                <div class="feature"><i class="fas fa-check"></i> 90 days support after launch</div>
                                <div class="feature"><i class="fas fa-info-circle"></i> Maintenance: $80/hr</div>
                                <div class="feature referral"><i class="fas fa-gift"></i> $500 referral bonus</div>
                            </div>
                            <a href="#/contact?plan=premium-site" class="plan-btn">Contact Us</a>
                        </div>
                    </div>
                </div>

                <!-- Add-ons Section -->
                <section class="addons-section">
                    <h2 class="section-header">
                        <i class="fas fa-puzzle-piece"></i> Add-ons & Extensions
                    </h2>
                    
                    <div class="addons-grid">
                        <div class="addon-category">
                            <h3>One-Time Add-ons</h3>
                            <div class="addon-list">
                                <div class="addon-item">
                                    <span class="addon-name">Additional pages</span>
                                    <span class="addon-price">+$75/page</span>
                                </div>
                                <div class="addon-item">
                                    <span class="addon-name">E-commerce functionality</span>
                                    <span class="addon-price">+$1,000-2,500</span>
                                </div>
                                <div class="addon-item">
                                    <span class="addon-name">Booking/scheduling system</span>
                                    <span class="addon-price">+$800</span>
                                </div>
                                <div class="addon-item">
                                    <span class="addon-name">Customer portal/login area</span>
                                    <span class="addon-price">+$1,200</span>
                                </div>
                                <div class="addon-item">
                                    <span class="addon-name">AI chatbot integration</span>
                                    <span class="addon-price">+$600</span>
                                </div>
                                <div class="addon-item">
                                    <span class="addon-name">Blog with CMS</span>
                                    <span class="addon-price">+$400</span>
                                </div>
                                <div class="addon-item">
                                    <span class="addon-name">Email marketing integration</span>
                                    <span class="addon-price">+$300</span>
                                </div>
                            </div>
                        </div>

                        <div class="addon-category">
                            <h3>Monthly Add-ons</h3>
                            <div class="addon-list">
                                <div class="addon-item">
                                    <span class="addon-name">E-commerce functionality</span>
                                    <span class="addon-price">+$100/mo</span>
                                </div>
                                <div class="addon-item">
                                    <span class="addon-name">Booking/scheduling system</span>
                                    <span class="addon-price">+$75/mo</span>
                                </div>
                                <div class="addon-item">
                                    <span class="addon-name">Customer portal</span>
                                    <span class="addon-price">+$100/mo</span>
                                </div>
                                <div class="addon-item">
                                    <span class="addon-name">AI chatbot</span>
                                    <span class="addon-price">+$50/mo</span>
                                </div>
                                <div class="addon-item">
                                    <span class="addon-name">Blog with CMS</span>
                                    <span class="addon-price">+$40/mo</span>
                                </div>
                                <div class="addon-item">
                                    <span class="addon-name">Email marketing integration</span>
                                    <span class="addon-price">+$30/mo</span>
                                </div>
                                <div class="addon-item">
                                    <span class="addon-name">SEO management</span>
                                    <span class="addon-price">+$200/mo</span>
                                </div>
                                <div class="addon-item">
                                    <span class="addon-name">Content updates</span>
                                    <span class="addon-price">+$150/mo</span>
                                </div>
                                <div class="addon-item">
                                    <span class="addon-name">Social media management</span>
                                    <span class="addon-price">+$300/mo</span>
                                </div>
                                <div class="addon-item">
                                    <span class="addon-name">AI phone receptionist</span>
                                    <span class="addon-price">+$100/mo</span>
                                </div>
                                <div class="addon-item">
                                    <span class="addon-name">Additional support (5 hours)</span>
                                    <span class="addon-price">$300</span>
                                </div>
                                <div class="addon-item">
                                    <span class="addon-name">Hourly support</span>
                                    <span class="addon-price">$75/hr</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Referral Info -->
                <section class="referral-info">
                    <div class="info-box">
                        <i class="fas fa-gift"></i>
                        <h3>Referral Bonus Program</h3>
                        <p>Earn referral bonuses when you refer a new paying client to us! Bonuses are paid when the new client makes their first payment, and must be within 60 days of your referral.</p>
                    </div>
                </section>

                <!-- CTA Section -->
                <section class="pricing-cta">
                    <h2>Ready to Get Started?</h2>
                    <p>Let's discuss which plan is right for your project</p>
                    <a href="#/contact" class="btn-primary">Contact Us Today</a>
                </section>
            </div>
        `
    },
    
    mission: {
        title: 'About',
        icon: 'fa-bullseye',
        filename: 'about.md',
        content: `
            <div class="editor-content mission-page">
                <!-- Hero Section -->
                <div class="mission-hero">
                    <div class="hero-badge">
                        <span class="badge-icon">⚡</span>
                        <span>Est. 2025</span>
                    </div>
                    <h1 class="page-title">
                        <span class="title-line">Power Everything,</span>
                        <span class="title-line gradient-text">With Auctus</span>
                    </h1>
                    <p class="page-subtitle">We're a forward-thinking digital agency specializing in cutting-edge web development and AI solutions that transform businesses.</p>
                </div>

                <!-- Mission Section -->
                <section class="mission-content">
                    <h2 class="section-header">
                        <i class="fas fa-bullseye"></i> Our Mission
                    </h2>
                    <div class="mission-statement">
                        <p class="mission-text">We exist to bridge the gap between ambitious visions and digital reality. By combining artistic design with powerful technology, we create experiences that don't just meet expectations—they redefine them.</p>
                    </div>

                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-number">50+</div>
                            <div class="stat-label">Projects Delivered</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">10+</div>
                            <div class="stat-label">Industries Served</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">100%</div>
                            <div class="stat-label">Custom Built - No Templates</div>
                        </div>
                    </div>
                </section>

                <!-- Values Section -->
                <section class="values-section-content">
                    <h2 class="section-header">
                        <i class="fas fa-heart"></i> Our Values
                    </h2>
                    <div class="values-grid">
                        <div class="value-card">
                            <div class="value-icon">🎯</div>
                            <h3>Innovation First</h3>
                            <p>We stay ahead of the curve, constantly exploring new technologies and techniques to deliver cutting-edge solutions.</p>
                        </div>
                        <div class="value-card">
                            <div class="value-icon">🤝</div>
                            <h3>Client Partnership</h3>
                            <p>Your success is our success. We work collaboratively, treating every project as a true partnership.</p>
                        </div>
                        <div class="value-card">
                            <div class="value-icon">⚡</div>
                            <h3>Quality & Speed</h3>
                            <p>We believe in delivering exceptional quality without compromising on speed. Excellence shouldn't wait.</p>
                        </div>
                        <div class="value-card">
                            <div class="value-icon">🔒</div>
                            <h3>Transparency</h3>
                            <p>Open communication, fair pricing, and clear timelines. No surprises, just results.</p>
                        </div>
                    </div>
                </section>

                <!-- How We Work Section -->
                <section class="process-section-content">
                    <h2 class="section-header">
                        <i class="fas fa-route"></i> How We Work
                    </h2>
                    <p class="section-subtitle">Our streamlined process ensures your vision becomes reality</p>
                    
                    <div class="process-grid">
                        <div class="process-card">
                            <div class="process-step-number">01</div>
                            <div class="process-icon-wrapper">
                                <i class="fas fa-search"></i>
                            </div>
                            <h3>Discovery</h3>
                            <p>We dive deep into your business, understanding your goals, audience, and unique challenges.</p>
                        </div>

                        <div class="process-card">
                            <div class="process-step-number">02</div>
                            <div class="process-icon-wrapper">
                                <i class="fas fa-pencil-ruler"></i>
                            </div>
                            <h3>Strategy & Design</h3>
                            <p>We craft a comprehensive strategy and create stunning designs that align with your brand.</p>
                        </div>

                        <div class="process-card">
                            <div class="process-step-number">03</div>
                            <div class="process-icon-wrapper">
                                <i class="fas fa-code"></i>
                            </div>
                            <h3>Development</h3>
                            <p>Our team brings designs to life with clean, efficient code and powerful functionality.</p>
                        </div>

                        <div class="process-card">
                            <div class="process-step-number">04</div>
                            <div class="process-icon-wrapper">
                                <i class="fas fa-rocket"></i>
                            </div>
                            <h3>Testing & Launch</h3>
                            <p>Rigorous testing ensures everything works flawlessly before we launch your project to the world.</p>
                        </div>

                        <div class="process-card">
                            <div class="process-step-number">05</div>
                            <div class="process-icon-wrapper">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <h3>Support & Growth</h3>
                            <p>We provide ongoing support and optimization to ensure continued success and growth.</p>
                        </div>
                    </div>
                </section>

                <!-- Contact Info Section -->
                <section class="contact-info-section">
                    <h2 class="section-header">
                        <i class="fas fa-envelope"></i> Get In Touch
                    </h2>
                    <div class="contact-info-grid">
                        <div class="contact-info-card">
                            <div class="contact-icon">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <h3>Email</h3>
                            <a href="mailto:founder.auctusventures@gmail.com">founder.auctusventures@gmail.com</a>
                        </div>
                        <div class="contact-info-card">
                            <div class="contact-icon">
                                <i class="fas fa-phone"></i>
                            </div>
                            <h3>Phone</h3>
                            <a href="tel:+16162686297">(616) 268-6297</a>
                        </div>
                        <div class="contact-info-card">
                            <div class="contact-icon">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <h3>Location</h3>
                            <p>Hudsonville, Michigan, US</p>
                        </div>
                        <div class="contact-info-card">
                            <div class="contact-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <h3>Availability</h3>
                            <p>24/7 Support - Always Here for You</p>
                        </div>
                    </div>
                </section>

                <!-- CTA Section -->
                <section class="mission-cta">
                    <h2>Ready to Start Your Journey?</h2>
                    <p>Let's transform your digital vision into reality.</p>
                    <a href="#/contact" class="btn-primary">Start a Project</a>
                </section>
            </div>
        `
    },
    
    signup: {
        title: 'Sign Up',
        icon: 'fa-user-plus',
        filename: 'signup.html',
        content: `
            <div class="editor-content auth-page">
                <div class="auth-container">
                    <div class="auth-card">
                        <div class="auth-header">
                            <h1>Create Your Account</h1>
                            <p>Join Auctus Studio for exclusive access to client portals and project updates</p>
                        </div>

                        <form class="auth-form" id="signupForm">
                            <div class="form-group">
                                <label for="signup-company">Company Name (Optional)</label>
                                <input type="text" id="signup-company" name="company" placeholder="Your Company">
                            </div>

                            <div class="form-group">
                                <label for="signup-email">Email Address</label>
                                <input type="email" id="signup-email" name="email" placeholder="you@company.com" required>
                            </div>

                            <div class="form-group">
                                <label for="signup-password">Password</label>
                                <input type="password" id="signup-password" name="password" placeholder="Enter a strong password" required>
                                <small class="password-hint">Choose any password you want</small>
                            </div>

                            <div class="form-group">
                                <label for="signup-confirm">Confirm Password</label>
                                <input type="password" id="signup-confirm" name="confirmPassword" placeholder="Confirm password" required>
                            </div>

                            <div class="form-group checkbox">
                                <input type="checkbox" id="signup-terms" name="terms" required>
                                <label for="signup-terms">I agree to the Terms of Service and Privacy Policy</label>
                            </div>

                            <button type="submit" class="auth-btn primary">
                                <i class="fas fa-user-plus"></i> Create Account
                            </button>

                            <div class="auth-divider">
                                <span>or</span>
                            </div>

                            <button type="button" class="auth-btn secondary" id="signup-login-switch">
                                <i class="fas fa-sign-in-alt"></i> Sign In Instead
                            </button>
                        </form>

                        <div class="auth-message" id="signup-message"></div>
                    </div>

                    <div class="auth-benefits">
                        <div class="benefit-item">
                            <i class="fas fa-shield-alt"></i>
                            <h3>Secure & Private</h3>
                            <p>Enterprise-grade security for your project data</p>
                        </div>
                        <div class="benefit-item">
                            <i class="fas fa-clock"></i>
                            <h3>24/7 Access</h3>
                            <p>Track projects anytime, anywhere</p>
                        </div>
                        <div class="benefit-item">
                            <i class="fas fa-bell"></i>
                            <h3>Real-Time Updates</h3>
                            <p>Get instant notifications on project progress</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    login: {
        title: 'Sign In',
        icon: 'fa-sign-in-alt',
        filename: 'login.html',
        content: `
            <div class="editor-content auth-page">
                <div class="auth-container">
                    <div class="auth-card">
                        <div class="auth-header">
                            <h1>Welcome Back</h1>
                            <p>Sign in to access your project portal and updates</p>
                        </div>

                        <form class="auth-form" id="loginForm">
                            <div class="form-group">
                                <label for="login-email">Email Address</label>
                                <input type="email" id="login-email" name="email" placeholder="you@company.com" required>
                            </div>

                            <div class="form-group">
                                <label for="login-password">Password</label>
                                <input type="password" id="login-password" name="password" placeholder="Enter your password" required>
                            </div>

                            <div class="form-options">
                                <label class="remember-me">
                                    <input type="checkbox" name="remember" id="login-remember">
                                    <span>Remember me</span>
                                </label>
                                <a href="#/contact" class="forgot-password">Forgot password?</a>
                            </div>

                            <button type="submit" class="auth-btn primary">
                                <i class="fas fa-sign-in-alt"></i> Sign In
                            </button>

                            <div class="auth-divider">
                                <span>or</span>
                            </div>

                            <button type="button" class="auth-btn secondary" id="login-signup-switch">
                                <i class="fas fa-user-plus"></i> Create New Account
                            </button>
                        </form>

                        <div class="auth-message" id="login-message"></div>
                    </div>

                    <div class="auth-info">
                        <div class="info-card">
                            <i class="fas fa-star"></i>
                            <h3>Client Portal</h3>
                            <p>Access your dedicated project portal with real-time updates, file sharing, and direct communication with your Auctus team.</p>
                        </div>
                        <div class="info-card">
                            <i class="fas fa-headset"></i>
                            <h3>Dedicated Support</h3>
                            <p>Get priority support from our team. We're here to help you succeed with your project.</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    contact: {
        title: 'Contact',
        icon: 'fa-envelope',
        filename: 'contact.html',
        content: `
            <div class="editor-content">
                <div class="contact-page">
                    <!-- Hero Section -->
                    <section class="contact-hero">
                        <div class="contact-hero-content">
                            <div class="hero-badge">Connect With The Team</div>
                            <h1 class="contact-hero-title">Crafting Intelligent Experiences <span class="gradient-text">Together</span></h1>
                            <p class="contact-hero-subtitle">Tell us about the transformation you are ready to launch. We blend breakthrough AI, immersive web design, and precise automation into a single engagement tailored to your vision.</p>
                            
                            <div class="hero-actions">
                                <a class="hero-btn primary" href="mailto:founder.auctusventures@gmail.com">
                                    <i class="fas fa-envelope"></i> Email The Studio
                                </a>
                                <a class="hero-btn secondary" href="tel:+16162686297">
                                    <i class="fas fa-phone"></i> Call (616) 268-6297
                                </a>
                            </div>

                            <div class="hero-stats-row">
                                <div class="hero-stat">
                                    <strong>50+</strong>
                                    <span>Projects Delivered</span>
                                </div>
                                <div class="hero-stat">
                                    <strong>10+</strong>
                                    <span>Industries Served</span>
                                </div>
                                <div class="hero-stat">
                                    <strong>100%</strong>
                                    <span>Custom Built Solutions</span>
                                </div>
                            </div>
                        </div>

                        <article class="discovery-card">
                            <div class="discovery-header">
                                <div class="discovery-icon">✨</div>
                                <div>
                                    <h2 class="discovery-title">A Guided Discovery</h2>
                                    <p class="discovery-description">Every engagement starts with clarity—expect strategic insight, not sales scripts.</p>
                                </div>
                            </div>

                            <div class="discovery-divider"></div>

                            <div class="discovery-list">
                                <div class="discovery-item">
                                    <i class="fas fa-check"></i>
                                    <span>Co-create a roadmap that merges web, AI, and automation.</span>
                                </div>
                                <div class="discovery-item">
                                    <i class="fas fa-book"></i>
                                    <span>Access deep dives, design explorations, and automation playbooks.</span>
                                </div>
                                <div class="discovery-item">
                                    <i class="fas fa-eye"></i>
                                    <span>See working concepts fast through live prototypes and pilots.</span>
                                </div>
                            </div>
                        </article>
                    </section>

                    <!-- Form Section -->
                    <section class="contact-form-section">
                        <div class="form-wrapper">
                            <h3 class="form-title">Start A Conversation</h3>
                            <form class="contact-form" id="contactForm">
                                <div class="form-grid">
                                    <div class="form-group">
                                        <label for="name">Your Name</label>
                                        <input type="text" id="name" name="name" placeholder="John Smith" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="email">Email Address</label>
                                        <input type="email" id="email" name="email" placeholder="you@company.com" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="company">Company</label>
                                        <input type="text" id="company" name="company" placeholder="Your Company" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="phone">Phone Number</label>
                                        <input type="tel" id="phone" name="phone" placeholder="(616) 555-1234" required>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="service">Which plan are you interested in?</label>
                                    <select id="service" name="service" required>
                                        <option value="">Select a plan</option>
                                        <optgroup label="Monthly Subscription">
                                            <option value="intro">Intro Plan - $25/month</option>
                                            <option value="starter">Starter Plan - $100/month</option>
                                            <option value="professional">Professional Plan - $250/month</option>
                                            <option value="premium">Premium Plan - $400/month</option>
                                        </optgroup>
                                        <optgroup label="One-Time Purchase">
                                            <option value="basic-site">Basic Website - $1,500</option>
                                            <option value="standard-site">Standard Website - $3,000</option>
                                            <option value="advanced-site">Advanced Website - $5,000+</option>
                                        </optgroup>
                                        <optgroup label="Other Services">
                                            <option value="app">Mobile & Web Applications</option>
                                            <option value="ai">AI & Automation Solutions</option>
                                            <option value="consulting">Strategic Consultation</option>
                                            <option value="custom">Custom Project</option>
                                        </optgroup>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="timeline">Ideal Timeline</label>
                                    <select id="timeline" name="timeline" required>
                                        <option value="">Choose a timeframe</option>
                                        <option value="immediate">Ready to begin</option>
                                        <option value="1-3">1 - 3 months</option>
                                        <option value="3-6">3 - 6 months</option>
                                        <option value="flexible">Exploring options</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="message">Tell us about your vision</label>
                                    <textarea id="message" name="message" rows="5" placeholder="Share goals, challenges, or inspiration..." required></textarea>
                                </div>

                                <button type="submit" class="submit-btn">
                                    <span>Launch The Introduction</span>
                                    <i class="fas fa-arrow-right"></i>
                                </button>
                            </form>
                        </div>

                        <aside class="meta-panel">
                            <article class="meta-card">
                                <div class="meta-header">
                                    <div class="meta-icon">📡</div>
                                    <h3 class="meta-title">Direct Channels</h3>
                                </div>
                                <div class="meta-body">
                                    <a href="mailto:founder.auctusventures@gmail.com">founder.auctusventures@gmail.com</a>
                                    <a href="tel:+16162686297">(616) 268-6297</a>
                                    <p>Prefer a live sync? Share a few times that work and we will align instantly.</p>
                                </div>
                            </article>

                            <article class="meta-card">
                                <div class="meta-header">
                                    <div class="meta-icon">🕑</div>
                                    <h3 class="meta-title">Global Schedule</h3>
                                </div>
                                <div class="meta-body">
                                    <div class="hours-grid">
                                        <div class="hours-row"><span>Every Day</span><span>24/7 - Always Available</span></div>
                                        <div class="hours-row"><span>Location</span><span>Hudsonville, Michigan</span></div>
                                    </div>
                                    <p>We operate across North America, West Michigan HQ.</p>
                                </div>
                            </article>

                            <article class="meta-card">
                                <div class="meta-header">
                                    <div class="meta-icon">🌐</div>
                                    <h3 class="meta-title">Presence</h3>
                                </div>
                                <div class="meta-body">
                                    <p>Grand Rapids, Michigan · Remote-first collaborations worldwide.</p>
                                    <p>In-person intensives available upon request.</p>
                                </div>
                            </article>
                        </aside>
                    </section>

                    <!-- Insights Section -->
                    <section class="contact-insights">
                        <article class="insight-card">
                            <div class="insight-header">
                                <div class="insight-icon">🤝</div>
                                <h3 class="insight-title">Collaborative Kickoffs</h3>
                            </div>
                            <p class="insight-body">Co-design your roadmap with a blend of strategy, creative direction, and automation architecture in the very first workshop.</p>
                        </article>

                        <article class="insight-card">
                            <div class="insight-header">
                                <div class="insight-icon">🚀</div>
                                <h3 class="insight-title">Velocity & Validation</h3>
                            </div>
                            <p class="insight-body">Move from ideas to proof within <strong>30 days</strong> through rapid prototyping and AI-assisted delivery sprints.</p>
                        </article>

                        <article class="insight-card">
                            <div class="insight-header">
                                <div class="insight-icon">🛰️</div>
                                <h3 class="insight-title">Always-On Partnership</h3>
                            </div>
                            <p class="insight-body">We stay embedded with your team to optimize, adapt, and extend capabilities long after launch.</p>
                        </article>
                    </section>
                </div>
            </div>
        `
    },

    login: {
        title: 'Login',
        icon: 'fa-sign-in-alt',
        filename: 'login.html',
        content: `
            <div class="editor-content">
                <div class="auth-page login-page">
                    <!-- Auth Container -->
                    <div class="auth-container">
                        <!-- Left Section - Branding -->
                        <div class="auth-left-section">
                            <div class="auth-logo">
                                <i class="fas fa-rocket"></i>
                            </div>
                            <h1 class="auth-brand-title">Auctus Studio</h1>
                            <p class="auth-brand-subtitle">AI-Powered Web Design & Development</p>
                            <div class="auth-features">
                                <div class="auth-feature">
                                    <i class="fas fa-check-circle"></i>
                                    <span>Breakthrough AI Integration</span>
                                </div>
                                <div class="auth-feature">
                                    <i class="fas fa-check-circle"></i>
                                    <span>Immersive Design Tools</span>
                                </div>
                                <div class="auth-feature">
                                    <i class="fas fa-check-circle"></i>
                                    <span>Complete Automation</span>
                                </div>
                            </div>
                        </div>

                        <!-- Right Section - Login Form -->
                        <div class="auth-right-section">
                            <div class="auth-form-wrapper">
                                <h2 class="auth-form-title">Welcome Back</h2>
                                <p class="auth-form-subtitle">Sign in to your Auctus Studio account</p>

                                <form class="auth-form" id="loginForm">
                                    <!-- Email Field -->
                                    <div class="form-group">
                                        <label for="login-email" class="form-label">Email Address</label>
                                        <input
                                            type="email"
                                            id="login-email"
                                            name="email"
                                            class="form-input"
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </div>

                                    <!-- Password Field -->
                                    <div class="form-group">
                                        <label for="login-password" class="form-label">Password</label>
                                        <input
                                            type="password"
                                            id="login-password"
                                            name="password"
                                            class="form-input"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>

                                    <!-- Remember & Forgot Links -->
                                    <div class="form-options">
                                        <label class="remember-checkbox">
                                            <input type="checkbox" id="login-remember" name="remember" />
                                            <span>Remember me</span>
                                        </label>
                                        <a href="#/forgot-password" class="forgot-link">Forgot password?</a>
                                    </div>

                                    <!-- Message Display -->
                                    <div id="login-message"></div>

                                    <!-- Login Button -->
                                    <button type="submit" class="auth-button primary">
                                        <i class="fas fa-sign-in-alt"></i> Sign In
                                    </button>
                                </form>

                                <!-- Divider -->
                                <div class="auth-divider">
                                    <span>or continue with</span>
                                </div>

                                <!-- OAuth Options -->
                                <div class="oauth-buttons">
                                    <button class="oauth-button google">
                                        <i class="fab fa-google"></i>
                                        <span>Google</span>
                                    </button>
                                    <button class="oauth-button github">
                                        <i class="fab fa-github"></i>
                                        <span>GitHub</span>
                                    </button>
                                </div>

                                <!-- Sign Up Link -->
                                <div class="auth-footer">
                                    <p>Don't have an account? <a href="#/signup" class="auth-link">Create one</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    signup: {
        title: 'Create Account',
        icon: 'fa-user-plus',
        filename: 'signup.html',
        content: `
            <div class="editor-content">
                <div class="auth-page signup-page">
                    <!-- Auth Container -->
                    <div class="auth-container">
                        <!-- Left Section - Branding -->
                        <div class="auth-left-section">
                            <div class="auth-logo">
                                <i class="fas fa-rocket"></i>
                            </div>
                            <h1 class="auth-brand-title">Auctus Studio</h1>
                            <p class="auth-brand-subtitle">AI-Powered Web Design & Development</p>
                            <div class="auth-features">
                                <div class="auth-feature">
                                    <i class="fas fa-check-circle"></i>
                                    <span>Breakthrough AI Integration</span>
                                </div>
                                <div class="auth-feature">
                                    <i class="fas fa-check-circle"></i>
                                    <span>Immersive Design Tools</span>
                                </div>
                                <div class="auth-feature">
                                    <i class="fas fa-check-circle"></i>
                                    <span>Complete Automation</span>
                                </div>
                            </div>
                        </div>

                        <!-- Right Section - Signup Form -->
                        <div class="auth-right-section">
                            <div class="auth-form-wrapper">
                                <h2 class="auth-form-title">Create Your Account</h2>
                                <p class="auth-form-subtitle">Join Auctus Studio and start building amazing projects</p>

                                <form class="auth-form" id="signupForm">
                                    <!-- Phone Field -->
                                    <div class="form-group">
                                        <label for="signup-phone" class="form-label">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="signup-phone"
                                            name="phone"
                                            class="form-input"
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </div>

                                    <!-- Email Field -->
                                    <div class="form-group">
                                        <label for="signup-email" class="form-label">Email Address</label>
                                        <input
                                            type="email"
                                            id="signup-email"
                                            name="email"
                                            class="form-input"
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </div>

                                    <!-- Password Field -->
                                    <div class="form-group">
                                        <label for="signup-password" class="form-label">Password</label>
                                        <input
                                            type="password"
                                            id="signup-password"
                                            name="password"
                                            class="form-input"
                                            placeholder="••••••••"
                                            required
                                        />
                                        <small class="password-hint">Choose any password you want</small>
                                    </div>

                                    <!-- Confirm Password Field -->
                                    <div class="form-group">
                                        <label for="signup-confirm" class="form-label">Confirm Password</label>
                                        <input
                                            type="password"
                                            id="signup-confirm"
                                            name="confirm_password"
                                            class="form-input"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>

                                    <!-- Extra Information Section (Collapsible) -->
                                    <div class="extra-info-section">
                                        <button type="button" class="extra-info-toggle" id="extraInfoToggle">
                                            <i class="fas fa-chevron-down"></i>
                                            <span>Extra Information (Optional)</span>
                                        </button>
                                        <div class="extra-info-content" id="extraInfoContent" style="display: none;">
                                            <!-- Company Field -->
                                            <div class="form-group">
                                                <label for="signup-company" class="form-label">Company Name</label>
                                                <input
                                                    type="text"
                                                    id="signup-company"
                                                    name="company"
                                                    class="form-input"
                                                    placeholder="Your company name"
                                                />
                                            </div>

                                            <!-- Contact Name Field -->
                                            <div class="form-group">
                                                <label for="signup-contact" class="form-label">Contact Name</label>
                                                <input
                                                    type="text"
                                                    id="signup-contact"
                                                    name="contact"
                                                    class="form-input"
                                                    placeholder="Your full name"
                                                />
                                            </div>

                                            <!-- Website URL Field -->
                                            <div class="form-group">
                                                <label for="signup-website" class="form-label">Website URL</label>
                                                <input
                                                    type="url"
                                                    id="signup-website"
                                                    name="websiteUrl"
                                                    class="form-input"
                                                    placeholder="https://example.com"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Terms Checkbox -->
                                    <label class="terms-checkbox">
                                        <input type="checkbox" id="signup-terms" name="terms" required />
                                        <span>I agree to the <a href="#/terms" class="inline-link">Terms of Service</a> and <a href="#/privacy" class="inline-link">Privacy Policy</a></span>
                                    </label>

                                    <!-- Message Display -->
                                    <div id="signup-message"></div>

                                    <!-- Sign Up Button -->
                                    <button type="submit" class="auth-button primary">
                                        <i class="fas fa-user-plus"></i> Create Account
                                    </button>
                                </form>

                                <!-- Divider -->
                                <div class="auth-divider">
                                    <span>or sign up with</span>
                                </div>

                                <!-- OAuth Options -->
                                <div class="oauth-buttons">
                                    <button class="oauth-button google">
                                        <i class="fab fa-google"></i>
                                        <span>Google</span>
                                    </button>
                                    <button class="oauth-button github">
                                        <i class="fab fa-github"></i>
                                        <span>GitHub</span>
                                    </button>
                                </div>

                                <!-- Sign In Link -->
                                <div class="auth-footer">
                                    <p>Already have an account? <a href="#/login" class="auth-link">Sign in</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
};

// ===================================================================
// TUTORIAL SYSTEM
// First-time user onboarding with interactive overlays
// ===================================================================

const TutorialManager = {
    isFirstVisit: !localStorage.getItem('auctus_first_visit_complete'),
    isTutorialActive: false,
    currentStep: 0,
    currentTarget: null,
    currentTargetListener: null,
    currentNextBtnListener: null,
    currentPrevBtnListener: null,
    
    steps: [
        {
            title: 'Explorer',
            text: 'This is where all your pages are. Click here to explore different sections',
            target: '.activity-icon[data-view="explorer"]',
            position: 'right'
        },
        {
            title: 'Profile & Sign In',
            text: 'Sign up or sign into your account to access personalized features',
            target: '.activity-icon[data-view="account"]',
            position: 'right'
        }
    ],
    
    renderButtons: function() {
        const container = document.getElementById('home-hero-buttons');
        if (!container) return;
        
        if (!localStorage.getItem('auctus_tutorial_completed')) {
            container.innerHTML = `
                <button id="tutorial-start-btn" class="cta-button primary">
                    <i class="fas fa-rocket"></i> Get Started
                </button>
            `;
            document.getElementById('tutorial-start-btn').addEventListener('click', () => this.start());
        } else {
            // Clean minimalist page - no buttons after tutorial
            container.innerHTML = '';
        }
    },
    
    openExplorer: function() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.add('visible');
            document.body.classList.add('sidebar-open');
            sessionStorage.setItem('sidebarOpen', 'true');
        }
    },
    
    start: function() {
        this.isTutorialActive = true;
        this.currentStep = 0;
        this.showStep();
    },
    
    showStep: function() {
        console.log('showStep called, currentStep:', this.currentStep, 'stepsLength:', this.steps.length);
        if (this.currentStep >= this.steps.length) {
            console.log('currentStep >= steps.length, calling complete()');
            this.complete();
            return;
        }
        
        const step = this.steps[this.currentStep];
        const isMobile = window.innerWidth < 768;
        console.log('Showing step:', this.currentStep, 'isMobile:', isMobile, 'target:', step.target);
        
        // Function to get target and display tutorial
        const displayTutorial = () => {
            let target;
            let needsMenuOpen = false;
            
            // On mobile, use different targets
            if (isMobile) {
                if (step.target === '.activity-icon[data-view="explorer"]') {
                    // First step: highlight hamburger menu
                    target = document.querySelector('#mobile-menu-btn');
                    needsMenuOpen = true;
                } else if (step.target === '.activity-icon[data-view="account"]') {
                    // Second step: highlight the mobile profile button in sidebar
                    target = document.querySelector('#mobile-profile-btn');
                } else {
                    target = document.querySelector(step.target);
                }
            } else {
                target = document.querySelector(step.target);
            }
            
            if (!target) {
                console.warn('Tutorial: Target not found for step', this.currentStep, 'selector:', step.target, 'isMobile:', isMobile);
                // If we can't find any target, complete the tutorial to prevent getting stuck
                if (this.currentStep >= this.steps.length - 1) {
                    console.warn('Tutorial: Cannot find last step target, completing tutorial');
                    this.complete();
                } else {
                    // Skip this step
                    this.nextStep();
                }
                return;
            }
            
            // Remove previous tutorial elements if they exist
            const existingOverlay = document.getElementById('tutorial-overlay');
            if (existingOverlay) existingOverlay.remove();
            
            const existingTooltip = document.getElementById('tutorial-tooltip');
            if (existingTooltip) existingTooltip.remove();
            
            const existingHighlight = document.getElementById('tutorial-highlight');
            if (existingHighlight) existingHighlight.remove();
            
            // Reset z-index on previously highlighted elements
            const elementsWithHighZ = document.querySelectorAll('[style*="z-index: 10001"]');
            elementsWithHighZ.forEach(el => {
                el.style.zIndex = '';
                el.style.pointerEvents = '';
                if (!el.getAttribute('style')) el.removeAttribute('style');
            });
            
            this.showHighlightAndTooltip(step, target, isMobile, needsMenuOpen);
        };
        
        // On mobile second step, make sure menu is open and wait for DOM to be ready
        if (isMobile && step.target === '.activity-icon[data-view="account"]') {
            const sidebar = document.getElementById('sidebar');
            if (!sidebar.classList.contains('visible')) {
                const mobileMenuBtn = document.getElementById('mobile-menu-btn');
                if (mobileMenuBtn) {
                    mobileMenuBtn.click();
                    // Wait for menu animation to complete
                    setTimeout(displayTutorial.bind(this), 600);
                    return;
                }
            } else {
                // Menu is already open, check if profile button exists
                const profileBtn = document.querySelector('#mobile-profile-btn');
                if (!profileBtn) {
                    console.warn('Tutorial: Profile button not found, waiting for sidebar to load');
                    setTimeout(displayTutorial.bind(this), 300);
                    return;
                }
                // No delay needed - sidebar is already visible
                displayTutorial.call(this);
                return;
            }
        }
        
        displayTutorial.call(this);
    },
    
    showHighlightAndTooltip: function(step, target, isMobile, needsMenuOpen) {
        const self = this;
        
        // Remove any existing tutorial elements to prevent duplicate listeners
        const existingOverlay = document.getElementById('tutorial-overlay');
        if (existingOverlay) existingOverlay.remove();
        const existingTooltip = document.getElementById('tutorial-tooltip');
        if (existingTooltip) existingTooltip.remove();
        const existingHighlight = document.getElementById('tutorial-highlight');
        if (existingHighlight) existingHighlight.remove();
        
        // Remove old event listeners from previous target
        if (this.currentTarget && this.currentTargetListener) {
            this.currentTarget.removeEventListener('click', this.currentTargetListener);
        }
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'tutorial-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9998;
            pointer-events: none;
        `;
        document.body.appendChild(overlay);
        
        // Highlight target element
        const rect = target.getBoundingClientRect();
        const highlightDiv = document.createElement('div');
        highlightDiv.id = 'tutorial-highlight';
        highlightDiv.style.cssText = `
            position: fixed;
            top: ${rect.top - 8}px;
            left: ${rect.left - 8}px;
            width: ${rect.width + 16}px;
            height: ${rect.height + 16}px;
            border: 3px solid #00d4ff;
            border-radius: 8px;
            z-index: 9999;
            pointer-events: none;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(highlightDiv);
        
        // Make target element interactive and above overlay
        target.style.position = 'relative';
        target.style.zIndex = '10001';
        
        // On the last step, make the target non-clickable (only Done button works)
        if (this.currentStep === this.steps.length - 1) {
            target.style.pointerEvents = 'none';
        }
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.id = 'tutorial-tooltip';
        const maxWidth = isMobile ? 'calc(100vw - 40px)' : '300px';
        tooltip.style.cssText = `
            position: fixed;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 20px;
            max-width: ${maxWidth};
            z-index: 10000;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            color: var(--text-primary);
        `;
        
        tooltip.innerHTML = `
            <h3 style="margin: 0 0 10px 0; font-size: 16px; color: var(--text-primary);">${step.title}</h3>
            <p style="margin: 0 0 15px 0; font-size: 14px; opacity: 0.9; color: var(--text-secondary);">${step.text}</p>
            <div class="tutorial-button-group" style="display: flex; gap: 10px; flex-direction: ${isMobile ? 'column' : 'row'};">
                ${this.currentStep > 0 ? `<button id="tutorial-prev" class="cta-button" style="flex: 1; padding: 10px; font-size: ${isMobile ? '14px' : '12px'};">← Back</button>` : ''}
                <button id="tutorial-next" class="cta-button primary" style="flex: 1; padding: 10px; font-size: ${isMobile ? '14px' : '12px'};">${this.currentStep === this.steps.length - 1 ? 'Done ✓' : 'Next →'}</button>
            </div>
        `;
        
        document.body.appendChild(tooltip);
        
        // Position tooltip - mobile-friendly positioning
        setTimeout(() => {
            const tooltipRect = tooltip.getBoundingClientRect();
            let top, left;
            const padding = 20;
            
            if (isMobile) {
                // On mobile, prefer below the element with fallback to above
                if (rect.bottom + tooltipRect.height + padding < window.innerHeight) {
                    top = rect.bottom + padding;
                } else if (rect.top - tooltipRect.height - padding > 0) {
                    top = rect.top - tooltipRect.height - padding;
                } else {
                    // Center vertically as last resort
                    top = window.innerHeight / 2 - tooltipRect.height / 2;
                }
                
                // Center horizontally on mobile with padding
                left = Math.max(padding, window.innerWidth / 2 - tooltipRect.width / 2);
                left = Math.min(left, window.innerWidth - tooltipRect.width - padding);
            } else {
                // Desktop positioning
                top = rect.top - tooltipRect.height - padding;
                left = rect.left + rect.width / 2 - tooltipRect.width / 2;
                
                if (top < padding) {
                    top = rect.bottom + padding;
                }
                
                if (left < padding) {
                    left = padding;
                } else if (left + tooltipRect.width > window.innerWidth - padding) {
                    left = window.innerWidth - tooltipRect.width - padding;
                }
            }
            
            tooltip.style.top = top + 'px';
            tooltip.style.left = left + 'px';
        }, 0);
        
        // Attach button listeners with proper 'this' binding
        const nextBtn = document.getElementById('tutorial-next');
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Next button clicked! currentStep=', self.currentStep, 'steps.length=', self.steps.length, 'isLastStep=', self.currentStep === self.steps.length - 1);
                
                // On last step, button says "Done ✓" and should complete tutorial
                if (self.currentStep === self.steps.length - 1) {
                    console.log('Calling complete() from Done button');
                    self.complete();
                    return;
                }
                
                // If on first step of mobile, wait for menu to open before advancing
                if (needsMenuOpen && !document.getElementById('sidebar').classList.contains('visible')) {
                    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
                    if (mobileMenuBtn) {
                        // Set flag to prevent the hamburger's click listener from auto-advancing
                        self.isClickingFromNextButton = true;
                        mobileMenuBtn.click();
                        // Wait for menu animation (250ms + small buffer), then advance manually
                        setTimeout(() => {
                            self.isClickingFromNextButton = false;
                            self.nextStep();
                        }, 300);
                        return;
                    }
                }
                self.nextStep();
            });
        }
        
        const prevBtn = document.getElementById('tutorial-prev');
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                self.prevStep();
            });
        }
        
        // Allow clicking the highlighted element to advance tutorial (but not on last step)
        console.log('Checking if should add click listener: currentStep=', this.currentStep, 'steps.length=', this.steps.length, 'condition result:', this.currentStep < this.steps.length - 1);
        if (this.currentStep < this.steps.length - 1) {
            console.log('Adding click listener to target');
            // Store listener function reference so it can be removed later
            this.currentTargetListener = function(e) {
                console.log('Target clicked! currentStep=', self.currentStep, 'isFromNextButton=', self.isClickingFromNextButton);
                
                // If this click came from the Next button, don't auto-advance (Next button handles it)
                if (self.isClickingFromNextButton) {
                    self.isClickingFromNextButton = false;
                    return;
                }
                
                // On the last step, prevent any default action and don't auto-advance
                if (self.currentStep === self.steps.length - 1) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                
                // For earlier steps, allow auto-advance
                // For menu button on mobile first step, let it open and advance
                if (needsMenuOpen) {
                    // Don't prevent default - let menu open
                    self.nextStep();
                } else {
                    // For other elements, prevent default if not a link or button
                    if (target.tagName !== 'A' && target.tagName !== 'BUTTON') {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    self.nextStep();
                }
            };
            target.addEventListener('click', this.currentTargetListener);
            this.currentTarget = target;
        } else {
            // On last step, clear the stored references
            this.currentTarget = null;
            this.currentTargetListener = null;
        }
    },
    
    nextStep: function() {
        console.log('nextStep called, currentStep before increment:', this.currentStep);
        console.trace('nextStep stack trace');
        // Remove tutorial elements immediately for instant transition
        try {
            this.currentStep++;
            this.showStep();
        } catch (error) {
            console.error('Tutorial error:', error);
            this.forceCleanup();
        }
    },
    
    prevStep: function() {
        // Add fade-out animation before transitioning
        const overlay = document.getElementById('tutorial-overlay');
        const tooltip = document.getElementById('tutorial-tooltip');
        const highlight = document.getElementById('tutorial-highlight');
        
        if (overlay) overlay.classList.add('fade-out');
        if (tooltip) tooltip.classList.add('fade-out');
        
        setTimeout(() => {
            if (this.currentStep > 0) {
                this.currentStep--;
                
                // If going back to step 0 on mobile, close the sidebar
                const isMobile = window.innerWidth < 768;
                if (isMobile && this.currentStep === 0) {
                    const sidebar = document.getElementById('sidebar');
                    if (sidebar && sidebar.classList.contains('visible')) {
                        sidebar.classList.remove('visible');
                    }
                }
                
                this.showStep();
            }
        }, 300);
    },
    
    complete: function() {
        console.log('complete() called, currentStep:', this.currentStep);
        console.trace('Stack trace for complete()');
        
        // Remove event listeners from current target immediately
        if (this.currentTarget && this.currentTargetListener) {
            this.currentTarget.removeEventListener('click', this.currentTargetListener);
            this.currentTarget = null;
            this.currentTargetListener = null;
        }
        
        // Mark as inactive immediately
        this.isTutorialActive = false;
        localStorage.setItem('auctus_tutorial_completed', 'true');
        localStorage.setItem('auctus_first_visit_complete', 'true');
        
        // Close the mobile sidebar immediately
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('visible')) {
            sidebar.classList.remove('visible');
        }
        
        // Remove sidebar-open class from body to hide the black overlay
        document.body.classList.remove('sidebar-open');
        
        // Clean up - remove all tutorial elements immediately (including any duplicates)
        document.querySelectorAll('#tutorial-overlay').forEach(el => el.remove());
        document.querySelectorAll('#tutorial-tooltip').forEach(el => el.remove());
        document.querySelectorAll('#tutorial-highlight').forEach(el => el.remove());
        
        // Reset z-index on highlighted elements
        const elementsWithHighZ = document.querySelectorAll('[style*="z-index: 10001"]');
        elementsWithHighZ.forEach(el => {
            el.style.zIndex = '';
            el.style.pointerEvents = '';
            if (!el.getAttribute('style')) el.removeAttribute('style');
        });
        
        // Re-render buttons
        this.renderButtons();
    },
    
    forceCleanup: function() {
        // Emergency cleanup function to remove all tutorial elements
        const overlay = document.getElementById('tutorial-overlay');
        const tooltip = document.getElementById('tutorial-tooltip');
        const highlight = document.getElementById('tutorial-highlight');
        
        if (overlay) overlay.remove();
        if (tooltip) tooltip.remove();
        if (highlight) highlight.remove();
        
        // Reset z-index on all elements
        document.querySelectorAll('[style*="z-index"]').forEach(el => {
            if (el.style.zIndex === '10001') {
                el.style.zIndex = '';
                el.style.pointerEvents = '';
                if (!el.getAttribute('style')) el.removeAttribute('style');
            }
        });
        
        this.isTutorialActive = false;
    }
};

// ===================================================================
// PARTICLE BACKGROUND ANIMATION
// Minimalist animated particles with mouse interaction
// ===================================================================

const ParticleBackground = {
    canvas: null,
    ctx: null,
    particles: [],
    floatingElements: [],
    mouse: { x: null, y: null, radius: 200 },
    animationId: null,
    
    init: function() {
        this.canvas = document.getElementById('particle-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.createParticles();
        this.createFloatingElements();
        this.animate();
        
        // Event listeners - track mouse on entire document
        window.addEventListener('resize', () => this.handleResize());
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    },
    
    createFloatingElements: function() {
        this.floatingElements = [];
        // Create 2-3 floating elements that move around
        const numElements = 2 + Math.floor(Math.random());
        const minDistance = 200; // Minimum distance between elements
        
        for (let i = 0; i < numElements; i++) {
            let x, y, validPosition;
            
            // Keep generating random positions until we find one far enough from others
            do {
                validPosition = true;
                x = Math.random() * this.canvas.width;
                y = Math.random() * this.canvas.height;
                
                // Check distance to all existing elements
                for (let j = 0; j < this.floatingElements.length; j++) {
                    const dx = x - this.floatingElements[j].x;
                    const dy = y - this.floatingElements[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < minDistance) {
                        validPosition = false;
                        break;
                    }
                }
            } while (!validPosition);
            
            this.floatingElements.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: 40 + Math.random() * 30,
                influence: 150,
                type: Math.random() > 0.5 ? 'attractor' : 'repeller'
            });
        }
    },
    
    resize: function() {
        if (!this.canvas) return;
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
    },
    
    handleResize: function() {
        if (!this.canvas) return;
        
        // Store old dimensions
        const oldWidth = this.canvas.width;
        const oldHeight = this.canvas.height;
        
        // Get new dimensions
        const container = this.canvas.parentElement;
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        
        // Calculate scale factors
        const scaleX = newWidth / oldWidth;
        const scaleY = newHeight / oldHeight;
        
        // Scale all particle and element positions proportionally
        this.particles.forEach(particle => {
            particle.x *= scaleX;
            particle.y *= scaleY;
        });
        
        this.floatingElements.forEach(element => {
            element.x *= scaleX;
            element.y *= scaleY;
        });
        
        // Now update canvas dimensions
        this.canvas.width = newWidth;
        this.canvas.height = newHeight;
    },
    
    createParticles: function() {
        this.particles = [];
        const numberOfParticles = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        
        for (let i = 0; i < numberOfParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    },
    
    handleMouseMove: function(e) {
        if (!this.canvas || !this.canvas.classList.contains('active')) {
            this.mouse.x = null;
            this.mouse.y = null;
            return;
        }
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    },
    
    animate: function() {
        if (!this.ctx || !this.canvas) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and animate floating elements
        this.floatingElements.forEach(element => {
            // Add subtle wandering motion
            element.vx += (Math.random() - 0.5) * 0.01;
            element.vy += (Math.random() - 0.5) * 0.01;
            
            // Limit speed
            const speed = Math.sqrt(element.vx * element.vx + element.vy * element.vy);
            if (speed > 0.5) {
                element.vx = (element.vx / speed) * 0.5;
                element.vy = (element.vy / speed) * 0.5;
            }
            
            // Move element
            element.x += element.vx;
            element.y += element.vy;
            
            // Bounce off edges
            if (element.x - element.radius < 0 || element.x + element.radius > this.canvas.width) {
                element.vx *= -1;
                element.x = Math.max(element.radius, Math.min(this.canvas.width - element.radius, element.x));
            }
            if (element.y - element.radius < 0 || element.y + element.radius > this.canvas.height) {
                element.vy *= -1;
                element.y = Math.max(element.radius, Math.min(this.canvas.height - element.radius, element.y));
            }
        });
        
        // Update and draw particles
        this.particles.forEach(particle => {
            // Mouse interaction - gentle attraction
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    particle.vx += (dx / distance) * force * 0.12;
                    particle.vy += (dy / distance) * force * 0.12;
                }
            }
            
            // Floating element interaction
            this.floatingElements.forEach(element => {
                const dx = element.x - particle.x;
                const dy = element.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < element.influence) {
                    const force = (element.influence - distance) / element.influence;
                    if (element.type === 'attractor') {
                        particle.vx += (dx / distance) * force * 0.08;
                        particle.vy += (dy / distance) * force * 0.08;
                    } else {
                        // Repeller
                        particle.vx -= (dx / distance) * force * 0.08;
                        particle.vy -= (dy / distance) * force * 0.08;
                    }
                }
            });
            
            // Move particle
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Damping
            particle.vx *= 0.96;
            particle.vy *= 0.96;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            }
            
            // Draw particle
            this.ctx.fillStyle = 'rgba(139, 92, 246, 0.6)';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // Draw floating elements
        this.floatingElements.forEach(element => {
            // Draw element circle - purple and transparent
            this.ctx.fillStyle = 'rgba(139, 92, 246, 0.08)';
            this.ctx.beginPath();
            this.ctx.arc(element.x, element.y, element.radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw element border - purple and transparent
            this.ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)';
            this.ctx.lineWidth = 1.5;
            this.ctx.stroke();
        });
        
        // Draw connections
        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.3;
                    this.ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            });
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    },
    
    stop: function() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        if (this.ctx && this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
};

// ===================================================================
// ROUTER CLASS
// Handles navigation, content injection, and state management
// ===================================================================

class Router {
    constructor() {
        this.app = document.getElementById('app');
        this.tabsContainer = document.querySelector('.tabs');
        this.currentRoute = null;
        
        // Restore open tabs from sessionStorage or default to home
        const savedTabs = sessionStorage.getItem('openTabs');
        this.openTabs = savedTabs ? JSON.parse(savedTabs) : ['home'];
        
        // Ensure home is always in the list
        if (!this.openTabs.includes('home')) {
            this.openTabs.unshift('home');
        }
        
        this.draggedTab = null;
        this.draggedOverTab = null;
        this.dragStartX = 0;
        this.isDragging = false;
    }

    navigate(route) {
        // Validate route
        if (!PAGES[route]) {
            console.error(`Route "${route}" not found`);
            route = 'home';
        }

        // Update current route
        this.currentRoute = route;
        
        // Add to open tabs if not already there
        if (!this.openTabs.includes(route)) {
            this.openTabs.push(route);
            // Save to sessionStorage
            sessionStorage.setItem('openTabs', JSON.stringify(this.openTabs));
        }

        // Inject content
        this.app.innerHTML = PAGES[route].content;
        
        // Update tabs UI
        this.updateTabs();
        
        // Update hash without triggering hashchange
        history.pushState(null, '', `#/${route}`);
        
        // Highlight active sidebar item
        this.highlightActiveSidebarItem(route);
        
        // Update mobile page title
        this.updateMobileTitle(route);
        
        // Call page initializer if exists
        if (PAGE_INIT[route]) {
            PAGE_INIT[route]();
        }
        
        // Control particle background visibility
        const canvas = document.getElementById('particle-canvas');
        if (canvas) {
            if (route === 'home') {
                canvas.classList.add('active');
            } else {
                canvas.classList.remove('active');
                ParticleBackground.stop();
            }
        }
    }
    
    updateMobileTitle(route) {
        const mobileTitle = document.querySelector('.mobile-page-title');
        if (mobileTitle && PAGES[route]) {
            mobileTitle.textContent = PAGES[route].filename;
        }
    }

    updateTabs() {
        // Clear existing tabs
        this.tabsContainer.innerHTML = '';
        
        // Create tabs for all open pages
        this.openTabs.forEach((route, index) => {
            const page = PAGES[route];
            const tab = document.createElement('div');
            tab.className = `tab${route === this.currentRoute ? ' active' : ''}`;
            tab.setAttribute('data-file', route);
            tab.setAttribute('draggable', DEVICE.isDesktop());
            tab.setAttribute('data-index', index);
            
            tab.innerHTML = `
                <i class="fas ${page.icon}"></i>
                <span>${page.filename}</span>
                ${route !== 'home' ? `<i class="fas fa-times" data-close="${route}"></i>` : ''}
            `;
            
            // Tab click to navigate - with mobile tap handling
            let isTouchEvent = false;
            
            tab.addEventListener('touchstart', (e) => {
                e.preventDefault();
                isTouchEvent = true;
            });
            
            tab.addEventListener('touchend', (e) => {
                // Handle tap - navigate
                if (!e.target.classList.contains('fa-times')) {
                    e.preventDefault();
                    this.navigate(route);
                }
                isTouchEvent = false;
            });
            
            // Regular click handler (for non-touch devices)
            tab.addEventListener('click', (e) => {
                // Skip if this was a touch event (already handled above)
                if (isTouchEvent) return;
                
                if (!e.target.classList.contains('fa-times')) {
                    this.navigate(route);
                }
            });
            
            // Close button
            const closeBtn = tab.querySelector('.fa-times');
            if (closeBtn) {
                // Touch handlers for mobile
                closeBtn.addEventListener('touchstart', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                });
                
                closeBtn.addEventListener('touchend', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    this.closeTab(route);
                });
                
                // Click handler for desktop
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    this.closeTab(route);
                });
            }
            
            // Desktop drag and drop handlers
            if (DEVICE.isDesktop()) {
                tab.addEventListener('dragstart', (e) => this.handleDragStart(e, route, index));
                tab.addEventListener('dragover', (e) => this.handleDragOver(e));
                tab.addEventListener('dragenter', (e) => this.handleDragEnter(e));
                tab.addEventListener('dragleave', (e) => this.handleDragLeave(e));
                tab.addEventListener('drop', (e) => this.handleDrop(e, route, index));
                tab.addEventListener('dragend', (e) => this.handleDragEnd(e));
            }
            
            this.tabsContainer.appendChild(tab);
        });
    }

    showTabContextMenu(e, route) {
        // Remove existing context menu if present
        const existing = document.querySelector('.tab-context-menu');
        if (existing) existing.remove();
        
        const menu = document.createElement('div');
        menu.className = 'tab-context-menu';
        menu.innerHTML = `
            <button class="context-menu-item close-tab">
                <i class="fas fa-times"></i> Close Tab
            </button>
            <button class="context-menu-item close-other-tabs">
                <i class="fas fa-times-circle"></i> Close Others
            </button>
        `;
        
        document.body.appendChild(menu);
        
        // Position menu at touch point
        const clientX = e.clientX || e.touches?.[0].clientX || 0;
        const clientY = e.clientY || e.touches?.[0].clientY || 0;
        menu.style.top = clientY + 'px';
        menu.style.left = clientX + 'px';
        
        // Close tab handler
        menu.querySelector('.close-tab').addEventListener('click', () => {
            this.closeTab(route);
            menu.remove();
        });
        
        // Close others handler
        menu.querySelector('.close-other-tabs').addEventListener('click', () => {
            this.openTabs.forEach(r => {
                if (r !== 'home' && r !== route) {
                    this.openTabs = this.openTabs.filter(t => t !== r);
                }
            });
            sessionStorage.setItem('openTabs', JSON.stringify(this.openTabs));
            this.updateTabs();
            menu.remove();
        });
        
        // Close menu when clicking elsewhere
        const closeMenu = () => {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        };
        
        setTimeout(() => {
            document.addEventListener('click', closeMenu);
        }, 100);
    }


    handleDragStart(e, route, index) {
        this.draggedTab = { route, index };
        this.isDragging = true;
        
        const tab = e.currentTarget;
        tab.classList.add('dragging');
        
        // Create a custom drag image
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', tab.innerHTML);
        
        // Set drag image offset to cursor position
        if (e.dataTransfer.setDragImage) {
            const rect = tab.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;
            e.dataTransfer.setDragImage(tab, offsetX, offsetY);
        }
        
        // Add visual feedback to all tabs
        document.querySelectorAll('.tab').forEach(t => {
            if (t !== tab) {
                t.classList.add('drop-target');
            }
        });
    }

    handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        
        // Determine drop position (left or right of target)
        const tab = e.currentTarget;
        const rect = tab.getBoundingClientRect();
        const midpoint = rect.left + rect.width / 2;
        
        if (e.clientX < midpoint) {
            tab.classList.add('drag-over-left');
            tab.classList.remove('drag-over-right');
        } else {
            tab.classList.add('drag-over-right');
            tab.classList.remove('drag-over-left');
        }
        
        return false;
    }

    handleDragEnter(e) {
        const tab = e.currentTarget;
        if (!tab.classList.contains('dragging')) {
            tab.classList.add('drag-over');
        }
    }

    handleDragLeave(e) {
        const tab = e.currentTarget;
        tab.classList.remove('drag-over', 'drag-over-left', 'drag-over-right');
    }

    handleDrop(e, route, index) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        if (e.preventDefault) {
            e.preventDefault();
        }
        
        const tab = e.currentTarget;
        tab.classList.remove('drag-over', 'drag-over-left', 'drag-over-right');
        
        if (this.draggedTab && this.draggedTab.index !== index) {
            // Determine if we should insert before or after based on cursor position
            const rect = tab.getBoundingClientRect();
            const midpoint = rect.left + rect.width / 2;
            const insertBefore = e.clientX < midpoint;
            
            // Reorder the tabs array
            const draggedRoute = this.openTabs[this.draggedTab.index];
            this.openTabs.splice(this.draggedTab.index, 1);
            
            // Calculate new position
            let newIndex = this.openTabs.indexOf(route);
            if (!insertBefore) {
                newIndex++;
            }
            
            this.openTabs.splice(newIndex, 0, draggedRoute);
            
            // Save to sessionStorage
            sessionStorage.setItem('openTabs', JSON.stringify(this.openTabs));
            
            // Update UI with smooth transition
            this.updateTabs();
        }
        
        return false;
    }

    handleDragEnd(e) {
        this.isDragging = false;
        e.currentTarget.classList.remove('dragging');
        
        // Remove all drag-related classes
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('drag-over', 'drag-over-left', 'drag-over-right', 'drop-target');
        });
        
        this.draggedTab = null;
    }

    closeTab(route) {
        // Can't close home tab
        if (route === 'home') return;
        
        // Remove from open tabs
        this.openTabs = this.openTabs.filter(r => r !== route);
        
        // Save to sessionStorage
        sessionStorage.setItem('openTabs', JSON.stringify(this.openTabs));
        
        // If closing current tab, navigate to home
        if (route === this.currentRoute) {
            this.navigate('home');
        } else {
            this.updateTabs();
        }
    }

    highlightActiveSidebarItem(route) {
        // Remove all active classes from sidebar items
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to current route's sidebar item using hash-based href
        const activeItem = document.querySelector(`.sidebar-item[href="#/${route}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }

    handleHashChange() {
        const hash = window.location.hash.slice(2); // Remove #/
        const route = hash || 'home';
        this.navigate(route);
    }

    init() {
        // Listen to hash changes
        window.addEventListener('hashchange', () => this.handleHashChange());
        
        // Handle initial route
        this.handleHashChange();
    }
}

// ===================================================================
// PAGE INITIALIZERS
// Page-specific logic that runs after content injection
// ===================================================================

const PAGE_INIT = {
    home: () => {
        // Initialize particle background
        ParticleBackground.init();
        
        // Render tutorial buttons based on completion state
        TutorialManager.renderButtons();
        
        // Add reset tutorial button handler
        const resetBtn = document.getElementById('reset-tutorial-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('Reset the tutorial? You\'ll see "Get Started" on next page load.')) {
                    localStorage.removeItem('auctus_tutorial_completed');
                    localStorage.removeItem('auctus_first_visit_complete');
                    sessionStorage.setItem('sidebarOpen', 'false');
                    TutorialManager.renderButtons();
                    resetBtn.style.opacity = '0.5';
                    setTimeout(() => {
                        resetBtn.style.opacity = '1';
                    }, 300);
                }
            });
            
            // Add hover effect
            resetBtn.addEventListener('mouseover', () => {
                resetBtn.style.background = 'rgba(139, 92, 246, 0.3)';
                resetBtn.style.borderColor = 'rgba(139, 92, 246, 0.6)';
            });
            resetBtn.addEventListener('mouseout', () => {
                resetBtn.style.background = 'rgba(139, 92, 246, 0.2)';
                resetBtn.style.borderColor = 'rgba(139, 92, 246, 0.4)';
            });
        }
    },
    
    pricing: () => {
        // Pricing toggle functionality
        const toggleBtns = document.querySelectorAll('.toggle-btn');
        const monthlyPlans = document.getElementById('monthly-plans');
        const onetimePlans = document.getElementById('onetime-plans');
        
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const plan = btn.getAttribute('data-plan');
                
                // Update active button
                toggleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Toggle plan visibility
                if (plan === 'monthly') {
                    monthlyPlans.style.display = 'block';
                    onetimePlans.style.display = 'none';
                } else {
                    monthlyPlans.style.display = 'none';
                    onetimePlans.style.display = 'block';
                }
            });
        });
    },
    
    contact: () => {
        // Contact form handling
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Collect form data
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // For now, just log it (later: send to backend/email service)
                console.log('Form submitted:', data);
                alert('Thank you for your message! We\'ll get back to you soon.');
                form.reset();
            });
        }
        
        // Pre-fill plan from URL query param
        const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
        const plan = urlParams.get('plan');
        if (plan) {
            const serviceSelect = document.getElementById('service');
            if (serviceSelect) {
                serviceSelect.value = plan;
            }
        }
    },

    login: () => {
        const form = document.getElementById('loginForm');
        const messageDiv = document.getElementById('login-message');
        const loginToSignupBtn = document.getElementById('login-signup-switch');

        if (loginToSignupBtn) {
            loginToSignupBtn.addEventListener('click', (e) => {
                e.preventDefault();
                router.navigate('signup');
            });
        }

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                const remember = document.getElementById('login-remember').checked;

                // Show loading state
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
                submitBtn.disabled = true;

                try {
                    // Call website login proxy (handles CORS server-to-server)
                    const response = await fetch(API_CONFIG.LOGIN, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password })
                    });

                    const data = await response.json();

                    if (response.ok && data.accessToken) {
                        // Store tokens
                        localStorage.setItem('accessToken', data.accessToken);
                        localStorage.setItem('refreshToken', data.refreshToken);
                        
                        if (remember) {
                            localStorage.setItem('rememberMe', 'true');
                        }

                        // Show success message
                        messageDiv.className = 'auth-message success';
                        messageDiv.innerHTML = '<i class="fas fa-check-circle"></i> Welcome back! Redirecting to your portal...';

                        // Redirect to AuctusApp portal after 1.5 seconds (handoff tokens)
                        const redirectUrl = buildPortalRedirectUrl(data.accessToken, data.refreshToken);
                        setTimeout(() => {
                            window.location.href = redirectUrl;
                        }, 1500);
                    } else {
                        // Show error message
                        messageDiv.className = 'auth-message error';
                        messageDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${data.message || 'Invalid email or password'}`;
                        
                        // Reset button
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }
                } catch (error) {
                    messageDiv.className = 'auth-message error';
                    messageDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> Connection error. Please try again.`;
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    console.error('Login error:', error);
                }
            });
        }
    },

    signup: () => {
        const form = document.getElementById('signupForm');
        const messageDiv = document.getElementById('signup-message');
        const signupToLoginBtn = document.getElementById('signup-login-switch');
        if (signupToLoginBtn) {
            signupToLoginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                router.navigate('login');
            });
        }

        // Extra Information toggle (optional fields)
        const extraInfoToggle = document.getElementById('extraInfoToggle');
        const extraInfoContent = document.getElementById('extraInfoContent');
        if (extraInfoToggle && extraInfoContent) {
            extraInfoToggle.addEventListener('click', (e) => {
                e.preventDefault();
                const isOpen = extraInfoContent.style.display !== 'none';
                extraInfoContent.style.display = isOpen ? 'none' : 'flex';
                extraInfoToggle.classList.toggle('open');
            });
        }

        const fetchWithRetry = async (url, options, retries = 3, delay = 500) => {
            let attempt = 0;
            while (true) {
                try {
                    const response = await fetch(url, options);
                    if (response.status < 500 || attempt >= retries) {
                        return response;
                    }
                } catch (error) {
                    if (attempt >= retries) {
                        throw error;
                    }
                }

                attempt += 1;
                await new Promise((resolve) => setTimeout(resolve, delay));
                delay *= 2;
            }
        };

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const email = document.getElementById('signup-email').value;
                const phoneInput = document.getElementById('signup-phone');
                const password = document.getElementById('signup-password').value;
                const confirmPassword = document.getElementById('signup-confirm').value;
                const termsAccepted = document.getElementById('signup-terms').checked;

                const companyInput = document.getElementById('signup-company');
                const contactInput = document.getElementById('signup-contact');
                const websiteInput = document.getElementById('signup-website');
                const company = companyInput ? companyInput.value.trim() : '';
                const contact = contactInput ? contactInput.value.trim() : '';
                const websiteUrl = websiteInput ? websiteInput.value.trim() : '';
                const phone = phoneInput ? phoneInput.value.trim() : '';

                // Debug: Log form values
                console.log('Form values:', { email, phone, password: '***', confirmPassword: '***' });

                // Validation
                if (password !== confirmPassword) {
                    messageDiv.className = 'auth-message error';
                    messageDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> The passwords you entered do not match. Please try again.';
                    return;
                }

                if (!termsAccepted) {
                    messageDiv.className = 'auth-message error';
                    messageDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please agree to the Terms of Service and Privacy Policy to continue.';
                    return;
                }

                // Show loading state
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
                submitBtn.disabled = true;

                try {
                    // Prepare request payload for signed website integration endpoint
                    const requestData = {
                        email,
                        password,
                        confirmPassword,
                        company: company || 'Individual',
                        contactName: contact || 'Website Client',
                        phone: phone || 'N/A',
                        websiteUrl: websiteUrl || undefined
                    };
                    
                    // Debug: Log what we're sending
                    console.log('Sending to backend:', { ...requestData, password: '***', confirmPassword: '***' });
                    
                    // Call website integration proxy (server signs request)
                    const response = await fetchWithRetry(API_CONFIG.WEBSITE_REGISTER_PROXY, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestData)
                    });

                    const data = await response.json();
                    
                    // Log the full response for debugging
                    console.log('Signup response:', { status: response.status, data });

                    if (response.ok) {
                        // Store email for reference
                        localStorage.setItem('websiteClientEmail', email);

                        // If tokens were returned, redirect to portal
                        if (data.accessToken) {
                            localStorage.setItem('accessToken', data.accessToken);
                            localStorage.setItem('refreshToken', data.refreshToken);

                            messageDiv.className = 'auth-message success';
                            messageDiv.innerHTML = '<i class="fas fa-check-circle"></i> Account created successfully! Redirecting to your portal...';

                            const redirectUrl = buildPortalRedirectUrl(data.accessToken, data.refreshToken);
                            setTimeout(() => {
                                window.location.href = redirectUrl;
                            }, 1500);
                        } else {
                            messageDiv.className = 'auth-message success';
                            messageDiv.innerHTML = '<i class="fas fa-check-circle"></i> Account created! Check your email for your portal login link.';

                            setTimeout(() => {
                                router.navigate('login');
                            }, 3000);
                        }
                    } else {
                        // Show specific error messages based on backend response
                        let errorMessage = 'Sign up failed. Please try again.';
                        
                        // Map backend error messages to user-friendly messages
                        const backendMessage = data.message || data.error;
                        if (backendMessage) {
                            if (backendMessage.toLowerCase().includes('email') && backendMessage.toLowerCase().includes('exist')) {
                                errorMessage = 'This email is already registered. Please use a different email or try logging in.';
                            } else if (backendMessage.toLowerCase().includes('email') && backendMessage.toLowerCase().includes('invalid')) {
                                errorMessage = 'Please enter a valid email address.';
                            } else if (backendMessage.toLowerCase().includes('password')) {
                                errorMessage = 'Password does not meet requirements. Please try a different password.';
                            } else if (backendMessage.toLowerCase().includes('missing') || backendMessage.toLowerCase().includes('required')) {
                                errorMessage = 'Please fill in all required fields (Email).';
                            } else {
                                errorMessage = backendMessage;
                            }
                        }
                        
                        messageDiv.className = 'auth-message error';
                        messageDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${errorMessage}`;
                        
                        // Reset button
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }
                } catch (error) {
                    messageDiv.className = 'auth-message error';
                    messageDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> Unable to create account. Please check your connection and try again.`;
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    console.error('Signup error:', error);
                }
            });
        }
    }

};

// ===================================================================
// SIDEBAR & ACTIVITY BAR MANAGEMENT
// Handles sidebar loading, collapse, and activity icon interactions
// ===================================================================

// ===================================================================
// RESPONSIVE DESIGN UTILITIES
// Device detection and mobile-specific helpers
// ===================================================================

const DEVICE = {
    isTouchDevice: () => {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    },
    
    isMobile: () => {
        return window.innerWidth < 768;
    },
    
    isTablet: () => {
        return window.innerWidth >= 768 && window.innerWidth < 1024;
    },
    
    isDesktop: () => {
        return window.innerWidth >= 1024;
    }
};

function initializeSidebar() {
    // Get mobile menu button (exists in main HTML, not navbar.html)
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    // On first visit, start with explorer closed
    if (TutorialManager.isFirstVisit && !sessionStorage.getItem('sidebarOpen')) {
        sessionStorage.setItem('sidebarOpen', 'false');
    }
    
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar-container').innerHTML = data;
            
            // Get elements
            const sidebarCollapseBtn = document.getElementById('sidebar-collapse-btn');
            const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
            const sidebar = document.getElementById('sidebar');
            const activityIcons = document.querySelectorAll('.activity-icon[data-view]');
            
            // Store current active view
            let currentActiveView = sessionStorage.getItem('currentActiveView') || 'explorer';
            
            // Restore sidebar state from sessionStorage
            const sidebarOpen = sessionStorage.getItem('sidebarOpen') !== 'false';
            if (!sidebarOpen && sidebar) {
                if (DEVICE.isMobile()) {
                    sidebar.classList.remove('visible');
                    document.body.classList.remove('sidebar-open');
                } else {
                    sidebar.classList.add('hidden');
                }
            } else if (sidebarOpen) {
                if (DEVICE.isMobile()) {
                    sidebar.classList.add('visible');
                    document.body.classList.add('sidebar-open');
                } else {
                    sidebar.classList.remove('hidden');
                }
                // Restore active icon when sidebar is open
                const currentViewIcon = document.querySelector(`.activity-icon[data-view="${currentActiveView}"]`);
                if (currentViewIcon) {
                    currentViewIcon.classList.add('active');
                }
                
                // Restore correct sidebar content view
                const explorerContent = document.getElementById('explorer-content');
                const accountContent = document.getElementById('account-content');
                const sidebarTitle = document.getElementById('sidebar-title');
                
                if (currentActiveView === 'account') {
                    if (explorerContent) explorerContent.style.display = 'none';
                    if (accountContent) accountContent.style.display = 'block';
                    if (sidebarTitle) sidebarTitle.textContent = 'ACCOUNT';
                } else {
                    if (explorerContent) explorerContent.style.display = 'block';
                    if (accountContent) accountContent.style.display = 'none';
                    if (sidebarTitle) sidebarTitle.textContent = 'EXPLORER';
                }
            }
            
            // Mobile menu button handler - use current mobileMenuBtn reference
            const currentMobileMenuBtn = document.getElementById('mobile-menu-btn');
            if (currentMobileMenuBtn) {
                currentMobileMenuBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    sidebar.classList.add('visible');
                    document.body.classList.add('sidebar-open');
                    sessionStorage.setItem('sidebarOpen', 'true');
                });
            }
            
            // Mobile close button handler
            if (sidebarCloseBtn) {
                sidebarCloseBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    sidebar.classList.remove('visible');
                    document.body.classList.remove('sidebar-open');
                    sessionStorage.setItem('sidebarOpen', 'false');
                });
            }
            
            // Mobile/responsive drawer overlay handler - always add, works for both mobile and resized desktop
            if (sidebar) {
                // Add click handler to body overlay to close drawer
                document.body.addEventListener('click', (e) => {
                    if (document.body.classList.contains('sidebar-open') && 
                        !sidebar.contains(e.target) && 
                        !e.target.closest('.activity-icon[data-view="explorer"]')) {
                        sidebar.classList.remove('visible');
                        document.body.classList.remove('sidebar-open');
                        sessionStorage.setItem('sidebarOpen', 'false');
                        activityIcons.forEach(i => i.classList.remove('active'));
                    }
                });
            }
            
            // Activity icon click handlers
            activityIcons.forEach(icon => {
                icon.addEventListener('click', () => {
                    const view = icon.getAttribute('data-view');
                    
                    // Handle account icon - toggle account section in sidebar
                    if (view === 'account') {
                        const explorerContent = document.getElementById('explorer-content');
                        const accountContent = document.getElementById('account-content');
                        const sidebarTitle = document.getElementById('sidebar-title');
                        const isSidebarVisible = sidebar.classList.contains('visible') || !sidebar.classList.contains('hidden');
                        const clickedActiveIcon = currentActiveView === view;
                        
                        // Mobile drawer behavior
                        if (DEVICE.isMobile()) {
                            if (clickedActiveIcon && isSidebarVisible) {
                                // Close sidebar if clicking active account icon
                                sidebar.classList.remove('visible');
                                document.body.classList.remove('sidebar-open');
                                sessionStorage.setItem('sidebarOpen', 'false');
                                activityIcons.forEach(i => i.classList.remove('active'));
                            } else {
                                // Open sidebar and show account content
                                sidebar.classList.add('visible');
                                document.body.classList.add('sidebar-open');
                                sessionStorage.setItem('sidebarOpen', 'true');
                                icon.classList.add('active');
                                currentActiveView = view;
                                sessionStorage.setItem('currentActiveView', view);
                                
                                if (explorerContent && accountContent) {
                                    explorerContent.style.display = 'none';
                                    accountContent.style.display = 'block';
                                    if (sidebarTitle) sidebarTitle.textContent = 'ACCOUNT';
                                }
                            }
                        } else {
                            // Desktop toggle behavior
                            const sidebarIsOpen = !sidebar.classList.contains('hidden');
                            
                            if (clickedActiveIcon && sidebarIsOpen) {
                                // Close sidebar if clicking active account icon
                                sidebar.classList.add('hidden');
                                sessionStorage.setItem('sidebarOpen', 'false');
                                activityIcons.forEach(i => i.classList.remove('active'));
                            } else if (clickedActiveIcon && !sidebarIsOpen) {
                                // Open sidebar if clicking active account icon while closed
                                sidebar.classList.remove('hidden');
                                sessionStorage.setItem('sidebarOpen', 'true');
                                icon.classList.add('active');
                            } else {
                                // Switch to account view and open sidebar
                                if (!sidebarIsOpen) {
                                    sidebar.classList.remove('hidden');
                                    sessionStorage.setItem('sidebarOpen', 'true');
                                }
                                activityIcons.forEach(i => i.classList.remove('active'));
                                icon.classList.add('active');
                                currentActiveView = view;
                                sessionStorage.setItem('currentActiveView', view);
                                
                                if (explorerContent && accountContent) {
                                    explorerContent.style.display = 'none';
                                    accountContent.style.display = 'block';
                                    if (sidebarTitle) sidebarTitle.textContent = 'ACCOUNT';
                                }
                            }
                        }
                        return;
                    }
                    
                    // Handle non-explorer, non-account icons - just switch active state, don't touch sidebar
                    if (view !== 'explorer') {
                        activityIcons.forEach(i => i.classList.remove('active'));
                        icon.classList.add('active');
                        currentActiveView = view;
                        sessionStorage.setItem('currentActiveView', view);
                        return;
                    }
                    
                    // Explorer icon behavior
                    const isSidebarVisible = sidebar.classList.contains('visible') || !sidebar.classList.contains('hidden');
                    const clickedActiveIcon = currentActiveView === view;
                    
                    // Show explorer content
                    const explorerContent = document.getElementById('explorer-content');
                    const accountContent = document.getElementById('account-content');
                    const sidebarTitle = document.getElementById('sidebar-title');
                    
                    if (explorerContent) explorerContent.style.display = 'block';
                    if (accountContent) accountContent.style.display = 'none';
                    if (sidebarTitle) sidebarTitle.textContent = 'EXPLORER';
                    
                    // Mobile drawer behavior
                    if (DEVICE.isMobile()) {
                        if (clickedActiveIcon && isSidebarVisible) {
                            sidebar.classList.remove('visible');
                            document.body.classList.remove('sidebar-open');
                            sessionStorage.setItem('sidebarOpen', 'false');
                            activityIcons.forEach(i => i.classList.remove('active'));
                        } else {
                            sidebar.classList.add('visible');
                            document.body.classList.add('sidebar-open');
                            sessionStorage.setItem('sidebarOpen', 'true');
                            icon.classList.add('active');
                            currentActiveView = view;
                            sessionStorage.setItem('currentActiveView', view);
                        }
                    } else {
                        // Desktop collapse behavior
                        const sidebarIsOpen = !sidebar.classList.contains('hidden');
                        
                        if (clickedActiveIcon && sidebarIsOpen) {
                            sidebar.classList.add('hidden');
                            sessionStorage.setItem('sidebarOpen', 'false');
                            activityIcons.forEach(i => i.classList.remove('active'));
                        } else if (clickedActiveIcon && !sidebarIsOpen) {
                            sidebar.classList.remove('hidden');
                            sessionStorage.setItem('sidebarOpen', 'true');
                            icon.classList.add('active');
                        } else {
                            if (!sidebarIsOpen) {
                                sidebar.classList.remove('hidden');
                                sessionStorage.setItem('sidebarOpen', 'true');
                            }
                            activityIcons.forEach(i => i.classList.remove('active'));
                            icon.classList.add('active');
                            currentActiveView = view;
                            sessionStorage.setItem('currentActiveView', view);
                        }
                    }
                });
            });
            
            // Collapse button handler
            if (sidebarCollapseBtn && sidebar) {
                sidebarCollapseBtn.addEventListener('click', () => {
                    const wasOpen = !sidebar.classList.contains('hidden');
                    sidebar.classList.toggle('hidden');
                    const isOpen = !sidebar.classList.contains('hidden');
                    sessionStorage.setItem('sidebarOpen', isOpen);
                    
                    if (wasOpen && !isOpen) {
                        activityIcons.forEach(i => i.classList.remove('active'));
                    } else if (!wasOpen && isOpen) {
                        const currentViewIcon = document.querySelector(`.activity-icon[data-view="${currentActiveView}"]`);
                        if (currentViewIcon) {
                            currentViewIcon.classList.add('active');
                        }
                    }
                });
            }
            
            // Update sidebar links to use hash routing
            const sidebarLinks = sidebar.querySelectorAll('.sidebar-item[href]');
            sidebarLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href) {
                    let route;
                    
                    if (href.startsWith('#/')) {
                        // Already a hash route, extract the route name
                        route = href.substring(2);
                    } else if (!href.startsWith('#')) {
                        // Convert .html to hash route
                        route = href.replace('.html', '').replace('index', 'home');
                        link.setAttribute('href', `#/${route}`);
                    } else {
                        // Other hash links, skip
                        return;
                    }
                    
                    // Prevent default and use router
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        
                        // Ensure router exists before navigating
                        if (typeof router !== 'undefined' && router) {
                            router.navigate(route);
                        } else {
                            // Fallback: update hash directly
                            window.location.hash = `#/${route}`;
                        }
                        
                        // Close drawer on mobile after navigation
                        if (DEVICE.isMobile()) {
                            sidebar.classList.remove('visible');
                            document.body.classList.remove('sidebar-open');
                            sessionStorage.setItem('sidebarOpen', 'false');
                        }
                    });
                }
            });
        });
}


// ===================================================================
// INITIALIZATION
// App entry point - runs on DOMContentLoaded
// ===================================================================

let router;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize router first
    router = new Router();
    
    // Initialize sidebar (which needs router to be available)
    initializeSidebar();
    
    // Start router
    router.init();
});
