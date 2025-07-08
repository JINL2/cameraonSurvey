// UI manipulation functions

// Create star rating display
function createStarRating(rating) {
    const stars = '⭐'.repeat(rating || 0);
    return `<span class="rating-stars" style="color: ${CONFIG.RATING_COLORS[rating] || '#6B7280'}">${stars}</span>`;
}

// Format date
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    return dayjs(dateString).format('MMM DD, YYYY');
}

// Create feedback card HTML
function createFeedbackCard(feedback) {
    const recommendBadge = feedback.would_recommend 
        ? '<span class="recommend-badge recommend-yes">👍 Recommended</span>'
        : '<span class="recommend-badge recommend-no">👎 Not Recommended</span>';
    
    return `
        <div class="feedback-card" data-id="${feedback.id}">
            <div class="feedback-header">
                <span class="feedback-date">${formatDate(feedback.visit_date)}</span>
                <span class="feedback-rating">${createStarRating(feedback.rating)}</span>
            </div>
            <div class="feedback-body">
                <p class="feedback-opinion">${feedback.customer_opinion || 'No comment provided'}</p>
            </div>
            <div class="feedback-footer">
                <span class="feedback-location">📍 ${feedback.booth_location || 'Unknown'}</span>
                ${recommendBadge}
            </div>
        </div>
    `;
}

// Render feedback list
function renderFeedbackList(feedbacks) {
    const listElement = document.getElementById('feedbackList');
    
    if (feedbacks.length === 0) {
        listElement.innerHTML = `
            <div class="empty-state">
                <p>${CONFIG.MESSAGES.NO_DATA}</p>
            </div>
        `;
        return;
    }
    
    listElement.innerHTML = feedbacks.map(feedback => createFeedbackCard(feedback)).join('');
}

// Update summary statistics
function updateStatistics(stats) {
    document.getElementById('totalCount').textContent = stats.total;
    document.getElementById('avgRating').textContent = stats.avgRating;
    document.getElementById('recommendRate').textContent = `${stats.recommendRate}%`;
}

// Update pagination UI
function updatePagination(currentPage, totalPages) {
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');
    
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

// Show loading state
function showLoading() {
    const listElement = document.getElementById('feedbackList');
    listElement.innerHTML = `
        <div class="loading-skeleton">
            ${Array(3).fill(0).map(() => `
                <div class="skeleton-card">
                    <div class="skeleton-line skeleton-line-short"></div>
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line skeleton-line-medium"></div>
                </div>
            `).join('')}
        </div>
    `;
}

// Show error message
function showError(message) {
    const listElement = document.getElementById('feedbackList');
    listElement.innerHTML = `
        <div class="error-state">
            <p>${message || CONFIG.MESSAGES.ERROR}</p>
            <button class="btn btn-primary" onclick="location.reload()">Retry</button>
        </div>
    `;
}

// Toggle filter panel
function toggleFilterPanel() {
    const panel = document.getElementById('filterPanel');
    panel.classList.toggle('active');
    
    // Prevent body scroll when filter is open
    if (panel.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Populate booth location dropdown
async function populateBoothFilter() {
    const locations = await fetchBoothLocations();
    const select = document.getElementById('boothFilter');
    
    // Clear existing options except the first one
    select.innerHTML = '<option value="">All Locations</option>';
    
    // Add location options
    locations.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        select.appendChild(option);
    });
}

// Show toast notification
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add toast styles dynamically
const toastStyles = `
    .toast {
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: var(--gray-800);
        color: white;
        padding: var(--spacing-sm) var(--spacing-lg);
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        z-index: 400;
        transition: transform 0.3s ease;
    }
    
    .toast.show {
        transform: translateX(-50%) translateY(0);
    }
    
    .toast-success {
        background: var(--success);
    }
    
    .toast-error {
        background: var(--danger);
    }
`;

// Inject toast styles
const styleSheet = document.createElement('style');
styleSheet.textContent = toastStyles;
document.head.appendChild(styleSheet);