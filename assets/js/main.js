// Main Application Logic - Entry point and navigation handling

// Application state
let currentPage = 'dashboard';
let isLoading = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    console.log('Initializing Rexie Maris Production Management System...');
    
    // Set up navigation event listeners
    setupNavigation();
    
    // Load the default page (dashboard)
    loadPage('dashboard');
    
    // Initialize real-time updates
    startRealTimeUpdates();
    
    // Set up global event listeners
    setupGlobalEventListeners();
    
    console.log('Application initialized successfully');
}

// Navigation setup
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            if (page && page !== currentPage && !isLoading) {
                loadPage(page);
            }
        });
    });
}

// Main page loading function
async function loadPage(page) {
    if (isLoading) return;
    
    isLoading = true;
    currentPage = page;
    
    // Update navigation state
    updateNavigation(page);
    
    try {
        // Load the page content
        await loadPageContent(page);
        
        // Update URL without page refresh (if using history API)
        updateURL(page);
        
        // Track page view
        trackPageView(page);
        
    } catch (error) {
        console.error('Failed to load page:', error);
        showError('Failed to load page. Please try again.');
    } finally {
        isLoading = false;
    }
}

// Update navigation visual state
function updateNavigation(page) {
    // Remove active state from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active state to current page
    const activeItem = document.querySelector(`[data-page="${page}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

// Update browser URL (optional - for better UX)
function updateURL(page) {
    if (window.history && window.history.pushState) {
        const url = page === 'dashboard' ? '/' : `/#${page}`;
        window.history.pushState({ page }, '', url);
    }
}

// Track page views (for analytics)
function trackPageView(page) {
    console.log(`Page view: ${page} at ${new Date().toISOString()}`);
    // Here you could send analytics data to your tracking service
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.page) {
        loadPage(event.state.page);
    } else {
        loadPage('dashboard');
    }
});

// Real-time updates simulation
function startRealTimeUpdates() {
    // Update system status every 30 seconds
    setInterval(() => {
        updateSystemStatus(Math.random() > 0.95 ? 'loading' : 'online');
    }, 30000);
    
    // Simulate data updates every 2 minutes
    setInterval(() => {
        if (currentPage === 'dashboard') {
            simulateDataUpdates();
        }
    }, 120000);
}

// Simulate real-time data updates
function simulateDataUpdates() {
    // Only update if we're on a page that shows real-time data
    const statsElements = document.querySelectorAll('.stat-value');
    
    if (statsElements.length > 0) {
        // Randomly update some statistics
        statsElements.forEach(element => {
            if (Math.random() > 0.8) {
                element.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            }
        });
        
        // Show notification for significant updates
        if (Math.random() > 0.7) {
            showSuccess('Production data updated');
        }
    }
}

// Global event listeners
function setupGlobalEventListeners() {
    // Handle escape key to close modals
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAllModals();
        }
    });
    
    // Handle clicks on export buttons
    document.addEventListener('click', function(event) {
        if (event.target.matches('.btn-secondary') && event.target.textContent.toLowerCase().includes('export')) {
            handleExportClick(event.target);
        }
    });
    
    // Handle form submissions
    document.addEventListener('submit', function(event) {
        event.preventDefault();
        handleFormSubmission(event.target);
    });
}

// Handle export button clicks
function handleExportClick(button) {
    const buttonText = button.textContent.toLowerCase();
    
    if (buttonText.includes('csv')) {
        exportToCSV(sampleData[currentPage] || [], `${currentPage}_export.csv`);
    } else if (buttonText.includes('excel')) {
        exportToExcel(sampleData[currentPage] || [], `${currentPage}_export`);
    } else {
        showSuccess('Export initiated');
    }
}

// Handle form submissions
function handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    console.log('Form submitted:', data);
    showSuccess('Form submitted successfully');
    
    // Close modal if form is in a modal
    const modal = form.closest('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Close all open modals
function closeAllModals() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => modal.remove());
}

// Application utilities
const App = {
    // Get current page
    getCurrentPage() {
        return currentPage;
    },
    
    // Navigate to page programmatically
    navigateTo(page) {
        loadPage(page);
    },
    
    // Get user info
    getCurrentUser() {
        return currentUser;
    },
    
    // Refresh current page
    refresh() {
        loadPage(currentPage);
    },
    
    // Show notification
    notify(message, type = 'success') {
        if (type === 'success') {
            showSuccess(message);
        } else {
            showError(message);
        }
    }
};

// Make App utilities globally available
window.App = App;

// Handle initial page load from URL
function handleInitialRoute() {
    const hash = window.location.hash.replace('#', '');
    const page = hash && pageConfig[hash] ? hash : 'dashboard';
    loadPage(page);
}

// Call initial route handling when DOM is ready
document.addEventListener('DOMContentLoaded', handleInitialRoute);

// Welcome screen for first-time users
function showWelcomeScreen() {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `
        <div class="welcome-screen">
            <div class="welcome-icon">🎉</div>
            <h2>Welcome to Rexie Maris Production Management</h2>
            <p>Your comprehensive solution for managing bag production, inventory, and business operations. Get started by exploring the different modules available.</p>
            <div class="quick-start-buttons">
                <button class="quick-start-btn" onclick="App.navigateTo('dashboard')">📊 View Dashboard</button>
                <button class="quick-start-btn" onclick="App.navigateTo('inventory')">📦 Check Inventory</button>
                <button class="quick-start-btn" onclick="App.navigateTo('production')">🏭 Production Orders</button>
                <button class="quick-start-btn" onclick="App.navigateTo('clients')">👥 Manage Clients</button>
            </div>
        </div>
    `;
}

// Error handling
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
    showError('An unexpected error occurred. Please refresh the page.');
});

// Performance monitoring
const performance = {
    startTime: Date.now(),
    
    logPageLoad(page) {
        const loadTime = Date.now() - this.startTime;
        console.log(`Page ${page} loaded in ${loadTime}ms`);
    }
};

console.log('Main application script loaded');