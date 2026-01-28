# Tutorial System Implementation

## Overview
A comprehensive first-visit user onboarding system that guides new users through key features of the website using interactive overlays and tooltips.

## Features

### 1. First-Visit Detection
- Uses `localStorage.getItem('auctus_first_visit_complete')` to track if user has visited before
- `TutorialManager.isFirstVisit` property automatically set on page load
- Persists across browser sessions

### 2. Tutorial Steps
Two interactive tutorial steps guide users through:

**Step 1: Explore Your Pages**
- Highlights the folder icon (explorer)
- Message: "Click here to expand the page explorer and navigate through all available pages"
- Shows how to open the file explorer sidebar

**Step 2: Profile & Account**
- Highlights the user icon (account)
- Message: "Open the profile page to sign up or sign into your account"
- Introduces account management features

### 3. Dynamic Button Rendering
Based on tutorial completion status, the hero section displays:

**First Visit (Not Completed):**
```
[Get Started] [Sign In]
```
- "Get Started" button triggers the tutorial
- "Sign In" navigates to contact page

**After Tutorial Completion:**
```
[Sign Up] [Sign In] [Explore]
```
- "Sign Up" navigates to contact page
- "Sign In" navigates to contact page
- "Explore" opens the sidebar (no toggle, just opens)

### 4. Interactive Overlays
Each tutorial step displays:
- **Dark overlay**: Semi-transparent background (rgba(0,0,0,0.5))
- **Highlight box**: Cyan glowing border around target element (#00d4ff)
- **Tooltip**: Positioned near the target with:
  - Step title and description
  - "Back" button (hidden on first step)
  - "Next" or "Done" button (changes on final step)
  - Smart positioning (above/below target based on available space)

### 5. LocalStorage Keys

| Key | Value | Purpose |
|-----|-------|---------|
| `auctus_tutorial_completed` | 'true' | Marks tutorial as finished |
| `auctus_first_visit_complete` | 'true' | Marks user as returning visitor |
| `sidebarOpen` | 'false' | Keep explorer closed on first visit |

### 6. Sidebar Behavior
- **First visit**: Explorer sidebar starts closed
- **After navigation**: Sidebar state is remembered via sessionStorage
- **Explore button**: Opens sidebar without toggling behavior

## Implementation Details

### Files Modified
1. **script.js**: Added TutorialManager object and integration points
2. **index.html**: Added `data-view="account"` to user icon

### Code Structure

```javascript
const TutorialManager = {
    isFirstVisit: !localStorage.getItem('auctus_first_visit_complete'),
    isTutorialActive: false,
    currentStep: 0,
    
    steps: [
        // Tutorial step definitions
    ],
    
    renderButtons: function() {
        // Dynamically render hero buttons
    },
    
    openExplorer: function() {
        // Open sidebar without toggle
    },
    
    start: function() {
        // Begin tutorial
    },
    
    showStep: function() {
        // Display current tutorial step
    },
    
    nextStep: function() {
        // Move to next step
    },
    
    prevStep: function() {
        // Move to previous step
    },
    
    complete: function() {
        // Finish tutorial and update storage
    }
};
```

### Integration Points

1. **Page Initialization**:
   - `PAGE_INIT.home()` calls `TutorialManager.renderButtons()`
   - Ensures buttons render when home page loads

2. **Sidebar Initialization**:
   - `initializeSidebar()` sets `sessionStorage.sidebarOpen = 'false'` on first visit
   - Explorer starts closed for new users

3. **Router**:
   - `navigate()` calls `PAGE_INIT.home()` for home page
   - Triggers button rendering automatically

## User Flow

### First Visit
1. Page loads → localStorage is empty
2. TutorialManager detects first visit
3. Explorer sidebar closes automatically
4. Home page displays "Get Started" and "Sign In" buttons
5. User clicks "Get Started"
6. Tutorial overlay appears, highlighting explorer icon
7. User clicks "Next" → Tutorial moves to account icon
8. User clicks "Done" → Tutorial completes
9. localStorage keys are set
10. Buttons re-render to show "Sign Up", "Sign In", "Explore"
11. User can click "Explore" to open the sidebar

### Returning Visits
1. Page loads → localStorage has completion keys
2. Buttons render directly showing "Sign Up", "Sign In", "Explore"
3. Tutorial does not appear again
4. Sidebar state is remembered from last session

## Testing

### To Test Fresh Install
1. Clear localStorage: `localStorage.clear()`
2. Clear sessionStorage: `sessionStorage.clear()`
3. Refresh page
4. Should see "Get Started" button
5. Click "Get Started" → Tutorial should appear
6. Complete tutorial → Buttons should change

### To Test Returning User
1. After completing tutorial, refresh page
2. Should see "Sign Up", "Sign In", "Explore" buttons
3. Tutorial should not appear

## Browser Compatibility
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- localStorage and sessionStorage must be enabled
- Relies on CSS variables for theming (part of existing design system)

## Future Enhancements
- [ ] Add more tutorial steps for other features
- [ ] Animate tooltip transitions
- [ ] Add keyboard navigation (Escape to exit, Arrow keys for navigation)
- [ ] Highlight multiple elements per step
- [ ] Add progress indicator (Step 1 of 2)
- [ ] Mobile-specific tutorial variations
- [ ] Tutorial re-show with "?" button
