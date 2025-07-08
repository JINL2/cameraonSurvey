# Customer Feedback Management System

A mobile-optimized dashboard for managing customer feedback data from Supabase.

## Features

### 📱 Mobile-First Design
- Responsive layout optimized for smartphones
- Touch-friendly interface with minimum 44px tap targets
- Swipe gestures and pull-to-refresh
- Works offline with cached data

### 🔍 Advanced Filtering
- Date range selection
- Rating filter (1-5 stars)
- Booth location filter
- Recommendation status (Yes/No)
- Text search in customer opinions

### 📊 Real-time Statistics
- Total feedback count
- Average rating calculation
- Recommendation rate percentage

### 🖼️ Image Comparison
- Side-by-side view of physical and digital photos
- Automatic image loading with error handling
- Pinch-to-zoom on mobile devices

### 📄 Detailed View
- Complete feedback information
- Positive and negative aspects breakdown
- Promotion code tracking
- Creation timestamp and metadata

## Quick Start

1. Open `index.html` in a web browser
2. The dashboard will automatically connect to Supabase
3. Use the filter button to refine results
4. Tap on any feedback card to view details

## Browser Support

- iOS Safari 12+
- Chrome for Android 80+
- Modern desktop browsers (Chrome, Firefox, Safari, Edge)

## Performance

- Initial load: < 3 seconds on 4G
- Smooth scrolling with 100+ items
- Lazy loading for images
- Optimized for low-end devices

## Security

- Read-only access to database
- API keys should be stored securely
- No personal customer data displayed
- HTTPS recommended for production

## Keyboard Shortcuts

- `Ctrl/Cmd + F`: Open filter panel
- `Esc`: Close modals
- `←/→`: Navigate pages

## Troubleshooting

### Connection Issues
- Check internet connection
- Verify Supabase API keys
- Ensure CORS is properly configured

### Image Loading
- Physical photos may expire
- Digital backups are permanent
- Check Supabase storage permissions

### Performance
- Clear browser cache if slow
- Reduce page size for better performance
- Enable hardware acceleration

## Updates

Version 1.0.0 (January 9, 2025)
- Initial release
- Mobile-optimized interface
- Advanced filtering system
- Image comparison view

## Support

For technical support or feature requests, please contact the development team.

---

Built with ❤️ for the Customer Success Team