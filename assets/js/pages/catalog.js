// Bag Catalog JavaScript - Handles all catalog functionality

// Catalog state
let catalogState = {
    products: [],
    filteredProducts: [],
    currentView: 'grid',
    currentPage: 1,
    itemsPerPage: 12,
    searchTerm: '',
    filters: {
        category: '',
        status: '',
        price: ''
    },
    editingProduct: null
};

// Sample product data
const sampleProducts = [
    {
        id: 1,
        name: 'Classic Leather Tote',
        category: 'handbags',
        price: 450,
        stock: 25,
        status: 'active',
        description: 'Elegant and spacious tote bag crafted from premium genuine leather. Perfect for work and everyday use.',
        material: 'Genuine Leather',
        colors: 'Black, Brown, Tan',
        dimensions: '35cm x 30cm x 15cm',
        weight: 0.8,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
    },
    {
        id: 2,
        name: 'Executive Briefcase',
        category: 'briefcases',
        price: 750,
        stock: 12,
        status: 'active',
        description: 'Professional leather briefcase with multiple compartments and secure locking mechanism.',
        material: 'Full Grain Leather',
        colors: 'Black, Dark Brown',
        dimensions: '40cm x 30cm x 10cm',
        weight: 1.2,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        name: 'Urban Backpack',
        category: 'backpacks',
        price: 320,
        stock: 18,
        status: 'active',
        description: 'Modern urban backpack with laptop compartment and water-resistant coating.',
        material: 'Canvas with Leather Trim',
        colors: 'Navy, Charcoal, Olive',
        dimensions: '45cm x 32cm x 20cm',
        weight: 1.1,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
    },
    {
        id: 4,
        name: 'Evening Clutch',
        category: 'clutches',
        price: 180,
        stock: 8,
        status: 'active',
        description: 'Sophisticated evening clutch with gold-tone hardware and chain strap.',
        material: 'Satin with Leather Interior',
        colors: 'Black, Gold, Silver, Red',
        dimensions: '25cm x 15cm x 5cm',
        weight: 0.3,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
    },
    {
        id: 5,
        name: 'Crossbody Messenger',
        category: 'handbags',
        price: 380,
        stock: 22,
        status: 'active',
        description: 'Versatile crossbody messenger bag with adjustable strap and multiple pockets.',
        material: 'Vegan Leather',
        colors: 'Black, Brown, Burgundy',
        dimensions: '30cm x 22cm x 8cm',
        weight: 0.6,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
    },
    {
        id: 6,
        name: 'Travel Duffle',
        category: 'accessories',
        price: 520,
        stock: 0,
        status: 'out-of-stock',
        description: 'Large capacity travel duffle bag with reinforced handles and shoulder strap.',
        material: 'Heavy Canvas',
        colors: 'Khaki, Navy, Black',
        dimensions: '60cm x 30cm x 30cm',
        weight: 1.8,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
    },
    {
        id: 7,
        name: 'Mini Coin Purse',
        category: 'accessories',
        price: 85,
        stock: 45,
        status: 'active',
        description: 'Compact coin purse with zipper closure and keychain attachment.',
        material: 'Soft Leather',
        colors: 'Black, Brown, Pink, Blue',
        dimensions: '12cm x 8cm x 3cm',
        weight: 0.1,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
    },
    {
        id: 8,
        name: 'Laptop Bag Pro',
        category: 'briefcases',
        price: 680,
        stock: 6,
        status: 'active',
        description: 'Professional laptop bag with padded compartments and weather protection.',
        material: 'Ballistic Nylon',
        colors: 'Black, Gray',
        dimensions: '42cm x 32cm x 12cm',
        weight: 1.4,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
    },
    {
        id: 9,
        name: 'Vintage Satchel',
        category: 'handbags',
        price: 420,
        stock: 3,
        status: 'active',
        description: 'Classic vintage-style satchel with brass hardware and magnetic closure.',
        material: 'Distressed Leather',
        colors: 'Cognac, Dark Brown',
        dimensions: '32cm x 25cm x 12cm',
        weight: 0.9,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
    },
    {
        id: 10,
        name: 'Sport Gym Bag',
        category: 'accessories',
        price: 290,
        stock: 15,
        status: 'active',
        description: 'Durable gym bag with separate shoe compartment and water bottle holder.',
        material: 'Polyester with Vinyl Bottom',
        colors: 'Black, Red, Blue, Gray',
        dimensions: '50cm x 25cm x 25cm',
        weight: 0.7,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
    },
    {
        id: 11,
        name: 'Designer Shoulder Bag',
        category: 'handbags',
        price: 890,
        stock: 4,
        status: 'active',
        description: 'Luxury designer shoulder bag with signature hardware and premium finish.',
        material: 'Italian Leather',
        colors: 'Black, Cream, Burgundy',
        dimensions: '28cm x 20cm x 10cm',
        weight: 0.6,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
    },
    {
        id: 12,
        name: 'Casual Day Pack',
        category: 'backpacks',
        price: 250,
        stock: 28,
        status: 'active',
        description: 'Lightweight casual backpack perfect for daily use and short trips.',
        material: 'Ripstop Nylon',
        colors: 'Navy, Gray, Green, Purple',
        dimensions: '40cm x 28cm x 18cm',
        weight: 0.8,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
    }
];

