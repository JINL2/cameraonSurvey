// Configuration file
const CONFIG = {
    // Supabase configuration
    SUPABASE_URL: 'https://yenfccoefczqxckbizqa.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllbmZjY29lZmN6cXhja2JpenFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NDkyNzksImV4cCI6MjA2MTUyNTI3OX0.U1iQUOaNPSrEHf1w_ePqgYzJiRO6Bi48E2Np2hY0nCQ',
    
    // Pagination
    PAGE_SIZE: 20,
    
    // API endpoints
    TABLE_NAME: 'customer_feedbacks',
    
    // Default values
    DEFAULT_SORT: 'created_at',
    DEFAULT_ORDER: 'desc',
    
    // UI Configuration
    DEBOUNCE_DELAY: 300,
    ANIMATION_DURATION: 300,
    
    // Date format
    DATE_FORMAT: 'YYYY-MM-DD',
    DISPLAY_DATE_FORMAT: 'MMM DD, YYYY',
    
    // Rating colors
    RATING_COLORS: {
        5: '#10B981',
        4: '#84CC16',
        3: '#EAB308',
        2: '#F97316',
        1: '#EF4444'
    },
    
    // Messages
    MESSAGES: {
        LOADING: 'Loading feedbacks...',
        NO_DATA: 'No feedbacks found',
        ERROR: 'Error loading data. Please try again.',
        IMAGE_LOAD_ERROR: 'Image not available',
        FILTER_APPLIED: 'Filters applied',
        FILTER_RESET: 'Filters reset'
    }
};