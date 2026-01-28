// Sample code files
const codeFiles = {
    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auctus Studio</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Welcome to Auctus Studio</h1>
    <p>Your modern development environment</p>
    <script src="script.js"></script>
</body>
</html>`,
    'styles.css': `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
    background-color: #1e1e1e;
    color: #cccccc;
}

h1 {
    font-size: 48px;
    font-weight: 300;
    margin-bottom: 10px;
}`,
    'script.js': `// Auctus Studio - Interactive Features
console.log('Welcome to Auctus Studio!');

// Initialize application
function init() {
    console.log('Initializing Auctus Studio...');
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM Content Loaded');
    });
}

init();`,
    'README.md': `# Auctus Studio

> Your modern development environment

## Features

- **Modern Interface** - Clean, intuitive design
- **Fast Performance** - Optimized for speed
- **Extensible** - Customize to your needs

## Getting Started

1. Open a folder
2. Start coding
3. Build amazing things

## About

Built for creators, by creators.`
};

// File click handlers
document.addEventListener('DOMContentLoaded', () => {
    const files = document.querySelectorAll('.file');
    const welcomeScreen = document.querySelector('.welcome-screen');
    const codeEditor = document.querySelector('.code-editor');
    const codeDisplay = document.getElementById('code-display');
    const tabsContainer = document.querySelector('.tabs');
    
    files.forEach(file => {
        file.addEventListener('click', () => {
            const fileName = file.getAttribute('data-file');
            
            // Update active file
            document.querySelectorAll('.file').forEach(f => f.classList.remove('active'));
            file.classList.add('active');
            
            // Show code editor, hide welcome
            welcomeScreen.style.display = 'none';
            codeEditor.style.display = 'flex';
            
            // Update code content
            if (codeFiles[fileName]) {
                codeDisplay.textContent = codeFiles[fileName];
                
                // Update line numbers
                const lineCount = codeFiles[fileName].split('\n').length;
                const lineNumbers = document.querySelector('.line-numbers');
                lineNumbers.innerHTML = '';
                for (let i = 1; i <= lineCount; i++) {
                    const lineDiv = document.createElement('div');
                    lineDiv.textContent = i;
                    lineNumbers.appendChild(lineDiv);
                }
            }
            
            // Update tab
            updateTab(fileName);
        });
    });
    
    // Activity bar switching
    const activityIcons = document.querySelectorAll('.activity-icon[data-view]');
    activityIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            activityIcons.forEach(i => i.classList.remove('active'));
            icon.classList.add('active');
        });
    });
    
    // Folder toggle
    const folderHeaders = document.querySelectorAll('.folder-header');
    folderHeaders.forEach(header => {
        header.addEventListener('click', (e) => {
            const folder = header.parentElement;
            folder.classList.toggle('open');
            
            const chevron = header.querySelector('.fa-chevron-down');
            if (chevron) {
                chevron.style.transform = folder.classList.contains('open') 
                    ? 'rotate(0deg)' 
                    : 'rotate(-90deg)';
            }
        });
    });
});

function updateTab(fileName) {
    const tabsContainer = document.querySelector('.tabs');
    
    // Check if tab already exists
    let existingTab = null;
    document.querySelectorAll('.tab').forEach(tab => {
        if (tab.getAttribute('data-file') === fileName) {
            existingTab = tab;
        }
    });
    
    if (!existingTab) {
        // Create new tab
        const tab = document.createElement('div');
        tab.className = 'tab';
        tab.setAttribute('data-file', fileName);
        tab.innerHTML = `
            <span>${fileName}</span>
            <i class="fas fa-times"></i>
        `;
        
        // Remove home tab if it exists
        const homeTab = document.querySelector('.tab[data-file="home"]');
        if (homeTab) {
            homeTab.remove();
        }
        
        tabsContainer.appendChild(tab);
        
        // Add close functionality
        tab.querySelector('.fa-times').addEventListener('click', (e) => {
            e.stopPropagation();
            tab.remove();
            
            // If no tabs left, show welcome screen
            if (tabsContainer.children.length === 0) {
                showWelcomeScreen();
            }
        });
    }
    
    // Update active tab
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    const activeTab = existingTab || tabsContainer.lastElementChild;
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

function showWelcomeScreen() {
    const welcomeScreen = document.querySelector('.welcome-screen');
    const codeEditor = document.querySelector('.code-editor');
    const tabsContainer = document.querySelector('.tabs');
    
    welcomeScreen.style.display = 'block';
    codeEditor.style.display = 'none';
    
    // Add home tab
    const tab = document.createElement('div');
    tab.className = 'tab active';
    tab.setAttribute('data-file', 'home');
    tab.innerHTML = `
        <span>Home</span>
        <i class="fas fa-times"></i>
    `;
    tabsContainer.appendChild(tab);
}

// Console greeting
console.log('%c Auctus Studio ', 'background: linear-gradient(135deg, #8b5cf6, #6366f1); color: white; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Built for creators, by creators ', 'color: #8b5cf6; font-size: 12px;');