// Initialize catalog when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('products-grid')) {
        initializeCatalog();
    }
});

function initializeCatalog() {
    console.log('Initializing Bag Catalog...');
    
    // Load sample data
    catalogState.products = [...sampleProducts];
    catalogState.filteredProducts = [...sampleProducts];
    
    // Render initial view
    renderProducts();
    updateStats();
    setupEventListeners();
    
    console.log('Catalog initialized successfully');
}

function setupEventListeners() {
    // Form submission
    const productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', handleProductSubmit);
    }
    
    // Search input
    const searchInput = document.getElementById('product-search');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(filterProducts, 300));
    }
    
    // Close modal on overlay click
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            closeProductModal();
            closeProductDetailsModal();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProductModal();
            closeProductDetailsModal();
        }
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            showAddProductModal();
        }
    });
}

// Debounce function for search
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

// Filter and search products
function filterProducts() {
    const searchTerm = document.getElementById('product-search').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;
    const statusFilter = document.getElementById('status-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    
    catalogState.searchTerm = searchTerm;
    catalogState.filters = {
        category: categoryFilter,
        status: statusFilter,
        price: priceFilter
    };
    
    catalogState.filteredProducts = catalogState.products.filter(product => {
        // Search filter
        const matchesSearch = !searchTerm || 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.material.toLowerCase().includes(searchTerm);
        
        // Category filter
        const matchesCategory = !categoryFilter || product.category === categoryFilter;
        
        // Status filter
        const matchesStatus = !statusFilter || product.status === statusFilter;
        
        // Price filter
        let matchesPrice = true;
        if (priceFilter) {
            const price = product.price;
            switch (priceFilter) {
                case '0-300':
                    matchesPrice = price <= 300;
                    break;
                case '300-600':
                    matchesPrice = price > 300 && price <= 600;
                    break;
                case '600-1000':
                    matchesPrice = price > 600 && price <= 1000;
                    break;
                case '1000+':
                    matchesPrice = price > 1000;
                    break;
            }
        }
        
        return matchesSearch && matchesCategory && matchesStatus && matchesPrice;
    });
    
    catalogState.currentPage = 1;
    renderProducts();
    updateStats();
}

// Clear all filters
function clearFilters() {
    document.getElementById('product-search').value = '';
    document.getElementById('category-filter').value = '';
    document.getElementById('status-filter').value = '';
    document.getElementById('price-filter').value = '';
    
    catalogState.searchTerm = '';
    catalogState.filters = { category: '', status: '', price: '' };
    catalogState.filteredProducts = [...catalogState.products];
    catalogState.currentPage = 1;
    
    renderProducts();
    updateStats();
}

// Switch between grid and list view
function switchView(view) {
    catalogState.currentView = view;
    
    // Update view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${view}"]`).classList.add('active');
    
    // Show/hide views
    const gridView = document.getElementById('products-grid');
    const listView = document.getElementById('products-list');
    
    if (view === 'grid') {
        gridView.style.display = 'grid';
        listView.style.display = 'none';
    } else {
        gridView.style.display = 'none';
        listView.style.display = 'block';
    }
    
    renderProducts();
}

// Render products based on current view
function renderProducts() {
    if (catalogState.currentView === 'grid') {
        renderGridView();
    } else {
        renderListView();
    }
    renderPagination();
}

// Render grid view
function renderGridView() {
    const container = document.getElementById('products-grid');
    const startIndex = (catalogState.currentPage - 1) * catalogState.itemsPerPage;
    const endIndex = startIndex + catalogState.itemsPerPage;
    const pageProducts = catalogState.filteredProducts.slice(startIndex, endIndex);
    
    if (pageProducts.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-state-icon">🛍️</div>
                <h3>No products found</h3>
                <p>Try adjusting your search criteria or filters.</p>
                <button class="btn btn-primary" onclick="clearFilters()">Clear Filters</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = pageProducts.map(product => `
        <div class="product-card" onclick="showProductDetails(${product.id})">
            <div class="product-image">
                ${product.image ? 
                    `<img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                     <div class="placeholder-icon" style="display: none;">🛍️</div>` :
                    `<div class="placeholder-icon">🛍️</div>`
                }
                <div class="stock-badge ${getStockBadgeClass(product)}">
                    ${getStockBadgeText(product)}
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${formatCategory(product.category)}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">₱${product.price.toLocaleString()}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-specs">
                    <span>📦 ${product.stock} in stock</span>
                    <span>🏷️ ${product.material}</span>
                </div>
                <div class="product-actions" onclick="event.stopPropagation()">
                    <button class="action-btn primary" onclick="showProductDetails(${product.id})">
                        👁️ View
                    </button>
                    <button class="action-btn" onclick="editProduct(${product.id})">
                        ✏️ Edit
                    </button>
                    <button class="action-btn danger" onclick="deleteProduct(${product.id})">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Render list view
function renderListView() {
    const tbody = document.getElementById('products-table-body');
    const startIndex = (catalogState.currentPage - 1) * catalogState.itemsPerPage;
    const endIndex = startIndex + catalogState.itemsPerPage;
    const pageProducts = catalogState.filteredProducts.slice(startIndex, endIndex);
    
    if (pageProducts.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px;">
                    <div class="empty-state-icon">🛍️</div>
                    <h3>No products found</h3>
                    <p>Try adjusting your search criteria or filters.</p>
                    <button class="btn btn-primary" onclick="clearFilters()">Clear Filters</button>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = pageProducts.map(product => `
        <tr onclick="showProductDetails(${product.id})" style="cursor: pointer;">
            <td>
                <div class="product-image-small">
                    ${product.image ? 
                        `<img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                         <div class="placeholder-icon" style="display: none;">🛍️</div>` :
                        `<div class="placeholder-icon">🛍️</div>`
                    }
                </div>
            </td>
            <td>
                <div class="product-name">${product.name}</div>
            </td>
            <td>
                <div class="product-category">${formatCategory(product.category)}</div>
            </td>
            <td>₱${product.price.toLocaleString()}</td>
            <td>
                <div class="stock-info">
                    <span class="stock-number">${product.stock}</span>
                    <div class="stock-badge ${getStockBadgeClass(product)}">
                        ${getStockBadgeText(product)}
                    </div>
                </div>
            </td>
            <td>
                <div class="status-badge status-${product.status}">
                    ${formatStatus(product.status)}
                </div>
            </td>
            <td onclick="event.stopPropagation()">
                <div class="actions-group">
                    <button class="action-btn primary" onclick="showProductDetails(${product.id})">👁️</button>
                    <button class="action-btn" onclick="editProduct(${product.id})">✏️</button>
                    <button class="action-btn danger" onclick="deleteProduct(${product.id})">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Pagination
function renderPagination() {
    const totalPages = Math.ceil(catalogState.filteredProducts.length / catalogState.itemsPerPage);
    const currentPage = catalogState.currentPage;
    
    // Update pagination info
    const startItem = (currentPage - 1) * catalogState.itemsPerPage + 1;
    const endItem = Math.min(currentPage * catalogState.itemsPerPage, catalogState.filteredProducts.length);
    
    document.getElementById('showing-count').textContent = `${startItem}-${endItem}`;
    document.getElementById('total-count').textContent = catalogState.filteredProducts.length;
    
    // Update pagination controls
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const numbersContainer = document.getElementById('pagination-numbers');
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    
    // Generate page numbers
    let paginationHTML = '';
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button onclick="goToPage(${i})" class="${i === currentPage ? 'active' : ''}">
                ${i}
            </button>
        `;
    }
    
    numbersContainer.innerHTML = paginationHTML;
}

function previousPage() {
    if (catalogState.currentPage > 1) {
        catalogState.currentPage--;
        renderProducts();
    }
}

function nextPage() {
    const totalPages = Math.ceil(catalogState.filteredProducts.length / catalogState.itemsPerPage);
    if (catalogState.currentPage < totalPages) {
        catalogState.currentPage++;
        renderProducts();
    }
}

function goToPage(page) {
    catalogState.currentPage = page;
    renderProducts();
}

// Update statistics
function updateStats() {
    const totalProducts = catalogState.products.length;
    const activeProducts = catalogState.products.filter(p => p.status === 'active').length;
    const outOfStock = catalogState.products.filter(p => p.status === 'out-of-stock' || p.stock === 0).length;
    
    document.getElementById('total-products').textContent = totalProducts;
    document.getElementById('active-products').textContent = activeProducts;
    document.getElementById('out-of-stock').textContent = outOfStock;
}

// Utility functions
function getStockBadgeClass(product) {
    if (product.status === 'out-of-stock' || product.stock === 0) return 'out-of-stock';
    if (product.stock <= 5) return 'low-stock';
    return 'in-stock';
}

function getStockBadgeText(product) {
    if (product.status === 'out-of-stock' || product.stock === 0) return 'Out of Stock';
    if (product.stock <= 5) return 'Low Stock';
    return 'In Stock';
}

function formatCategory(category) {
    return category.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function formatStatus(status) {
    return status.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Product management functions
function showAddProductModal() {
    catalogState.editingProduct = null;
    
    document.getElementById('modal-title').textContent = 'Add New Product';
    document.getElementById('product-form').reset();
    document.getElementById('product-modal').style.display = 'flex';
    
    // Focus on first input
    setTimeout(() => {
        document.getElementById('product-name').focus();
    }, 100);
}

function editProduct(productId) {
    const product = catalogState.products.find(p => p.id === productId);
    if (!product) return;
    
    catalogState.editingProduct = product;
    
    document.getElementById('modal-title').textContent = 'Edit Product';
    
    // Populate form
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-stock').value = product.stock;
    document.getElementById('product-material').value = product.material;
    document.getElementById('product-color').value = product.colors;
    document.getElementById('product-dimensions').value = product.dimensions;
    document.getElementById('product-weight').value = product.weight;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-image').value = product.image || '';
    document.getElementById('product-status').value = product.status;
    
    document.getElementById('product-modal').style.display = 'flex';
}

function handleProductSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const productData = {
        name: formData.get('name'),
        category: formData.get('category'),
        price: parseFloat(formData.get('price')),
        stock: parseInt(formData.get('stock')),
        material: formData.get('material'),
        colors: formData.get('colors'),
        dimensions: formData.get('dimensions'),
        weight: parseFloat(formData.get('weight')),
        description: formData.get('description'),
        image: formData.get('image'),
        status: formData.get('status')
    };
    
    if (catalogState.editingProduct) {
        // Update existing product
        const index = catalogState.products.findIndex(p => p.id === catalogState.editingProduct.id);
        catalogState.products[index] = { ...catalogState.editingProduct, ...productData };
        showSuccess('Product updated successfully!');
    } else {
        // Add new product
        const newProduct = {
            id: Math.max(...catalogState.products.map(p => p.id)) + 1,
            ...productData
        };
        catalogState.products.push(newProduct);
        showSuccess('Product added successfully!');
    }
    
    // Update filtered products and re-render
    filterProducts();
    updateStats();
    closeProductModal();
}

function deleteProduct(productId) {
    const product = catalogState.products.find(p => p.id === productId);
    if (!product) return;
    
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
        catalogState.products = catalogState.products.filter(p => p.id !== productId);
        filterProducts();
        updateStats();
        showSuccess('Product deleted successfully!');
    }
}

function closeProductModal() {
    document.getElementById('product-modal').style.display = 'none';
    catalogState.editingProduct = null;
}

// Product details modal
function showProductDetails(productId) {
    const product = catalogState.products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('product-details-modal');
    const content = document.getElementById('product-details-content');
    
    content.innerHTML = `
        <div class="product-details-grid">
            <div class="product-details-image">
                ${product.image ? 
                    `<img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                     <div class="placeholder-icon" style="display: none; font-size: 64px; color: #cbd5e0;">🛍️</div>` :
                    `<div class="placeholder-icon" style="font-size: 64px; color: #cbd5e0;">🛍️</div>`
                }
            </div>
            <div class="product-details-info">
                <h4>${product.name}</h4>
                <div class="category">${formatCategory(product.category)}</div>
                <div class="price">₱${product.price.toLocaleString()}</div>
                <div class="description">${product.description}</div>
                
                <div class="product-specs-grid">
                    <div class="spec-item">
                        <span class="spec-label">Material:</span>
                        <span class="spec-value">${product.material}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Colors:</span>
                        <span class="spec-value">${product.colors}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Dimensions:</span>
                        <span class="spec-value">${product.dimensions}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Weight:</span>
                        <span class="spec-value">${product.weight}kg</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Stock:</span>
                        <span class="spec-value">${product.stock} units</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Status:</span>
                        <span class="spec-value">
                            <div class="status-badge status-${product.status}">
                                ${formatStatus(product.status)}
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Store current product for editing
    modal.dataset.productId = productId;
    modal.style.display = 'flex';
}

function editProductFromDetails() {
    const modal = document.getElementById('product-details-modal');
    const productId = parseInt(modal.dataset.productId);
    closeProductDetailsModal();
    editProduct(productId);
}

function closeProductDetailsModal() {
    document.getElementById('product-details-modal').style.display = 'none';
}

// Export functionality
function exportCatalog() {
    const csvData = catalogState.products.map(product => ({
        ID: product.id,
        Name: product.name,
        Category: formatCategory(product.category),
        Price: product.price,
        Stock: product.stock,
        Status: formatStatus(product.status),
        Material: product.material,
        Colors: product.colors,
        Dimensions: product.dimensions,
        Weight: product.weight,
        Description: product.description
    }));
    
    exportToCSV(csvData, 'bag_catalog_export.csv');
}

// Make functions globally available for HTML onclick handlers
window.filterProducts = filterProducts;
window.clearFilters = clearFilters;
window.switchView = switchView;
window.showAddProductModal = showAddProductModal;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.closeProductModal = closeProductModal;
window.showProductDetails = showProductDetails;
window.editProductFromDetails = editProductFromDetails;
window.closeProductDetailsModal = closeProductDetailsModal;
window.exportCatalog = exportCatalog;
window.previousPage = previousPage;
window.nextPage = nextPage;
window.goToPage = goToPage;

console.log('Catalog JavaScript loaded successfully');