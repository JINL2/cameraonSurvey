// Main application logic

// Global variables
let currentPage = 1;
let currentFilters = {};
let isLoading = false;

// Load feedbacks with current filters and pagination
async function loadFeedbacks() {
    if (isLoading) return;
    
    isLoading = true;
    showLoading();
    
    try {
        // Get current filters
        currentFilters = getFilterValues();
        
        // Fetch data
        const result = await fetchFeedbacks(currentFilters, currentPage);
        
        // Update UI
        renderFeedbackList(result.data);
        updatePagination(result.currentPage, result.totalPages);
        
        // Update statistics
        const stats = await fetchStatistics(currentFilters);
        updateStatistics(stats);
        
    } catch (error) {
        console.error('Error loading feedbacks:', error);
        showError();
    } finally {
        isLoading = false;
    }
}

// Pagination handlers
function handlePrevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadFeedbacks();
    }
}

function handleNextPage() {
    currentPage++;
    loadFeedbacks();
}

// Initialize pagination
function initializePagination() {
    document.getElementById('prevPage').addEventListener('click', handlePrevPage);
    document.getElementById('nextPage').addEventListener('click', handleNextPage);
}

// Pull to refresh functionality
let touchStartY = 0;
let touchEndY = 0;

function initializePullToRefresh() {
    const feedbackList = document.getElementById('feedbackList');
    
    feedbackList.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });
    
    feedbackList.addEventListener('touchmove', (e) => {
        touchEndY = e.touches[0].clientY;
        
        // If pulling down from the top
        if (window.scrollY === 0 && touchEndY > touchStartY) {
            e.preventDefault();
        }
    });
    
    feedbackList.addEventListener('touchend', () => {
        // If pulled down more than 100px, refresh
        if (window.scrollY === 0 && touchEndY - touchStartY > 100) {
            loadFeedbacks();
            showToast('Refreshing...', 'info');
        }
    });
}

// Mobile optimizations
function initializeMobileOptimizations() {
    // Prevent double-tap zoom
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    });
    
    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Handle viewport height changes (keyboard, etc.)
    function handleViewportChange() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    window.addEventListener('resize', handleViewportChange);
    handleViewportChange();
}

// Service worker for offline support (optional)
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            // Create a simple service worker file if needed
            // await navigator.serviceWorker.register('/sw.js');
            console.log('Service Worker support available');
        } catch (error) {
            console.log('Service Worker registration failed:', error);
        }
    }
}

// Initialize the application
async function initializeApp() {
    try {
        // Test Supabase connection
        const connected = await testConnection();
        if (!connected) {
            showError('Unable to connect to database. Please check your connection.');
            return;
        }
        
        // Initialize all components
        initializeFilters();
        initializePagination();
        initializeDetailView();
        initializePullToRefresh();
        initializeMobileOptimizations();
        
        // Register service worker for PWA
        registerServiceWorker();
        
        // Load initial data
        await loadFeedbacks();
        
    } catch (error) {
        console.error('Application initialization error:', error);
        showError('Failed to initialize application. Please refresh the page.');
    }
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Handle online/offline status
window.addEventListener('online', () => {
    showToast('Connection restored', 'success');
    loadFeedbacks();
});

window.addEventListener('offline', () => {
    showToast('No internet connection', 'error');
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + F to open filters
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        toggleFilterPanel();
    }
    
    // Left/Right arrow keys for pagination
    if (e.key === 'ArrowLeft' && !document.getElementById('filterPanel').classList.contains('active')) {
        handlePrevPage();
    } else if (e.key === 'ArrowRight' && !document.getElementById('filterPanel').classList.contains('active')) {
        handleNextPage();
    }
});

// Performance monitoring
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            console.log(`${entry.name}: ${entry.duration}ms`);
        }
    });
    
    perfObserver.observe({ entryTypes: ['measure'] });
}

// Log app version
console.log('Customer Feedback Management System v1.0.0');
console.log('Last updated: January 9, 2025');