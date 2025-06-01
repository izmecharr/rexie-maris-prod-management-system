// Shared JavaScript - Common functions used across all pages

// Global variables
let currentUser = {
    name: 'John Doe',
    role: 'Admin',
    permissions: ['read', 'write', 'delete', 'export', 'manage_users']
};

let systemStatus = 'online';

// Page configurations
const pageConfig = {
    dashboard: {
        title: '📊 Production Dashboard',
        subtitle: 'Manage and track your bag production enterprise',
        file: 'pages/dashboard.html'
    },
    inventory: {
        title: '📦 Inventory Management',
        subtitle: 'Track and manage raw materials and stock levels',
        file: 'pages/inventory.html'
    },
    production: {
        title: '🏭 Production Orders',
        subtitle: 'Manage production schedules and order tracking',
        file: 'pages/production.html'
    },
    catalog: {
        title: '🛍️ Bag Catalog',
        subtitle: 'Manage product catalog and specifications',
        file: 'pages/catalog.html'
    },
    clients: {
        title: '👥 Client Management',
        subtitle: 'Manage client relationships and contact information',
        file: 'pages/clients.html'
    },
    sales: {
        title: '💰 Sales & Orders',
        subtitle: 'Track sales performance and order management',
        file: 'pages/sales.html'
    },
    analytics: {
        title: '📈 Analytics & Reports',
        subtitle: 'Business intelligence and performance reports',
        file: 'pages/analytics.html'
    },
    delivery: {
        title: '🚚 Delivery Management',
        subtitle: 'Track shipments and delivery performance',
        file: 'pages/delivery.html'
    },
    financial: {
        title: '💳 Financial Overview',
        subtitle: 'Monitor financial performance and profitability',
        file: 'pages/financial.html'
    },
    'equipment-status': {
        title: '🔧 Equipment Status',
        subtitle: 'Manage equipment and maintenance schedules',
        file: 'pages/equipment-status.html'
    },
    settings: {
        title: '⚙️ System Settings',
        subtitle: 'Configure system preferences and options',
        file: 'pages/settings.html'
    },
    users: {
        title: '👤 User Management',
        subtitle: 'Manage user accounts and permissions',
        file: 'pages/users.html'
    },
};

async function generateDashboardContent() {
    try {
        // Load the dashboard HTML content
        const response = await fetch('pages/dashboard.html');
        if (!response.ok) {
            throw new Error('Failed to load dashboard page');
        }
        const htmlContent = await response.text();
        return htmlContent;
    } catch (error) {
        console.error('Error loading dashboard content:', error);
        // Fallback content if file loading fails
        return `
            <div class="dashboard-grid">
                <div class="dashboard-card">
                    <h3>Production Dashboard</h3>
                    <p>Unable to load dashboard system. Please check if the dashboard.html file exists in the pages/ folder.</p>
                    <button onclick="location.reload()" class="btn btn-primary">Retry Loading</button>
                </div>
            </div>
        `;
    }
}
// function generateInventoryContent() {
//     return `
//         <div class="dashboard-grid">
//             <div class="dashboard-card">
//                 <h3>Raw Materials Overview</h3>
//                 <p>Detailed inventory tracking system coming soon...</p>
//             </div>
//         </div>
//     `;
// }

async function generateInventoryContent() {
    try {
        // Load the inventory HTML content (which includes CSS and JS links)
        const response = await fetch('pages/inventory.html');
        if (!response.ok) {
            throw new Error('Failed to load inventory page');
        }
        const htmlContent = await response.text();
        return htmlContent;
    } catch (error) {
        console.error('Error loading inventory content:', error);
        // Fallback content if file loading fails
        return `
            <div class="dashboard-grid">
                <div class="dashboard-card">
                    <h3>Inventory Management</h3>
                    <p>Unable to load inventory system. Please check if the inventory.html file exists in the pages/ folder.</p>
                    <button onclick="location.reload()" class="btn btn-primary">Retry Loading</button>
                </div>
            </div>
        `;
    }
}

