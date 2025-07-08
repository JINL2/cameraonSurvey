// Filter management

// Get current filter values
function getFilterValues() {
    return {
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        rating: document.getElementById('ratingFilter').value,
        boothLocation: document.getElementById('boothFilter').value,
        recommend: document.getElementById('recommendFilter').value,
        searchText: document.getElementById('searchText').value.trim()
    };
}

// Reset all filters
function resetFilters() {
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    document.getElementById('ratingFilter').value = '';
    document.getElementById('boothFilter').value = '';
    document.getElementById('recommendFilter').value = '';
    document.getElementById('searchText').value = '';
    
    // Trigger a new search
    applyFilters();
}

// Apply filters and refresh data
async function applyFilters() {
    const filters = getFilterValues();
    
    // Store filters in session storage
    sessionStorage.setItem('feedbackFilters', JSON.stringify(filters));
    
    // Reset to page 1 when applying filters
    currentPage = 1;
    
    // Close filter panel
    toggleFilterPanel();
    
    // Reload data
    await loadFeedbacks();
    
    showToast(CONFIG.MESSAGES.FILTER_APPLIED, 'success');
}

// Load filters from session storage
function loadSavedFilters() {
    const saved = sessionStorage.getItem('feedbackFilters');
    if (saved) {
        try {
            const filters = JSON.parse(saved);
            
            if (filters.startDate) document.getElementById('startDate').value = filters.startDate;
            if (filters.endDate) document.getElementById('endDate').value = filters.endDate;
            if (filters.rating) document.getElementById('ratingFilter').value = filters.rating;
            if (filters.boothLocation) document.getElementById('boothFilter').value = filters.boothLocation;
            if (filters.recommend) document.getElementById('recommendFilter').value = filters.recommend;
            if (filters.searchText) document.getElementById('searchText').value = filters.searchText;
            
        } catch (error) {
            console.error('Error loading saved filters:', error);
        }
    }
}

// Set up filter event listeners
function initializeFilters() {
    // Filter toggle button
    document.getElementById('filterToggle').addEventListener('click', toggleFilterPanel);
    
    // Apply filters button
    document.getElementById('applyFilters').addEventListener('click', applyFilters);
    
    // Reset filters button
    document.getElementById('resetFilters').addEventListener('click', () => {
        resetFilters();
        showToast(CONFIG.MESSAGES.FILTER_RESET);
    });
    
    // Close filter panel when clicking outside
    document.getElementById('filterPanel').addEventListener('click', (e) => {
        if (e.target.id === 'filterPanel') {
            toggleFilterPanel();
        }
    });
    
    // Enter key in search field
    document.getElementById('searchText').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            applyFilters();
        }
    });
    
    // Load saved filters
    loadSavedFilters();
    
    // Populate booth locations
    populateBoothFilter();
}