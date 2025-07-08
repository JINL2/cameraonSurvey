// Detail view functionality

// Show detail modal
async function showDetailModal(feedbackId) {
    const modal = document.getElementById('detailModal');
    const modalBody = document.getElementById('modalBody');
    
    // Show modal with loading state
    modal.classList.add('active');
    modalBody.innerHTML = '<div class="loading-spinner"></div>';
    
    try {
        // Fetch full feedback data
        const feedback = await fetchFeedbackById(feedbackId);
        
        // Create detail content
        const detailContent = createDetailContent(feedback);
        modalBody.innerHTML = detailContent;
        
        // Load images
        loadDetailImages(feedback);
        
    } catch (error) {
        console.error('Error loading feedback details:', error);
        modalBody.innerHTML = '<p class="error-message">Error loading details. Please try again.</p>';
    }
}

// Create detail content HTML
function createDetailContent(feedback) {
    const positiveAspects = feedback.positive_feedback?.aspects || [];
    const negativeCode = feedback.negative_feedback?.code || '';
    const negativeText = feedback.negative_feedback?.other_text || '';
    
    return `
        <div class="detail-content">
            <!-- Image Comparison -->
            <div class="image-comparison">
                <div class="image-container">
                    <div class="image-label">Physical Photo</div>
                    <div id="physicalPhoto" class="image-placeholder">
                        <span>Loading...</span>
                    </div>
                </div>
                <div class="image-container">
                    <div class="image-label">Digital Backup</div>
                    <div id="digitalPhoto" class="image-placeholder">
                        <span>Loading...</span>
                    </div>
                </div>
            </div>
            
            <!-- Basic Information -->
            <div class="detail-section">
                <h4>Basic Information</h4>
                <div class="detail-info-grid">
                    <div class="info-item">
                        <span class="info-label">Visit Date:</span>
                        <span class="info-value">${formatDate(feedback.visit_date)}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Location:</span>
                        <span class="info-value">${feedback.booth_location || 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Rating:</span>
                        <span class="info-value">${createStarRating(feedback.rating)}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Recommendation:</span>
                        <span class="info-value">
                            ${feedback.would_recommend 
                                ? '<span class="text-success">👍 Yes</span>' 
                                : '<span class="text-danger">👎 No</span>'}
                        </span>
                    </div>
                </div>
            </div>
            
            <!-- Customer Opinion -->
            <div class="detail-section">
                <h4>Customer Opinion</h4>
                <p>${feedback.customer_opinion || 'No opinion provided'}</p>
            </div>
            
            <!-- Positive Feedback -->
            ${positiveAspects.length > 0 ? `
                <div class="detail-section">
                    <h4>Positive Aspects</h4>
                    <ul class="aspect-list">
                        ${positiveAspects.map(aspect => `<li>${aspect}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            <!-- Negative Feedback -->
            ${(negativeCode || negativeText) ? `
                <div class="detail-section">
                    <h4>Areas for Improvement</h4>
                    ${negativeCode ? `<p><strong>Type:</strong> ${negativeCode}</p>` : ''}
                    ${negativeText ? `<p>${negativeText}</p>` : ''}
                </div>
            ` : ''}
            
            <!-- Promotion Code -->
            ${feedback.promotion_code_used ? `
                <div class="detail-section">
                    <h4>Promotion Code</h4>
                    <p class="promo-code">${feedback.promotion_code_used}</p>
                </div>
            ` : ''}
            
            <!-- Metadata -->
            <div class="detail-section">
                <h4>Additional Information</h4>
                <p class="text-muted">Created: ${formatDate(feedback.created_at)}</p>
                <p class="text-muted">ID: ${feedback.id}</p>
            </div>
        </div>
    `;
}

// Load images with error handling
function loadDetailImages(feedback) {
    // Load physical photo
    if (feedback.physical_photo_url) {
        loadImage(feedback.physical_photo_url, 'physicalPhoto');
    } else {
        document.getElementById('physicalPhoto').innerHTML = '<span>No physical photo</span>';
    }
    
    // Load digital backup
    if (feedback.digital_photo_storage_link) {
        loadImage(feedback.digital_photo_storage_link, 'digitalPhoto');
    } else {
        document.getElementById('digitalPhoto').innerHTML = '<span>No digital backup</span>';
    }
}

// Load single image with error handling
function loadImage(url, containerId) {
    const container = document.getElementById(containerId);
    const img = new Image();
    
    img.onload = function() {
        container.innerHTML = '';
        img.className = 'feedback-image';
        container.appendChild(img);
    };
    
    img.onerror = function() {
        container.innerHTML = `<span>${CONFIG.MESSAGES.IMAGE_LOAD_ERROR}</span>`;
    };
    
    img.src = url;
}

// Close detail modal
function closeDetailModal() {
    const modal = document.getElementById('detailModal');
    modal.classList.remove('active');
}

// Initialize detail view
function initializeDetailView() {
    // Close button
    document.getElementById('closeModal').addEventListener('click', closeDetailModal);
    
    // Click outside to close
    document.getElementById('detailModal').addEventListener('click', (e) => {
        if (e.target.id === 'detailModal') {
            closeDetailModal();
        }
    });
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeDetailModal();
        }
    });
    
    // Click on feedback cards
    document.getElementById('feedbackList').addEventListener('click', (e) => {
        const card = e.target.closest('.feedback-card');
        if (card) {
            const feedbackId = card.dataset.id;
            showDetailModal(feedbackId);
        }
    });
}

// Add detail view specific styles
const detailStyles = `
    .detail-info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-sm);
    }
    
    .info-item {
        display: flex;
        flex-direction: column;
    }
    
    .info-label {
        font-size: 0.75rem;
        color: var(--gray-600);
        margin-bottom: 0.125rem;
    }
    
    .info-value {
        font-size: 0.875rem;
        font-weight: 500;
    }
    
    .aspect-list {
        margin-left: var(--spacing-md);
        color: var(--gray-700);
        font-size: 0.875rem;
    }
    
    .aspect-list li {
        margin-bottom: var(--spacing-xs);
    }
    
    .promo-code {
        font-family: monospace;
        background: var(--gray-100);
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: var(--radius-sm);
        display: inline-block;
    }
    
    .text-success {
        color: var(--success);
    }
    
    .text-danger {
        color: var(--danger);
    }
    
    .text-muted {
        color: var(--gray-600);
        font-size: 0.75rem;
    }
    
    .error-message {
        text-align: center;
        color: var(--danger);
        padding: var(--spacing-xl);
    }
    
    @media (max-width: 640px) {
        .detail-info-grid {
            grid-template-columns: 1fr;
        }
    }
`;

// Inject detail styles
const detailStyleSheet = document.createElement('style');
detailStyleSheet.textContent = detailStyles;
document.head.appendChild(detailStyleSheet);