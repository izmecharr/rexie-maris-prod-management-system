// Dashboard Page JavaScript - Handles dashboard-specific functionality

// Dashboard namespace
const Dashboard = {
    // Dashboard data
    data: {
        stats: {
            monthlyRevenue: 247385,
            bagsProduced: 1234,
            activeOrders: 43,
            deliveryRate: 89
        },
        
        inventory: [
            { material: 'Leather Stock', percentage: 15, status: 'critical' },
            { material: 'Fabric Materials', percentage: 35, status: 'low' },
            { material: 'Hardware & Zippers', percentage: 78, status: 'good' },
            { material: 'Packaging Materials', percentage: 92, status: 'optimal' }
        ],
        
        popularBags: [
            { model: 'Classic Tote', unitsSold: 156, revenue: 46800, trend: '+15%', trendType: 'positive' },
            { model: 'Executive Briefcase', unitsSold: 89, revenue: 62300, trend: '+8%', trendType: 'positive' },
            { model: 'Casual Backpack', unitsSold: 134, revenue: 40200, trend: '-3%', trendType: 'negative' },
            { model: 'Evening Clutch', unitsSold: 67, revenue: 20100, trend: '+22%', trendType: 'positive' }
        ],
        
        recentOrders: [
            { id: 'ORD-001', client: 'ABC Fashion Store', status: 'completed', delivery: 'May 28, 2025' },
            { id: 'ORD-002', client: 'Metro Boutique', status: 'in-progress', delivery: 'June 2, 2025' },
            { id: 'ORD-003', client: 'Elite Accessories', status: 'pending', delivery: 'June 5, 2025' },
            { id: 'ORD-004', client: 'Fashion Gallery', status: 'urgent', delivery: 'May 31, 2025' }
        ],
        
        topClients: [
            { name: 'ABC Fashion Store', orders: 23, revenue: 89450, lastOrder: 'May 28, 2025' },
            { name: 'Metro Boutique', orders: 18, revenue: 67200, lastOrder: 'May 25, 2025' },
            { name: 'Elite Accessories', orders: 15, revenue: 52800, lastOrder: 'May 20, 2025' },
            { name: 'Fashion Gallery', orders: 12, revenue: 43600, lastOrder: 'May 15, 2025' }
        ]
    },

    // Initialize dashboard
    init() {
        console.log('Initializing Dashboard...');
        this.setupEventListeners();
        this.startRealTimeUpdates();
        this.animateStatsOnLoad();
        console.log('Dashboard initialized successfully');
    },

    // Set up event listeners
    setupEventListeners() {
        // Real-time updates for stats
        this.setupStatsUpdates();
        
        // Table interactions
        this.setupTableInteractions();
        
        // Card hover effects
        this.setupCardEffects();
    },

    // Animate stats on page load
    animateStatsOnLoad() {
        setTimeout(() => {
            const statCards = document.querySelectorAll('.stat-card');
            statCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transform = 'translateY(0)';
                    card.style.opacity = '1';
                }, index * 100);
            });
        }, 100);
    },

    // Setup stats updates
    setupStatsUpdates() {
        setInterval(() => {
            this.updateRandomStat();
        }, 30000); // Update every 30 seconds
    },

    // Update a random stat
    updateRandomStat() {
        const stats = ['monthly-revenue', 'bags-produced', 'active-orders', 'delivery-rate'];
        const randomStat = stats[Math.floor(Math.random() * stats.length)];
        const element = document.getElementById(randomStat);
        
        if (element) {
            // Add visual feedback
            element.parentElement.style.transform = 'scale(1.05)';
            element.parentElement.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                element.parentElement.style.transform = 'scale(1)';
                
                // Update value slightly
                if (randomStat === 'active-orders') {
                    const change = Math.random() > 0.5 ? 1 : -1;
                    this.data.stats.activeOrders = Math.max(0, this.data.stats.activeOrders + change);
                    element.textContent = this.data.stats.activeOrders;
                    
                    if (change > 0) {
                        this.showNotification('New order received!', 'info');
                    }
                }
            }, 300);
        }
    },

    // Setup table interactions
    setupTableInteractions() {
        // Add click handlers to table rows
        const tables = document.querySelectorAll('.table-container table tbody tr');
        tables.forEach(row => {
            row.style.cursor = 'pointer';
            row.addEventListener('click', () => {
                this.showRowDetails(row);
            });
        });
    },

    // Setup card hover effects
    setupCardEffects() {
        const cards = document.querySelectorAll('.dashboard-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateCard(card, 'enter');
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateCard(card, 'leave');
            });
        });
    },

    // Animate cards
    animateCard(card, action) {
        if (action === 'enter') {
            card.style.transition = 'all 0.3s ease';
            card.style.transform = 'translateY(-2px)';
            card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        } else {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        }
    },

    // Start real-time updates
    startRealTimeUpdates() {
        // Simulate real-time data updates
        setInterval(() => {
            this.simulateDataUpdate();
        }, 60000); // Every minute
        
        // Update progress bars animation
        this.animateProgressBars();
    },

    // Simulate data updates
    simulateDataUpdate() {
        // Random inventory changes
        this.data.inventory.forEach(item => {
            if (Math.random() > 0.8) {
                const change = (Math.random() - 0.5) * 5; // ±2.5%
                item.percentage = Math.max(0, Math.min(100, item.percentage + change));
                this.updateInventoryDisplay();
            }
        });
        
        // Random production updates
        if (Math.random() > 0.7) {
            this.data.stats.bagsProduced += Math.floor(Math.random() * 3);
            document.getElementById('bags-produced').textContent = this.data.stats.bagsProduced.toLocaleString();
            this.showNotification('Production milestone reached!', 'success');
        }
    },

    // Animate progress bars
    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }, index * 200);
        });
    },

    // Update inventory display
    updateInventoryDisplay() {
        this.data.inventory.forEach((item, index) => {
            const progressBar = document.querySelectorAll('.progress-fill')[index];
            if (progressBar) {
                progressBar.style.width = `${item.percentage}%`;
            }
        });
    },

    // Show row details
    showRowDetails(row) {
        const rowData = this.extractRowData(row);
        this.showModal('Row Details', `
            <div class="row-details">
                <h4>Details</h4>
                <p>Row information: ${JSON.stringify(rowData)}</p>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="Dashboard.closeModal()">Close</button>
                </div>
            </div>
        `);
    },

    // Extract row data
    extractRowData(row) {
        const cells = row.querySelectorAll('td');
        const data = {};
        cells.forEach((cell, index) => {
            data[`column_${index}`] = cell.textContent.trim();
        });
        return data;
    },

    // Quick Action Functions
    showNewProductionOrder() {
        this.showModal('New Production Order', `
            <div class="production-order-form">
                <form onsubmit="Dashboard.handleProductionOrderSubmit(event)">
                    <div class="form-group">
                        <label>Client Name</label>
                        <select class="form-control" name="client" required>
                            <option value="">Select Client</option>
                            <option value="ABC Fashion Store">ABC Fashion Store</option>
                            <option value="Metro Boutique">Metro Boutique</option>
                            <option value="Elite Accessories">Elite Accessories</option>
                            <option value="Fashion Gallery">Fashion Gallery</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Bag Model</label>
                        <select class="form-control" name="product" required>
                            <option value="">Select Product</option>
                            <option value="Classic Tote">Classic Tote</option>
                            <option value="Executive Briefcase">Executive Briefcase</option>
                            <option value="Casual Backpack">Casual Backpack</option>
                            <option value="Evening Clutch">Evening Clutch</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Quantity</label>
                            <input type="number" class="form-control" name="quantity" value="50" min="1" required>
                        </div>
                        <div class="form-group">
                            <label>Due Date</label>
                            <input type="date" class="form-control" name="dueDate" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Special Instructions</label>
                        <textarea class="form-control" name="instructions" rows="3" placeholder="Any special requirements..."></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="Dashboard.closeModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Create Order</button>
                    </div>
                </form>
            </div>
        `);
    },

    showInventoryDialog() {
        this.showModal('Add Inventory', `
            <div class="inventory-form">
                <form onsubmit="Dashboard.handleInventorySubmit(event)">
                    <div class="form-group">
                        <label>Material Type</label>
                        <select class="form-control" name="material" required>
                            <option value="">Select Material</option>
                            <option value="leather">Leather</option>
                            <option value="fabric">Fabric</option>
                            <option value="hardware">Hardware</option>
                            <option value="packaging">Packaging</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Quantity</label>
                            <input type="number" class="form-control" name="quantity" min="1" required>
                        </div>
                        <div class="form-group">
                            <label>Unit</label>
                            <select class="form-control" name="unit" required>
                                <option value="sq. meters">Square Meters</option>
                                <option value="yards">Yards</option>
                                <option value="pieces">Pieces</option>
                                <option value="boxes">Boxes</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Supplier</label>
                        <input type="text" class="form-control" name="supplier" placeholder="Supplier name">
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="Dashboard.closeModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Add to Inventory</button>
                    </div>
                </form>
            </div>
        `);
    },

    showNewClient() {
        this.showModal('Add New Client', `
            <div class="client-form">
                <form onsubmit="Dashboard.handleClientSubmit(event)">
                    <div class="form-group">
                        <label>Client Name</label>
                        <input type="text" class="form-control" name="clientName" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" class="form-control" name="email" required>
                        </div>
                        <div class="form-group">
                            <label>Phone</label>
                            <input type="tel" class="form-control" name="phone">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Address</label>
                        <textarea class="form-control" name="address" rows="2"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Client Tier</label>
                        <select class="form-control" name="tier">
                            <option value="standard">Standard</option>
                            <option value="premium">Premium</option>
                        </select>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="Dashboard.closeModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Add Client</button>
                    </div>
                </form>
            </div>
        `);
    },

    generateReport() {
        this.showModal('Generate Report', `
            <div class="report-generator">
                <form onsubmit="Dashboard.handleReportGenerate(event)">
                    <div class="form-group">
                        <label>Report Type</label>
                        <select class="form-control" name="reportType" required>
                            <option value="">Select Report Type</option>
                            <option value="production">Production Summary</option>
                            <option value="sales">Sales Analysis</option>
                            <option value="inventory">Inventory Report</option>
                            <option value="financial">Financial Overview</option>
                            <option value="client">Client Performance</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Time Period</label>
                        <select class="form-control" name="period" required>
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="quarter">This Quarter</option>
                            <option value="year">This Year</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Export Format</label>
                        <div class="checkbox-group">
                            <label><input type="checkbox" name="format" value="csv" checked> CSV</label>
                            <label><input type="checkbox" name="format" value="excel"> Excel</label>
                            <label><input type="checkbox" name="format" value="pdf"> PDF</label>
                        </div>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="Dashboard.closeModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Generate Report</button>
                    </div>
                </form>
            </div>
        `);
    },

    // Handle form submissions
    handleProductionOrderSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const orderData = Object.fromEntries(formData.entries());
        
        console.log('Production Order Created:', orderData);
        this.showNotification('Production order created successfully!', 'success');
        this.closeModal();
        
        // Update active orders count
        this.data.stats.activeOrders++;
        document.getElementById('active-orders').textContent = this.data.stats.activeOrders;
    },

    handleInventorySubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const inventoryData = Object.fromEntries(formData.entries());
        
        console.log('Inventory Added:', inventoryData);
        this.showNotification('Inventory updated successfully!', 'success');
        this.closeModal();
    },

    handleClientSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const clientData = Object.fromEntries(formData.entries());
        
        console.log('Client Added:', clientData);
        this.showNotification('New client added successfully!', 'success');
        this.closeModal();
    },

    handleReportGenerate(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const reportData = Object.fromEntries(formData.entries());
        
        console.log('Report Generated:', reportData);
        this.showLoadingReport();
        
        setTimeout(() => {
            this.closeModal();
            this.showNotification('Report generated and downloaded successfully!', 'success');
        }, 3000);
    },

    showLoadingReport() {
        const modal = document.querySelector('.modal-overlay .modal-body');
        if (modal) {
            modal.innerHTML = `
                <div class="loading-report">
                    <div class="loading-spinner">
                        <div class="spinner"></div>
                    </div>
                    <h4>Generating Report...</h4>
                    <div class="progress-bar">
                        <div class="progress-fill progress-paid" style="width: 0%; transition: width 3s ease;"></div>
                    </div>
                    <p>Please wait while we compile your data...</p>
                </div>
            `;
            
            // Animate progress bar
            setTimeout(() => {
                const progressFill = modal.querySelector('.progress-fill');
                if (progressFill) {
                    progressFill.style.width = '100%';
                }
            }, 100);
        }
    },

    // Action handlers
    handleInventoryAlert() {
        this.showNotification('Inventory alert acknowledged. Reorder process initiated.', 'info');
        // Navigate to inventory page
        if (window.App && window.App.navigateTo) {
            setTimeout(() => {
                window.App.navigateTo('inventory');
            }, 1500);
        }
    },

    exportData(type, format) {
        console.log(`Exporting ${type} data as ${format}`);
        
        let data = [];
        switch(type) {
            case 'production':
                data = this.data.popularBags;
                break;
            case 'inventory':
                data = this.data.inventory;
                break;
            case 'clients':
                data = this.data.topClients;
                break;
            case 'financial':
                data = [{ revenue: this.data.stats.monthlyRevenue, expenses: 156720, profit: 90665 }];
                break;
            default:
                data = this.data.popularBags;
        }
        
        if (format === 'csv') {
            this.exportToCSV(data, `${type}_export.csv`);
        } else if (format === 'excel') {
            this.exportToExcel(data, `${type}_export`);
        }
        
        this.showNotification(`${type} data exported as ${format.toUpperCase()}`, 'success');
    },

    exportToCSV(data, filename) {
        if (window.exportToCSV) {
            window.exportToCSV(data, filename);
        } else {
            console.log('CSV export function not available');
        }
    },

    exportToExcel(data, filename) {
        if (window.exportToExcel) {
            window.exportToExcel(data, filename);
        } else {
            console.log('Excel export function not available');
        }
    },

    viewProductionDetails() {
        this.showNotification('Opening production details...', 'info');
        if (window.App && window.App.navigateTo) {
            setTimeout(() => {
                window.App.navigateTo('production');
            }, 1000);
        }
    },

    reorderMaterials() {
        this.showNotification('Material reorder initiated...', 'info');
        if (window.App && window.App.navigateTo) {
            setTimeout(() => {
                window.App.navigateTo('inventory');
            }, 1000);
        }
    },

    viewAllProducts() {
        this.showNotification('Opening product catalog...', 'info');
        if (window.App && window.App.navigateTo) {
            setTimeout(() => {
                window.App.navigateTo('catalog');
            }, 1000);
        }
    },

    printOrders() {
        this.showNotification('Preparing orders for printing...', 'info');
        setTimeout(() => {
            window.print();
        }, 1000);
    },

    manageOrders() {
        this.showNotification('Opening order management...', 'info');
        if (window.App && window.App.navigateTo) {
            setTimeout(() => {
                window.App.navigateTo('sales');
            }, 1000);
        }
    },

    contactClients() {
        this.showNotification('Opening client management...', 'info');
        if (window.App && window.App.navigateTo) {
            setTimeout(() => {
                window.App.navigateTo('clients');
            }, 1000);
        }
    },

    viewFinancialDetails() {
        this.showNotification('Opening financial overview...', 'info');
        if (window.App && window.App.navigateTo) {
            setTimeout(() => {
                window.App.navigateTo('financial');
            }, 1000);
        }
    },

    // Modal functions
    showModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" onclick="Dashboard.closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    },

    closeModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
    },

    // Notification system
    showNotification(message, type = 'success') {
        if (window.showSuccess && type === 'success') {
            window.showSuccess(message);
        } else if (window.showError && type === 'error') {
            window.showError(message);
        } else {
            // Fallback notification
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }
};

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the dashboard page
    if (document.querySelector('.stats-grid')) {
        Dashboard.init();
    }
});

// Make Dashboard available globally
window.Dashboard = Dashboard;

console.log('Dashboard JavaScript loaded successfully');