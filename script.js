// ===================================================================
// AUCTUS STUDIO - SINGLE PAGE APPLICATION
// Complete SPA restructuring for smooth, fast, consistent experience
// ===================================================================

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
                        <p class="hero-subtitle">AI-Powered Web Design & Development</p>
                        <p class="hero-description">Transform your vision into a stunning web presence. We blend breakthrough AI, immersive design, and precise automation to create websites that drive results.</p>
                        
                        <div class="hero-buttons">
                            <a href="#/contact" class="cta-button primary">
                                <i class="fas fa-rocket"></i> Get Started
                            </a>
                            <a href="#signin" class="cta-button secondary">
                                <i class="fas fa-sign-in-alt"></i> Sign In
                            </a>
                        </div>
                    </div>
                    
                    <div class="version-info">
                        <p>Auctus Studio v1.0.0 - Built for creators, by creators</p>
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
                            <h3>AI Work Solutions</h3>
                            <div class="card-features">
                                <span class="feature-tag"><i class="fas fa-robot"></i> Smart Automation</span>
                                <span class="feature-tag"><i class="fas fa-chart-line"></i> Data Driven</span>
                                <span class="feature-tag"><i class="fas fa-cog"></i> Scalable</span>
                            </div>
                            <p>Intelligent automation and AI-powered tools that transform how you work. From chatbots to predictive analytics, we implement cutting-edge AI solutions that give your business a competitive edge.</p>
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
                                <div class="feature"><i class="fas fa-check"></i> AI chatbot/receptionist available</div>
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
        
        // Call page initializer if exists
        if (PAGE_INIT[route]) {
            PAGE_INIT[route]();
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
            tab.setAttribute('draggable', 'true');
            tab.setAttribute('data-index', index);
            
            tab.innerHTML = `
                <i class="fas ${page.icon}"></i>
                <span>${page.filename}</span>
                ${route !== 'home' ? `<i class="fas fa-times" data-close="${route}"></i>` : ''}
            `;
            
            // Tab click to navigate
            tab.addEventListener('click', (e) => {
                if (!e.target.classList.contains('fa-times')) {
                    this.navigate(route);
                }
            });
            
            // Close button
            const closeBtn = tab.querySelector('.fa-times');
            if (closeBtn) {
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.closeTab(route);
                });
            }
            
            // Drag and drop handlers
            tab.addEventListener('dragstart', (e) => this.handleDragStart(e, route, index));
            tab.addEventListener('dragover', (e) => this.handleDragOver(e));
            tab.addEventListener('dragenter', (e) => this.handleDragEnter(e));
            tab.addEventListener('dragleave', (e) => this.handleDragLeave(e));
            tab.addEventListener('drop', (e) => this.handleDrop(e, route, index));
            tab.addEventListener('dragend', (e) => this.handleDragEnd(e));
            
            this.tabsContainer.appendChild(tab);
        });
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
        
        // Add active class to current route's sidebar item
        const routeMap = {
            'home': 'index.html',
            'services': 'services.html',
            'pricing': 'pricing.html',
            'mission': 'mission.html',
            'contact': 'contact.html'
        };
        
        if (routeMap[route]) {
            const activeItem = document.querySelector(`.sidebar-item[href*="${routeMap[route]}"]`);
            if (activeItem) {
                activeItem.classList.add('active');
            }
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
    }
};

// ===================================================================
// SIDEBAR & ACTIVITY BAR MANAGEMENT
// Handles sidebar loading, collapse, and activity icon interactions
// ===================================================================

function initializeSidebar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar-container').innerHTML = data;
            
            // Get elements
            const sidebarCollapseBtn = document.getElementById('sidebar-collapse-btn');
            const sidebar = document.getElementById('sidebar');
            const activityIcons = document.querySelectorAll('.activity-icon[data-view]');
            
            // Store current active view
            let currentActiveView = sessionStorage.getItem('currentActiveView') || 'explorer';
            
            // Restore sidebar state from sessionStorage
            const sidebarOpen = sessionStorage.getItem('sidebarOpen') !== 'false';
            if (!sidebarOpen && sidebar) {
                sidebar.classList.add('hidden');
            } else if (sidebarOpen) {
                // Restore active icon when sidebar is open
                const currentViewIcon = document.querySelector(`.activity-icon[data-view="${currentActiveView}"]`);
                if (currentViewIcon) {
                    currentViewIcon.classList.add('active');
                }
            }
            
            // Activity icon click handlers
            activityIcons.forEach(icon => {
                icon.addEventListener('click', () => {
                    const view = icon.getAttribute('data-view');
                    
                    // Handle non-explorer icons - just switch active state, don't touch sidebar
                    if (view !== 'explorer') {
                        activityIcons.forEach(i => i.classList.remove('active'));
                        icon.classList.add('active');
                        currentActiveView = view;
                        sessionStorage.setItem('currentActiveView', view);
                        return;
                    }
                    
                    // Explorer icon behavior
                    const sidebarIsOpen = !sidebar.classList.contains('hidden');
                    const clickedActiveIcon = currentActiveView === view;
                    
                    if (clickedActiveIcon && sidebarIsOpen) {
                        sidebar.classList.add('hidden');
                        sessionStorage.setItem('sidebarOpen', 'false');
                        activityIcons.forEach(i => i.classList.remove('active'));
                    } else if (clickedActiveIcon && !sidebarIsOpen) {
                        sidebar.classList.remove('hidden');
                        sessionStorage.setItem('sidebarOpen', 'true');
                        icon.classList.add('active');
                    } else {
                        // Clicking explorer when another view is active - open sidebar
                        if (!sidebarIsOpen) {
                            sidebar.classList.remove('hidden');
                            sessionStorage.setItem('sidebarOpen', 'true');
                        }
                        activityIcons.forEach(i => i.classList.remove('active'));
                        icon.classList.add('active');
                        currentActiveView = view;
                        sessionStorage.setItem('currentActiveView', view);
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
                if (href && !href.startsWith('#')) {
                    const route = href.replace('.html', '').replace('index', 'home');
                    link.setAttribute('href', `#/${route}`);
                    
                    // Prevent default and use router
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        router.navigate(route);
                    });
                }
            });

            // More menu toggle
            const moreBtn = document.querySelector('.more-btn');
            const moreMenu = document.querySelector('.more-menu');
            
            if (moreBtn && moreMenu) {
                moreBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    moreMenu.classList.toggle('show');
                });
                
                // Close menu when clicking outside
                document.addEventListener('click', () => {
                    moreMenu.classList.remove('show');
                });
            }
        });
}

// ===================================================================
// INITIALIZATION
// App entry point - runs on DOMContentLoaded
// ===================================================================

let router;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize sidebar first
    initializeSidebar();
    
    // Initialize and start router
    router = new Router();
    router.init();
});