// // Fallback content in case external files fail to load
// function getInventoryFallbackContent() {
//     return `
//         <div class="dashboard-grid">
//             <div class="dashboard-card">
//                 <h3>Inventory Management</h3>
//                 <p>Loading inventory system...</p>
//                 <button onclick="location.reload()" class="btn btn-primary">Retry Loading</button>
//             </div>
//         </div>
//     `;
// }
async function generateProductionContent() {
    try {
        // Load the production HTML content
        const response = await fetch('pages/production.html');
        if (!response.ok) {
            throw new Error('Failed to load production page');
        }
        const htmlContent = await response.text();
        return htmlContent;
    } catch (error) {
        console.error('Error loading production content:', error);
        // Fallback content if file loading fails
        return `
            <div class="dashboard-grid">
                <div class="dashboard-card">
                    <h3>Production Orders</h3>
                    <p>Unable to load production system. Please check if the production.html file exists in the pages/ folder.</p>
                    <button onclick="location.reload()" class="btn btn-primary">Retry Loading</button>
                </div>
            </div>
        `;
    }
}

async function generateCatalogContent() {
    try {
        // Load the catalog HTML content
        const response = await fetch('pages/catalog.html');
        if (!response.ok) {
            throw new Error('Failed to load catalog page');
        }
        const htmlContent = await response.text();
        return htmlContent;
    } catch (error) {
        console.error('Error loading catalog content:', error);
        // Fallback content if file loading fails
        return `
            <div class="dashboard-grid">
                <div class="dashboard-card">
                    <h3>Bag Catalog</h3>
                    <p>Unable to load catalog system. Please check if the catalog.html file exists in the pages/ folder.</p>
                    <button onclick="location.reload()" class="btn btn-primary">Retry Loading</button>
                </div>
            </div>
        `;
    }
}

function generateClientsContent() {
    return `
        <div class="dashboard-grid">
            <div class="dashboard-card">
                <h3>Client Database</h3>
                <p>Client management system coming soon...</p>
            </div>
        </div>
    `;
}

function generateSalesContent() {
    return `
        <div class="dashboard-grid">
            <div class="dashboard-card">
                <h3>Sales Overview</h3>
                <p>Sales management system coming soon...</p>
            </div>
        </div>
    `;
}

function generateAnalyticsContent() {
    return `
        <div class="dashboard-grid">
            <div class="dashboard-card">
                <h3>Analytics Dashboard</h3>
                <p>Analytics system coming soon...</p>
            </div>
        </div>
    `;
}

function generateDeliveryContent() {
    return `
        <div class="dashboard-grid">
            <div class="dashboard-card">
                <h3>Delivery Tracking</h3>
                <p>Delivery management system coming soon...</p>
            </div>
        </div>
    `;
}

function generateFinancialContent() {
    return `
        <div class="dashboard-grid">
            <div class="dashboard-card">
                <h3>Financial Dashboard</h3>
                <p>Financial management system coming soon...</p>
            </div>
        </div>
    `;
}

function generateSettingsContent() {
    return `
        <div class="dashboard-grid">
            <div class="dashboard-card">
                <h3>System Configuration</h3>
                <p>Settings management coming soon...</p>
            </div>
        </div>
    `;
}

function generateUsersContent() {
    return `
        <div class="dashboard-grid">
            <div class="dashboard-card">
                <h3>User Administration</h3>
                <p>User management system coming soon...</p>
            </div>
        </div>
    `;
}

function generateEquipmentStatusContent() {
    return `
        <div class="dashboard-grid">
            <div class="dashboard-card">
                <h3>Equipment Status</h3>
                <p>Equipment Status coming soon...</p>
            </div>
        </div>
    `;
}

// Utility Functions
function showLoading() {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;
}

function showError(message) {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `
        <div class="error-message">
            <h3>Error</h3>
            <p>${message}</p>
            <button class="btn btn-primary" onclick="location.reload()">Retry</button>
        </div>
    `;
}

