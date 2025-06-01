// Inventory Management JavaScript Functions

// Inventory-specific functions
function scrollToLowStock() {
    document.querySelector('.materials-grid').scrollIntoView({ behavior: 'smooth' });
}

function addNewMaterial() {
    const modal = document.getElementById('add-material-modal');
    modal.style.display = 'flex';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

function addMaterial(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const materialData = Object.fromEntries(formData.entries());
    
    console.log('Adding new material:', materialData);
    showSuccess('Material added successfully!');
    closeModal('add-material-modal');
    event.target.reset();
}

function createPurchaseOrder(materialCode) {
    console.log('Creating purchase order for:', materialCode);
    showSuccess(`Purchase order created for ${materialCode}`);
}

function viewMaterialHistory(materialCode) {
    console.log('Viewing history for:', materialCode);
    showSuccess(`Loading history for ${materialCode}`);
}

function adjustStock(materialCode) {
    console.log('Adjusting stock for:', materialCode);
    showSuccess(`Stock adjustment initiated for ${materialCode}`);
}

function generateReorderReport() {
    const reorderData = [
        { material: 'Premium Leather', currentStock: 15, reorderPoint: 25, suggestedOrder: 50, supplier: 'Premium Leather Co.' },
        { material: 'Canvas Fabric', currentStock: 35, reorderPoint: 30, suggestedOrder: 60, supplier: 'Textile Masters Inc.' }
    ];
    
    exportToCSV(reorderData, 'reorder_report.csv');
}

function manageSuppliers() {
    showSuccess('Supplier management module opening...');
}

function exportMovements() {
    const movementData = [
        { date: '2025-05-30', material: 'Premium Leather', type: 'OUT', quantity: -12, reference: 'PO-2025-089' },
        { date: '2025-05-29', material: 'Canvas Fabric', type: 'IN', quantity: 50, reference: 'REC-2025-156' },
        { date: '2025-05-28', material: 'Metal Hardware', type: 'OUT', quantity: -25, reference: 'PO-2025-087' }
    ];
    
    exportToCSV(movementData, 'stock_movements.csv');
}

function generateValuationReport() {
    const valuationData = [
        { material: 'Premium Leather', quantity: 15, unit: 'sq.m', unitCost: 850, totalValue: 12750 },
        { material: 'Canvas Fabric', quantity: 35, unit: 'yards', unitCost: 320, totalValue: 11200 },
        { material: 'Metal Hardware', quantity: 178, unit: 'pieces', unitCost: 45, totalValue: 8010 },
        { material: 'Gift Packaging', quantity: 92, unit: 'boxes', unitCost: 25, totalValue: 2300 }
    ];
    
    exportToExcel(valuationData, 'inventory_valuation_report');
}

// Inventory-specific initialization
function initInventoryPage() {
    console.log('Inventory page initialized');
    
    // Set up modal close functionality
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal-overlay')) {
            event.target.style.display = 'none';
        }
    });
    
    // Simulate real-time inventory updates
    setInterval(updateInventoryData, 30000); // Update every 30 seconds
}

// Simulate real-time inventory updates
function updateInventoryData() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        if (Math.random() > 0.95) {
            // Add a subtle animation to indicate data refresh
            bar.style.transform = 'scaleX(1.02)';
            setTimeout(() => {
                bar.style.transform = 'scaleX(1)';
            }, 200);
        }
    });
    
    // Occasionally show a data update notification
    if (Math.random() > 0.8) {
        console.log('Inventory data updated');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.inventory-dashboard')) {
        initInventoryPage();
    }
});