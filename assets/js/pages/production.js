// Production Orders Page JavaScript - Handles production-specific functionality

// Production namespace
const Production = {
    // Production data
    data: {
        summary: {
            totalOrders: 127,
            activeOrders: 43,
            completedOrders: 84,
            capacityUtilization: 78
        },
        
        orders: [
            {
                id: 'PO-2025-156',
                orderNumber: 'PO-2025-156',
                client: 'Fashion Gallery',
                clientTier: 'premium',
                product: 'Executive Briefcase',
                productCode: 'EB-001',
                quantity: 50,
                status: 'in-progress',
                progress: 85,
                dueDate: '2025-05-31',
                assignedTo: 'Maria Santos',
                assignedAvatar: 'MS',
                priority: 'urgent',
                startDate: '2025-05-20',
                notes: 'Rush order for Fashion Gallery. Premium leather required.'
            },
            {
                id: 'PO-2025-157',
                orderNumber: 'PO-2025-157',
                client: 'Metro Boutique',
                clientTier: 'standard',
                product: 'Classic Tote',
                productCode: 'CT-001',
                quantity: 75,
                status: 'in-progress',
                progress: 60,
                dueDate: '2025-06-02',
                assignedTo: 'Juan Dela Cruz',
                assignedAvatar: 'JD',
                priority: 'medium',
                startDate: '2025-05-22',
                notes: 'Standard production order. No special requirements.'
            },
            {
                id: 'PO-2025-158',
                orderNumber: 'PO-2025-158',
                client: 'Elite Accessories',
                clientTier: 'premium',
                product: 'Casual Backpack',
                productCode: 'CB-001',
                quantity: 100,
                status: 'pending',
                progress: 25,
                dueDate: '2025-06-05',
                assignedTo: 'Ana Rodriguez',
                assignedAvatar: 'AR',
                priority: 'normal',
                startDate: '2025-05-25',
                notes: 'Large order for Elite Accessories. Quality focus.'
            }
        ],
        
        currentView: 'table',
        currentFilter: '',
        currentSort: { field: 'dueDate', direction: 'asc' },
        selectedOrders: [],
        currentPage: 1,
        ordersPerPage: 10
    },

    // Initialize production page
    init() {
        console.log('Initializing Production Orders...');
        this.setupEventListeners();
        this.loadOrders();
        this.updateSummaryCards();
        this.startRealTimeUpdates();
        console.log('Production Orders initialized successfully');
    },

    // Set up event listeners
    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('order-search');
        if (searchInput) {
            searchInput.addEventListener('input', debounce(() => {
                this.searchOrders();
            }, 300));
        }

        // Filter functionality
        const statusFilter = document.getElementById('status-filter');
        if (statusFilter) {
            statusFilter.addEventListener('change', () => {
                this.filterByStatus();
            });
        }

        // Select all checkbox
        const selectAll = document.getElementById('select-all');
        if (selectAll) {
            selectAll.addEventListener('change', () => {
                this.toggleSelectAll();
            });
        }

        // Setup table interactions
        this.setupTableInteractions();
    },

    // Setup table interactions
    setupTableInteractions() {
        // Add click handlers for row selection
        const tableBody = document.getElementById('orders-table-body');
        if (tableBody) {
            tableBody.addEventListener('click', (e) => {
                if (e.target.type === 'checkbox' && e.target.classList.contains('row-select')) {
                    this.toggleRowSelection(e.target.value);
                }
            });
        }
    },

    // Load and display orders
    loadOrders() {
        this.renderOrdersTable();
        this.updateResultsCount();
    },

    // Render orders table
    renderOrdersTable() {
        const tableBody = document.getElementById('orders-table-body');
        if (!tableBody) return;

        const filteredOrders = this.getFilteredOrders();
        const paginatedOrders = this.getPaginatedOrders(filteredOrders);

        tableBody.innerHTML = paginatedOrders.map(order => `
            <tr data-order-id="${order.id}" class="order-row ${order.priority}">
                <td><input type="checkbox" class="row-select" value="${order.id}"></td>
                <td class="order-number">
                    <span class="order-id">${order.orderNumber}</span>
                    <span class="order-priority ${order.priority}">${this.getPriorityIcon(order.priority)}</span>
                </td>
                <td class="client-cell">
                    <div class="client-info">
                        <strong>${order.client}</strong>
                        <span class="client-tier ${order.clientTier}">${order.clientTier}</span>
                    </div>
                </td>
                <td class="product-cell">
                    <div class="product-info">
                        <span class="product-name">${order.product}</span>
                        <span class="product-code">${order.productCode}</span>
                    </div>
                </td>
                <td class="quantity-cell">
                    <span class="quantity">${order.quantity}</span>
                    <span class="unit">units</span>
                </td>
                <td class="status-cell">
                    <span class="status-badge ${order.status}">${this.formatStatus(order.status)}</span>
                </td>
                <td class="progress-cell">
                    <div class="progress-container">
                        <div class="progress-bar">
                            <div class="progress-fill ${order.priority}" style="width: ${order.progress}%;"></div>
                        </div>
                        <span class="progress-percentage">${order.progress}%</span>
                    </div>
                </td>
                <td class="due-date-cell">
                    <span class="due-date ${this.getDueDateClass(order.dueDate)}">${this.formatDate(order.dueDate)}</span>
                    <span class="days-remaining">${this.getDaysRemaining(order.dueDate)}</span>
                </td>
                <td class="assigned-cell">
                    <div class="assignee">
                        <div class="assignee-avatar">${order.assignedAvatar}</div>
                        <span class="assignee-name">${order.assignedTo}</span>
                    </div>
                </td>
                <td class="actions-cell">
                    <button class="action-btn view" onclick="Production.viewOrderDetails('${order.id}')" title="View Details">👁</button>
                    <button class="action-btn edit" onclick="Production.editOrder('${order.id}')" title="Edit Order">✏️</button>
                    <button class="action-btn menu" onclick="Production.showOrderMenu('${order.id}')" title="More Actions">⋮</button>
                </td>
            </tr>
        `).join('');
    },

    // Get filtered orders
    getFilteredOrders() {
        let filtered = [...this.data.orders];

        // Apply search filter
        if (this.data.currentFilter) {
            const searchTerm = this.data.currentFilter.toLowerCase();
            filtered = filtered.filter(order => 
                order.orderNumber.toLowerCase().includes(searchTerm) ||
                order.client.toLowerCase().includes(searchTerm) ||
                order.product.toLowerCase().includes(searchTerm) ||
                order.assignedTo.toLowerCase().includes(searchTerm)
            );
        }

        // Apply status filter
        const statusFilter = document.getElementById('status-filter');
        if (statusFilter && statusFilter.value) {
            filtered = filtered.filter(order => order.status === statusFilter.value);
        }

        // Apply sorting
        filtered.sort((a, b) => {
            const field = this.data.currentSort.field;
            const direction = this.data.currentSort.direction;
            
            let aValue = a[field];
            let bValue = b[field];
            
            if (field === 'dueDate') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }
            
            if (aValue < bValue) return direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    },

    // Get paginated orders
    getPaginatedOrders(orders) {
        const start = (this.data.currentPage - 1) * this.data.ordersPerPage;
        const end = start + this.data.ordersPerPage;
        return orders.slice(start, end);
    },

    // Update summary cards
    updateSummaryCards() {
        const elements = {
            'total-orders': this.data.summary.totalOrders,
            'active-orders': this.data.summary.activeOrders,
            'completed-orders': this.data.summary.completedOrders,
            'capacity-utilization': this.data.summary.capacityUtilization + '%'
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });
    },

    // Update results count
    updateResultsCount() {
        const element = document.getElementById('results-count');
        if (element) {
            const filtered = this.getFilteredOrders();
            const showing = Math.min(this.data.ordersPerPage, filtered.length);
            element.textContent = `Showing ${showing} of ${filtered.length} orders`;
        }
    },

    // Search orders
    searchOrders() {
        const searchInput = document.getElementById('order-search');
        if (searchInput) {
            this.data.currentFilter = searchInput.value;
            this.data.currentPage = 1; // Reset to first page
            this.loadOrders();
        }
    },

    // Filter by status
    filterByStatus() {
        this.data.currentPage = 1; // Reset to first page
        this.loadOrders();
    },

    // Sort by field
    sortBy(field) {
        if (this.data.currentSort.field === field) {
            this.data.currentSort.direction = this.data.currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
            this.data.currentSort.field = field;
            this.data.currentSort.direction = 'asc';
        }
        this.loadOrders();
    },

    // Toggle select all
    toggleSelectAll() {
        const selectAll = document.getElementById('select-all');
        const rowSelects = document.querySelectorAll('.row-select');
        
        if (selectAll && selectAll.checked) {
            this.data.selectedOrders = [...this.getFilteredOrders().map(order => order.id)];
            rowSelects.forEach(checkbox => checkbox.checked = true);
        } else {
            this.data.selectedOrders = [];
            rowSelects.forEach(checkbox => checkbox.checked = false);
        }
        
        this.updateBulkActions();
    },

    // Toggle row selection
    toggleRowSelection(orderId) {
        const index = this.data.selectedOrders.indexOf(orderId);
        if (index > -1) {
            this.data.selectedOrders.splice(index, 1);
        } else {
            this.data.selectedOrders.push(orderId);
        }
        
        this.updateSelectAllState();
        this.updateBulkActions();
    },

    // Update select all state
    updateSelectAllState() {
        const selectAll = document.getElementById('select-all');
        const totalVisible = this.getPaginatedOrders(this.getFilteredOrders()).length;
        const selectedVisible = this.data.selectedOrders.length;
        
        if (selectAll) {
            selectAll.checked = selectedVisible > 0 && selectedVisible === totalVisible;
            selectAll.indeterminate = selectedVisible > 0 && selectedVisible < totalVisible;
        }
    },

    // Update bulk actions
    updateBulkActions() {
        // Enable/disable bulk action buttons based on selection
        const bulkButtons = document.querySelectorAll('.bulk-action');
        bulkButtons.forEach(button => {
            button.disabled = this.data.selectedOrders.length === 0;
        });
    },

    // Switch view
    switchView(view) {
        this.data.currentView = view;
        
        // Update view toggle buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === view) {
                btn.classList.add('active');
            }
        });
        
        // Show appropriate view
        this.renderCurrentView();
    },

    // Render current view
    renderCurrentView() {
        const tableView = document.getElementById('orders-table-view');
        
        switch (this.data.currentView) {
            case 'table':
                if (tableView) tableView.style.display = 'block';
                this.renderOrdersTable();
                break;
            case 'cards':
                if (tableView) tableView.style.display = 'none';
                this.renderCardsView();
                break;
            case 'kanban':
                if (tableView) tableView.style.display = 'none';
                this.renderKanbanView();
                break;
        }
    },

    // Render cards view
    renderCardsView() {
        // TODO: Implement cards view
        console.log('Cards view not yet implemented');
    },

    // Render kanban view
    renderKanbanView() {
        // TODO: Implement kanban view
        console.log('Kanban view not yet implemented');
    },

    // Pagination
    previousPage() {
        if (this.data.currentPage > 1) {
            this.data.currentPage--;
            this.loadOrders();
        }
    },

    nextPage() {
        const totalPages = Math.ceil(this.getFilteredOrders().length / this.data.ordersPerPage);
        if (this.data.currentPage < totalPages) {
            this.data.currentPage++;
            this.loadOrders();
        }
    },

    // Modal functions
    showNewOrderModal() {
        this.showModal('New Production Order', `
            <div class="production-order-form">
                <form onsubmit="Production.handleNewOrderSubmit(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Order Number</label>
                            <input type="text" class="form-control" name="orderNumber" value="PO-2025-${Date.now().toString().slice(-3)}" readonly>
                        </div>
                        <div class="form-group">
                            <label>Priority</label>
                            <select class="form-control" name="priority" required>
                                <option value="normal">Normal</option>
                                <option value="medium">High</option>
                                <option value="urgent">Urgent</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Client</label>
                            <select class="form-control" name="client" required>
                                <option value="">Select Client</option>
                                <option value="ABC Fashion Store">ABC Fashion Store</option>
                                <option value="Metro Boutique">Metro Boutique</option>
                                <option value="Elite Accessories">Elite Accessories</option>
                                <option value="Fashion Gallery">Fashion Gallery</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Product</label>
                            <select class="form-control" name="product" required>
                                <option value="">Select Product</option>
                                <option value="Classic Tote">Classic Tote</option>
                                <option value="Executive Briefcase">Executive Briefcase</option>
                                <option value="Casual Backpack">Casual Backpack</option>
                                <option value="Evening Clutch">Evening Clutch</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Quantity</label>
                            <input type="number" class="form-control" name="quantity" min="1" required>
                        </div>
                        <div class="form-group">
                            <label>Due Date</label>
                            <input type="date" class="form-control" name="dueDate" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Assigned To</label>
                        <select class="form-control" name="assignedTo" required>
                            <option value="">Select Employee</option>
                            <option value="Maria Santos">Maria Santos</option>
                            <option value="Juan Dela Cruz">Juan Dela Cruz</option>
                            <option value="Ana Rodriguez">Ana Rodriguez</option>
                            <option value="Carlos Mendoza">Carlos Mendoza</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Notes</label>
                        <textarea class="form-control" name="notes" rows="3" placeholder="Special instructions or requirements..."></textarea>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="Production.closeModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Create Order</button>
                    </div>
                </form>
            </div>
        `);
    },

    // View order details
    viewOrderDetails(orderId) {
        const order = this.data.orders.find(o => o.id === orderId);
        if (!order) return;

        this.showModal(`Order Details - ${order.orderNumber}`, `
            <div class="order-details-view">
                <div class="order-summary">
                    <div class="summary-row">
                        <span class="label">Client:</span>
                        <span class="value">${order.client} <span class="client-tier ${order.clientTier}">${order.clientTier}</span></span>
                    </div>
                    <div class="summary-row">
                        <span class="label">Product:</span>
                        <span class="value">${order.product} (${order.productCode})</span>
                    </div>
                    <div class="summary-row">
                        <span class="label">Quantity:</span>
                        <span class="value">${order.quantity} units</span>
                    </div>
                    <div class="summary-row">
                        <span class="label">Status:</span>
                        <span class="value"><span class="status-badge ${order.status}">${this.formatStatus(order.status)}</span></span>
                    </div>
                    <div class="summary-row">
                        <span class="label">Progress:</span>
                        <span class="value">
                            <div class="progress-container">
                                <div class="progress-bar">
                                    <div class="progress-fill ${order.priority}" style="width: ${order.progress}%;"></div>
                                </div>
                                <span class="progress-percentage">${order.progress}%</span>
                            </div>
                        </span>
                    </div>
                    <div class="summary-row">
                        <span class="label">Due Date:</span>
                        <span class="value ${this.getDueDateClass(order.dueDate)}">${this.formatDate(order.dueDate)}</span>
                    </div>
                    <div class="summary-row">
                        <span class="label">Assigned To:</span>
                        <span class="value">
                            <div class="assignee">
                                <div class="assignee-avatar">${order.assignedAvatar}</div>
                                <span class="assignee-name">${order.assignedTo}</span>
                            </div>
                        </span>
                    </div>
                    <div class="summary-row">
                        <span class="label">Notes:</span>
                        <span class="value">${order.notes || 'No special notes'}</span>
                    </div>
                </div>
                
                <div class="order-actions-detail">
                    <button class="btn btn-secondary" onclick="Production.editOrder('${order.id}')">Edit Order</button>
                    <button class="btn btn-secondary" onclick="Production.updateProgress('${order.id}')">Update Progress</button>
                    <button class="btn btn-primary" onclick="Production.printOrder('${order.id}')">Print Order</button>
                </div>
            </div>
        `);
    },

    // Edit order
    editOrder(orderId) {
        const order = this.data.orders.find(o => o.id === orderId);
        if (!order) return;

        this.showModal(`Edit Order - ${order.orderNumber}`, `
            <div class="edit-order-form">
                <form onsubmit="Production.handleEditOrderSubmit(event, '${orderId}')">
                    <div class="form-group">
                        <label>Status</label>
                        <select class="form-control" name="status" required>
                            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                            <option value="in-progress" ${order.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                            <option value="quality-check" ${order.status === 'quality-check' ? 'selected' : ''}>Quality Check</option>
                            <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                            <option value="on-hold" ${order.status === 'on-hold' ? 'selected' : ''}>On Hold</option>
                        </select>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Progress (%)</label>
                            <input type="number" class="form-control" name="progress" min="0" max="100" value="${order.progress}" required>
                        </div>
                        <div class="form-group">
                            <label>Due Date</label>
                            <input type="date" class="form-control" name="dueDate" value="${order.dueDate}" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Assigned To</label>
                        <select class="form-control" name="assignedTo" required>
                            <option value="Maria Santos" ${order.assignedTo === 'Maria Santos' ? 'selected' : ''}>Maria Santos</option>
                            <option value="Juan Dela Cruz" ${order.assignedTo === 'Juan Dela Cruz' ? 'selected' : ''}>Juan Dela Cruz</option>
                            <option value="Ana Rodriguez" ${order.assignedTo === 'Ana Rodriguez' ? 'selected' : ''}>Ana Rodriguez</option>
                            <option value="Carlos Mendoza" ${order.assignedTo === 'Carlos Mendoza' ? 'selected' : ''}>Carlos Mendoza</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Notes</label>
                        <textarea class="form-control" name="notes" rows="3">${order.notes || ''}</textarea>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="Production.closeModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Update Order</button>
                    </div>
                </form>
            </div>
        `);
    },

    // Update progress
    updateProgress(orderId) {
        const order = this.data.orders.find(o => o.id === orderId);
        if (!order) return;

        this.showModal(`Update Progress - ${order.orderNumber}`, `
            <div class="progress-update-form">
                <div class="current-progress">
                    <h4>Current Progress: ${order.progress}%</h4>
                    <div class="progress-bar">
                        <div class="progress-fill ${order.priority}" style="width: ${order.progress}%;"></div>
                    </div>
                </div>
                
                <form onsubmit="Production.handleProgressUpdate(event, '${orderId}')">
                    <div class="form-group">
                        <label>New Progress (%)</label>
                        <input type="range" class="progress-slider" name="progress" min="0" max="100" value="${order.progress}" 
                               oninput="this.nextElementSibling.textContent = this.value + '%'">
                        <div class="progress-value">${order.progress}%</div>
                    </div>
                    
                    <div class="form-group">
                        <label>Status Update</label>
                        <select class="form-control" name="status">
                            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                            <option value="in-progress" ${order.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                            <option value="quality-check" ${order.status === 'quality-check' ? 'selected' : ''}>Quality Check</option>
                            <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Progress Notes</label>
                        <textarea class="form-control" name="progressNotes" rows="3" placeholder="What work was completed?"></textarea>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="Production.closeModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Update Progress</button>
                    </div>
                </form>
            </div>
        `);
    },

    // Handle form submissions
    handleNewOrderSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const orderData = Object.fromEntries(formData.entries());
        
        // Create new order object
        const newOrder = {
            id: 'PO-2025-' + Date.now(),
            orderNumber: orderData.orderNumber,
            client: orderData.client,
            clientTier: 'standard', // Default, could be determined by client
            product: orderData.product,
            productCode: this.getProductCode(orderData.product),
            quantity: parseInt(orderData.quantity),
            status: 'pending',
            progress: 0,
            dueDate: orderData.dueDate,
            assignedTo: orderData.assignedTo,
            assignedAvatar: this.getInitials(orderData.assignedTo),
            priority: orderData.priority,
            startDate: new Date().toISOString().split('T')[0],
            notes: orderData.notes
        };
        
        // Add to orders array
        this.data.orders.unshift(newOrder);
        
        // Update UI
        this.loadOrders();
        this.updateSummaryCards();
        this.closeModal();
        
        console.log('New order created:', newOrder);
        this.showNotification('Production order created successfully!', 'success');
    },

    handleEditOrderSubmit(event, orderId) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const updateData = Object.fromEntries(formData.entries());
        
        // Find and update order
        const orderIndex = this.data.orders.findIndex(o => o.id === orderId);
        if (orderIndex > -1) {
            this.data.orders[orderIndex] = {
                ...this.data.orders[orderIndex],
                status: updateData.status,
                progress: parseInt(updateData.progress),
                dueDate: updateData.dueDate,
                assignedTo: updateData.assignedTo,
                assignedAvatar: this.getInitials(updateData.assignedTo),
                notes: updateData.notes
            };
            
            this.loadOrders();
            this.closeModal();
            this.showNotification('Order updated successfully!', 'success');
        }
    },

    handleProgressUpdate(event, orderId) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const updateData = Object.fromEntries(formData.entries());
        
        // Find and update order
        const orderIndex = this.data.orders.findIndex(o => o.id === orderId);
        if (orderIndex > -1) {
            this.data.orders[orderIndex].progress = parseInt(updateData.progress);
            this.data.orders[orderIndex].status = updateData.status;
            
            this.loadOrders();
            this.closeModal();
            this.showNotification('Progress updated successfully!', 'success');
        }
    },

    // Utility functions
    getPriorityIcon(priority) {
        const icons = {
            urgent: '🔥',
            medium: '⚠️',
            normal: '📋'
        };
        return icons[priority] || '📋';
    },

    formatStatus(status) {
        return status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    },

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    },

    getDaysRemaining(dueDateString) {
        const dueDate = new Date(dueDateString);
        const today = new Date();
        const diffTime = dueDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) return 'Overdue';
        if (diffDays === 0) return 'Due today';
        if (diffDays === 1) return '1 day left';
        return `${diffDays} days left`;
    },

    getDueDateClass(dueDateString) {
        const dueDate = new Date(dueDateString);
        const today = new Date();
        const diffTime = dueDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) return 'urgent';
        if (diffDays <= 1) return 'urgent';
        if (diffDays <= 3) return 'medium';
        return '';
    },

    getProductCode(productName) {
        const codes = {
            'Classic Tote': 'CT-001',
            'Executive Briefcase': 'EB-001',
            'Casual Backpack': 'CB-001',
            'Evening Clutch': 'EC-001'
        };
        return codes[productName] || 'XX-001';
    },

    getInitials(fullName) {
        return fullName.split(' ')
            .map(name => name.charAt(0))
            .join('')
            .toUpperCase();
    },

    // Export functionality
    exportOrders() {
        const filteredOrders = this.getFilteredOrders();
        const exportData = filteredOrders.map(order => ({
            'Order Number': order.orderNumber,
            'Client': order.client,
            'Product': order.product,
            'Quantity': order.quantity,
            'Status': this.formatStatus(order.status),
            'Progress': order.progress + '%',
            'Due Date': this.formatDate(order.dueDate),
            'Assigned To': order.assignedTo,
            'Priority': order.priority.toUpperCase()
        }));

        this.showModal('Export Production Orders', `
            <div class="export-options">
                <h4>Export Options</h4>
                <div class="export-summary">
                    <p>Ready to export <strong>${exportData.length}</strong> production orders</p>
                </div>
                
                <div class="form-group">
                    <label>Export Format</label>
                    <div class="export-formats">
                        <label class="format-option">
                            <input type="radio" name="format" value="csv" checked>
                            <span>📄 CSV Format</span>
                            <small>Comma-separated values for spreadsheet applications</small>
                        </label>
                        <label class="format-option">
                            <input type="radio" name="format" value="excel">
                            <span>📊 Excel Format</span>
                            <small>Microsoft Excel compatible format</small>
                        </label>
                        <label class="format-option">
                            <input type="radio" name="format" value="pdf">
                            <span>📋 PDF Report</span>
                            <small>Formatted report for printing and sharing</small>
                        </label>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Include</label>
                    <div class="include-options">
                        <label><input type="checkbox" checked> Order details</label>
                        <label><input type="checkbox" checked> Client information</label>
                        <label><input type="checkbox" checked> Progress status</label>
                        <label><input type="checkbox"> Order notes</label>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="Production.closeModal()">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="Production.performExport()">Export Orders</button>
                </div>
            </div>
        `);
    },

    performExport() {
        const format = document.querySelector('input[name="format"]:checked').value;
        const filteredOrders = this.getFilteredOrders();
        
        const exportData = filteredOrders.map(order => ({
            'Order Number': order.orderNumber,
            'Client': order.client,
            'Product': order.product,
            'Quantity': order.quantity,
            'Status': this.formatStatus(order.status),
            'Progress': order.progress + '%',
            'Due Date': this.formatDate(order.dueDate),
            'Assigned To': order.assignedTo,
            'Priority': order.priority.toUpperCase()
        }));

        if (format === 'csv') {
            this.exportToCSV(exportData, 'production_orders.csv');
        } else if (format === 'excel') {
            this.exportToExcel(exportData, 'production_orders');
        } else if (format === 'pdf') {
            this.generatePDFReport(exportData);
        }

        this.closeModal();
        this.showNotification(`Orders exported as ${format.toUpperCase()}`, 'success');
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

    generatePDFReport(data) {
        // Simulate PDF generation
        console.log('Generating PDF report...', data);
        this.showNotification('PDF report generated successfully!', 'success');
    },

    // Additional features
    showBulkActions() {
        if (this.data.selectedOrders.length === 0) {
            this.showNotification('Please select orders first', 'warning');
            return;
        }

        this.showModal(`Bulk Actions (${this.data.selectedOrders.length} orders)`, `
            <div class="bulk-actions-form">
                <h4>Available Actions</h4>
                
                <div class="action-list">
                    <button class="action-item" onclick="Production.bulkUpdateStatus()">
                        <span class="action-icon">📝</span>
                        <div class="action-details">
                            <strong>Update Status</strong>
                            <small>Change status for selected orders</small>
                        </div>
                    </button>
                    
                    <button class="action-item" onclick="Production.bulkAssign()">
                        <span class="action-icon">👤</span>
                        <div class="action-details">
                            <strong>Reassign Orders</strong>
                            <small>Assign to different team member</small>
                        </div>
                    </button>
                    
                    <button class="action-item" onclick="Production.bulkUpdateDueDate()">
                        <span class="action-icon">📅</span>
                        <div class="action-details">
                            <strong>Update Due Dates</strong>
                            <small>Extend or modify due dates</small>
                        </div>
                    </button>
                    
                    <button class="action-item danger" onclick="Production.bulkCancel()">
                        <span class="action-icon">❌</span>
                        <div class="action-details">
                            <strong>Cancel Orders</strong>
                            <small>Cancel selected orders</small>
                        </div>
                    </button>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="Production.closeModal()">Close</button>
                </div>
            </div>
        `);
    },

    showScheduleView() {
        this.showModal('Production Schedule Calendar', `
            <div class="schedule-view">
                <div class="calendar-header">
                    <h4>June 2025 Production Schedule</h4>
                    <div class="calendar-nav">
                        <button class="btn btn-sm btn-secondary">← May</button>
                        <button class="btn btn-sm btn-secondary">July →</button>
                    </div>
                </div>
                
                <div class="calendar-grid">
                    <div class="calendar-day">
                        <div class="day-header">Mon 1</div>
                        <div class="day-orders">
                            <div class="order-item urgent">PO-156 (85%)</div>
                        </div>
                    </div>
                    <div class="calendar-day">
                        <div class="day-header">Tue 2</div>
                        <div class="day-orders">
                            <div class="order-item medium">PO-157 (60%)</div>
                        </div>
                    </div>
                    <div class="calendar-day">
                        <div class="day-header">Wed 3</div>
                        <div class="day-orders">
                            <div class="order-item normal">PO-158 (25%)</div>
                        </div>
                    </div>
                    <!-- Add more days as needed -->
                </div>
                
                <div class="schedule-legend">
                    <div class="legend-item"><span class="color urgent"></span> Urgent Priority</div>
                    <div class="legend-item"><span class="color medium"></span> High Priority</div>
                    <div class="legend-item"><span class="color normal"></span> Normal Priority</div>
                </div>
            </div>
        `);
    },

    showCapacityDetails() {
        this.showModal('Production Capacity Optimization', `
            <div class="capacity-optimization">
                <h4>Capacity Analysis</h4>
                
                <div class="capacity-overview">
                    <div class="capacity-stat">
                        <span class="stat-label">Current Utilization:</span>
                        <span class="stat-value">78%</span>
                        <span class="stat-status optimal">Optimal</span>
                    </div>
                    <div class="capacity-stat">
                        <span class="stat-label">Peak Efficiency:</span>
                        <span class="stat-value">9 AM - 3 PM</span>
                        <span class="stat-status good">6 hours</span>
                    </div>
                    <div class="capacity-stat">
                        <span class="stat-label">Available Capacity:</span>
                        <span class="stat-value">110 units/week</span>
                        <span class="stat-status good">22% remaining</span>
                    </div>
                </div>
                
                <div class="optimization-suggestions">
                    <h5>Optimization Recommendations</h5>
                    <div class="suggestion-list">
                        <div class="suggestion">
                            <span class="suggestion-icon">💡</span>
                            <div class="suggestion-text">
                                <strong>Schedule Complex Orders Earlier:</strong>
                                Move briefcase orders to morning slots for better quality control.
                            </div>
                        </div>
                        <div class="suggestion">
                            <span class="suggestion-icon">⚡</span>
                            <div class="suggestion-text">
                                <strong>Parallel Processing:</strong>
                                Tote and backpack orders can be processed simultaneously.
                            </div>
                        </div>
                        <div class="suggestion">
                            <span class="suggestion-icon">📊</span>
                            <div class="suggestion-text">
                                <strong>Resource Allocation:</strong>
                                Consider additional staffing for urgent orders.
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="Production.closeModal()">Close</button>
                    <button type="button" class="btn btn-primary" onclick="Production.applyOptimizations()">Apply Recommendations</button>
                </div>
            </div>
        `);
    },

    // Timeline navigation
    previousMonth() {
        // Implementation for previous month navigation
        this.showNotification('Navigating to previous month...', 'info');
    },

    nextMonth() {
        // Implementation for next month navigation
        this.showNotification('Navigating to next month...', 'info');
    },

    showCalendarView() {
        this.showScheduleView();
    },

    // Order menu actions
    showOrderMenu(orderId) {
        const order = this.data.orders.find(o => o.id === orderId);
        if (!order) return;

        this.showModal(`Order Actions - ${order.orderNumber}`, `
            <div class="order-menu">
                <div class="menu-actions">
                    <button class="menu-item" onclick="Production.viewOrderDetails('${orderId}')">
                        <span class="menu-icon">👁</span>
                        <span>View Details</span>
                    </button>
                    <button class="menu-item" onclick="Production.editOrder('${orderId}')">
                        <span class="menu-icon">✏️</span>
                        <span>Edit Order</span>
                    </button>
                    <button class="menu-item" onclick="Production.updateProgress('${orderId}')">
                        <span class="menu-icon">📊</span>
                        <span>Update Progress</span>
                    </button>
                    <button class="menu-item" onclick="Production.duplicateOrder('${orderId}')">
                        <span class="menu-icon">📋</span>
                        <span>Duplicate Order</span>
                    </button>
                    <button class="menu-item" onclick="Production.printOrder('${orderId}')">
                        <span class="menu-icon">🖨</span>
                        <span>Print Order</span>
                    </button>
                    <button class="menu-item danger" onclick="Production.cancelOrder('${orderId}')">
                        <span class="menu-icon">❌</span>
                        <span>Cancel Order</span>
                    </button>
                </div>
            </div>
        `);
    },

    duplicateOrder(orderId) {
        const order = this.data.orders.find(o => o.id === orderId);
        if (!order) return;

        const newOrder = {
            ...order,
            id: 'PO-2025-' + Date.now(),
            orderNumber: 'PO-2025-' + Date.now().toString().slice(-3),
            status: 'pending',
            progress: 0,
            startDate: new Date().toISOString().split('T')[0]
        };

        this.data.orders.unshift(newOrder);
        this.loadOrders();
        this.closeModal();
        this.showNotification('Order duplicated successfully!', 'success');
    },

    printOrder(orderId) {
        this.closeModal();
        this.showNotification('Preparing order for printing...', 'info');
        setTimeout(() => {
            window.print();
        }, 1000);
    },

    cancelOrder(orderId) {
        const order = this.data.orders.find(o => o.id === orderId);
        if (!order) return;

        if (confirm(`Are you sure you want to cancel order ${order.orderNumber}?`)) {
            const orderIndex = this.data.orders.findIndex(o => o.id === orderId);
            if (orderIndex > -1) {
                this.data.orders[orderIndex].status = 'cancelled';
                this.loadOrders();
                this.closeModal();
                this.showNotification('Order cancelled successfully!', 'success');
            }
        }
    },

    // Real-time updates
    startRealTimeUpdates() {
        // Simulate real-time order updates
        setInterval(() => {
            this.simulateOrderUpdates();
        }, 30000); // Every 30 seconds

        // Update progress bars animation
        this.animateProgressBars();
    },

    simulateOrderUpdates() {
        // Randomly update order progress
        this.data.orders.forEach(order => {
            if (order.status === 'in-progress' && Math.random() > 0.8) {
                const progressIncrease = Math.floor(Math.random() * 5) + 1;
                order.progress = Math.min(100, order.progress + progressIncrease);
                
                if (order.progress >= 100) {
                    order.status = 'completed';
                    this.showNotification(`Order ${order.orderNumber} completed!`, 'success');
                }
            }
        });

        // Update UI if on current view
        if (this.data.currentView === 'table') {
            this.renderOrdersTable();
        }
    },

    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }, index * 100);
        });
    },

    // Modal functions
    showModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" onclick="Production.closeModal()">&times;</button>
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
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }
};

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize production page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the production page
    if (document.querySelector('.production-summary')) {
        Production.init();
    }
});

// Make Production available globally
window.Production = Production;

console.log('Production JavaScript loaded successfully');