# 📱 Customer Feedback Management System - Development Plan

## 🎯 Project Overview
A mobile-optimized management dashboard for viewing and analyzing customer feedback data from Supabase.

## 🏗️ Development Phases

### Phase 1: Supabase Connection & Data Fetching
**Objective**: Establish secure connection and verify data retrieval

#### Tasks:
1. **Environment Setup**
   - Create `.env` file for API credentials
   - Set up CORS configuration
   - Test connection with simple query

2. **Data Service Layer**
   ```javascript
   // Core functions to implement:
   - fetchAllFeedbacks(filters)
   - fetchFeedbackById(id)
   - fetchBoothStatistics()
   - fetchRatingDistribution()
   ```

3. **Error Handling**
   - Connection timeout management
   - Graceful error messages
   - Retry logic for failed requests

### Phase 2: Data Organization & Presentation
**Objective**: Create intuitive data display for managers

#### Main View Components:
1. **Feedback Table**
   - Sortable columns: Date, Rating, Location, Recommendation
   - Pagination (20 items per page)
   - Quick stats summary at top

2. **Filter Panel**
   ```
   Filters to implement:
   - Date range picker
   - Rating selector (1-5 stars)
   - Booth location dropdown
   - Recommendation toggle (Yes/No/All)
   - Text search for opinions
   ```

3. **Data Cards Layout**
   - Compact view for mobile
   - Key info visible without scrolling
   - Color coding for ratings (red/yellow/green)

### Phase 3: Detail View with Image Comparison
**Objective**: Enable quick photo comparison for quality control

#### Features:
1. **Modal/Slide Panel Design**
   - Opens from main list
   - Swipe gestures for mobile
   - Close button always visible

2. **Image Display**
   ```
   Two-column layout:
   - Left: Physical photo (physical_photo_url)
   - Right: Digital backup (digital_photo_storage_link)
   - Pinch to zoom functionality
   - Loading placeholders
   ```

3. **Feedback Details**
   - Customer opinion (expandable)
   - Positive/Negative feedback breakdown
   - Promotion code used (if any)

### Phase 4: Mobile Optimization
**Objective**: Perfect experience on smartphones

#### Key Optimizations:
1. **Responsive Design**
   - Mobile-first CSS approach
   - Touch-friendly buttons (min 44px)
   - Swipe gestures for navigation

2. **Performance**
   - Lazy loading for images
   - Virtual scrolling for long lists
   - Progressive Web App setup
   - Offline caching for viewed data

3. **UI/UX Enhancements**
   - Sticky headers while scrolling
   - Pull-to-refresh functionality
   - Loading skeletons
   - Haptic feedback on actions

## 📁 File Structure
```
listen_customers_data_management/
├── index.html          # Main dashboard
├── detail.html        # Detail view (if separate page)
├── css/
│   ├── main.css       # Core styles
│   └── mobile.css     # Mobile-specific overrides
├── js/
│   ├── config.js      # Configuration & constants
│   ├── supabase.js    # Supabase client setup
│   ├── api.js         # Data fetching functions
│   ├── ui.js          # UI manipulation
│   ├── filters.js     # Filter logic
│   └── detail.js      # Detail view handlers
├── images/
│   └── placeholder.jpg # Loading placeholder
└── .env.example       # Environment variables template
```

## 🎨 UI Design Specifications

### Color Scheme
- **5 stars**: #10B981 (green)
- **4 stars**: #84CC16 (lime)
- **3 stars**: #EAB308 (yellow)
- **2 stars**: #F97316 (orange)
- **1 star**: #EF4444 (red)
- **Recommend**: #3B82F6 (blue)
- **Not Recommend**: #6B7280 (gray)

### Mobile Layout
```
┌─────────────────────┐
│   Filter Toggle  ⚙️ │
├─────────────────────┤
│  Summary Stats      │
│  ⭐ 4.5 | 📍 2 Booths│
├─────────────────────┤
│  Feedback Card 1    │
│  ⭐⭐⭐⭐⭐ | 👍 Yes    │
│  [View Details →]   │
├─────────────────────┤
│  Feedback Card 2    │
│  ⭐⭐⭐ | 👎 No        │
│  [View Details →]   │
└─────────────────────┘
```

## 🔧 Technical Stack
- **Frontend**: Vanilla JavaScript (no framework for simplicity)
- **CSS**: Mobile-first responsive design
- **Supabase**: Client-side SDK
- **Libraries**:
  - Day.js for date handling
  - Swiper.js for image carousel (optional)
  - Chart.js for statistics (future enhancement)

## 📊 Key Features Priority

### Must Have (MVP)
1. ✅ View all feedbacks with pagination
2. ✅ Filter by date, rating, location, recommendation
3. ✅ View feedback details with photos
4. ✅ Mobile-responsive design
5. ✅ English interface

### Nice to Have (Phase 2)
1. 📊 Statistics dashboard
2. 📥 Export to Excel
3. 🔔 Real-time updates
4. 📸 Bulk photo download
5. 🌐 Multi-language support

## 🚀 Implementation Timeline

### Week 1: Foundation
- Day 1-2: Supabase connection & basic data fetching
- Day 3-4: Main list view with pagination
- Day 5: Basic filtering functionality

### Week 2: Enhancement
- Day 6-7: Detail view with image display
- Day 8-9: Mobile optimization & testing
- Day 10: Bug fixes & performance tuning

## 📝 API Endpoints Needed

```javascript
// Main data fetch
GET /rest/v1/customer_feedbacks?select=*&order=created_at.desc

// With filters
GET /rest/v1/customer_feedbacks?select=*
  &visit_date=gte.2025-06-01
  &visit_date=lte.2025-06-30
  &rating=eq.5
  &booth_location=eq.Nhat%20Chieu

// Single feedback
GET /rest/v1/customer_feedbacks?id=eq.{uuid}

// Statistics
GET /rest/v1/rpc/get_feedback_statistics
```

## 🔒 Security Considerations
1. API key in environment variables only
2. Read-only access for dashboard
3. No customer personal data displayed
4. Image URLs expire - handle gracefully
5. HTTPS enforced

## 📱 Mobile Testing Checklist
- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] iPad landscape/portrait
- [ ] Slow 3G connection
- [ ] Offline behavior
- [ ] Touch gestures
- [ ] Screen reader compatibility

## 🎯 Success Metrics
1. Page load time < 3 seconds on 4G
2. Smooth scrolling on lists > 100 items
3. Images load within 2 seconds
4. All features accessible with thumb reach
5. Zero horizontal scrolling required

---

**Created**: January 9, 2025
**Status**: Ready for implementation
**Priority**: High