function showSuccess(message) {
    const notification = document.createElement('div');
    notification.className = 'success-message';
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '2000';
    notification.style.minWidth = '300px';
    notification.innerHTML = `
        <p>${message}</p>
        <button onclick="this.parentElement.remove()" style="float: right; background: none; border: none; font-size: 18px; cursor: pointer;">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Update page title and subtitle
function updatePageHeader(page) {
    const config = pageConfig[page];
    if (config) {
        document.getElementById('page-title').textContent = config.title;
        document.getElementById('page-subtitle').textContent = config.subtitle;
        document.title = `${config.title} - Rexie Maris Bag Enterprise`;
    }
}

// Navigation active state management
function setActiveNavItem(page) {
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to current page
    const activeItem = document.querySelector(`[data-page="${page}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

// Load page content
async function loadPageContent(page) {
    const config = pageConfig[page];
    if (!config) {
        showError('Page not found');
        return;
    }
    
    try {
        showLoading();
        updatePageHeader(page);
        setActiveNavItem(page);
        
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Load page-specific content
        const contentArea = document.getElementById('content-area');
        
        // For now, we'll load placeholder content for each page
        // In a real implementation, you would fetch from config.file
        const content = generatePageContent(page);
        contentArea.innerHTML = content;
        
        // Add transition effect
        contentArea.classList.remove('active');
        setTimeout(() => {
            contentArea.classList.add('active');
        }, 50);
        
        // Load page-specific JavaScript
        loadPageScript(page);
        
    } catch (error) {
        showError('Failed to load page content');
        console.error('Page loading error:', error);
    }
}

// Generate placeholder content for each page
async function generatePageContent(page) {
    switch(page) {
        case 'dashboard':
            return await generateDashboardContent();
        case 'inventory':
            return await generateInventoryContent();
        case 'production':
            return await generateProductionContent();
        case 'catalog':
            return await generateCatalogContent();
        case 'clients':
            return generateClientsContent();
        case 'sales':
            return generateSalesContent();
        case 'analytics':
            return generateAnalyticsContent();
        case 'delivery':
            return generateDeliveryContent();
        case 'financial':
            return generateFinancialContent();
        case 'settings':
            return generateSettingsContent();
        case 'users':
            return generateUsersContent();
        case 'equipment-status':
            return generateEquipmentStatusContent();
        default:
            return '<div class="error-message"><h3>Page not implemented yet</h3></div>';
    }
}

// Load page-specific JavaScript
function loadPageScript(page) {
    // Remove existing page scripts
    const existingScript = document.getElementById('page-script');
    if (existingScript) {
        existingScript.remove();
    }
    
    // Load new page script
    const script = document.createElement('script');
    script.id = 'page-script';
    script.src = `assets/js/pages/${page}.js`;
    script.onerror = () => {
        console.log(`No specific script found for ${page} page`);
    };
    document.head.appendChild(script);
}

// Export/Import functionality
function exportToCSV(data, filename) {
    const csv = data.map(row => Object.values(row).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    showSuccess('CSV exported successfully!');
}

function exportToExcel(data, filename) {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename + '.json';
    a.click();
    window.URL.revokeObjectURL(url);
    showSuccess('Excel report exported successfully!');
}

// System status management
function updateSystemStatus(status) {
    systemStatus = status;
    const statusIndicator = document.getElementById('system-status');
    if (statusIndicator) {
        const dot = statusIndicator.querySelector('.status-dot');
        dot.className = `status-dot status-${status}`;
        
        const text = statusIndicator.querySelector('.status-text');
        text.textContent = status === 'online' ? 'System Online' : 
                          status === 'offline' ? 'System Offline' : 'Loading...';
    }
}

// Initialize system status indicator
function initSystemStatus() {
    const statusHTML = `
        <div id="system-status" class="system-status">
            <div class="status-dot status-online"></div>
            <span class="status-text">System Online</span>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', statusHTML);
}

// Common data structures
const sampleData = {
    inventory: [
        { material: 'Leather', stock: 15, unit: 'sq. meters', status: 'Critical' },
        { material: 'Fabric', stock: 35, unit: 'yards', status: 'Low' },
        { material: 'Hardware', stock: 78, unit: 'pieces', status: 'Good' },
        { material: 'Packaging', stock: 92, unit: 'boxes', status: 'Optimal' }
    ],
    
    products: [
        { id: 1, name: 'Classic Tote', price: 300, sold: 156, revenue: 46800 },
        { id: 2, name: 'Executive Briefcase', price: 700, sold: 89, revenue: 62300 },
        { id: 3, name: 'Casual Backpack', price: 300, sold: 134, revenue: 40200 },
        { id: 4, name: 'Evening Clutch', price: 300, sold: 67, revenue: 20100 }
    ],
    
    clients: [
        { id: 1, name: 'ABC Fashion Store', orders: 23, revenue: 89450, lastOrder: '2025-05-28' },
        { id: 2, name: 'Metro Boutique', orders: 18, revenue: 67200, lastOrder: '2025-05-25' },
        { id: 3, name: 'Elite Accessories', orders: 15, revenue: 52800, lastOrder: '2025-05-20' },
        { id: 4, name: 'Fashion Gallery', orders: 12, revenue: 43600, lastOrder: '2025-05-15' }
    ]
};

// Initialize shared functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSystemStatus();
    console.log('Shared JavaScript initialized');
});