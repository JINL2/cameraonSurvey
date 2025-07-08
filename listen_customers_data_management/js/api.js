// API functions for data fetching

// Fetch feedbacks with filters and pagination
async function fetchFeedbacks(filters = {}, page = 1) {
    try {
        let query = supabase
            .from(CONFIG.TABLE_NAME)
            .select('*', { count: 'exact' });
        
        // Apply filters
        if (filters.startDate) {
            query = query.gte('visit_date', filters.startDate);
        }
        
        if (filters.endDate) {
            query = query.lte('visit_date', filters.endDate);
        }
        
        if (filters.rating) {
            query = query.eq('rating', filters.rating);
        }
        
        if (filters.boothLocation) {
            query = query.eq('booth_location', filters.boothLocation);
        }
        
        if (filters.recommend !== '') {
            query = query.eq('would_recommend', filters.recommend === 'true');
        }
        
        if (filters.searchText) {
            query = query.ilike('customer_opinion', `%${filters.searchText}%`);
        }
        
        // Pagination
        const from = (page - 1) * CONFIG.PAGE_SIZE;
        const to = from + CONFIG.PAGE_SIZE - 1;
        
        // Execute query
        const { data, error, count } = await query
            .order(CONFIG.DEFAULT_SORT, { ascending: false })
            .range(from, to);
        
        if (error) throw error;
        
        return {
            data: data || [],
            totalCount: count || 0,
            currentPage: page,
            totalPages: Math.ceil((count || 0) / CONFIG.PAGE_SIZE)
        };
        
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        throw error;
    }
}

// Fetch single feedback by ID
async function fetchFeedbackById(id) {
    try {
        const { data, error } = await supabase
            .from(CONFIG.TABLE_NAME)
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) throw error;
        
        return data;
    } catch (error) {
        console.error('Error fetching feedback:', error);
        throw error;
    }
}

// Fetch unique booth locations
async function fetchBoothLocations() {
    try {
        const { data, error } = await supabase
            .from(CONFIG.TABLE_NAME)
            .select('booth_location')
            .not('booth_location', 'is', null);
        
        if (error) throw error;
        
        // Get unique locations
        const locations = [...new Set(data.map(item => item.booth_location))];
        return locations.filter(Boolean).sort();
        
    } catch (error) {
        console.error('Error fetching booth locations:', error);
        return [];
    }
}

// Calculate statistics
async function fetchStatistics(filters = {}) {
    try {
        // Get all data for statistics (without pagination)
        let query = supabase
            .from(CONFIG.TABLE_NAME)
            .select('rating, would_recommend');
        
        // Apply same filters as main query
        if (filters.startDate) {
            query = query.gte('visit_date', filters.startDate);
        }
        
        if (filters.endDate) {
            query = query.lte('visit_date', filters.endDate);
        }
        
        if (filters.boothLocation) {
            query = query.eq('booth_location', filters.boothLocation);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        // Calculate statistics
        const total = data.length;
        const avgRating = total > 0 
            ? (data.reduce((sum, item) => sum + (item.rating || 0), 0) / data.filter(item => item.rating).length).toFixed(1)
            : 0;
        const recommendCount = data.filter(item => item.would_recommend === true).length;
        const recommendRate = total > 0 
            ? Math.round((recommendCount / total) * 100)
            : 0;
        
        return {
            total,
            avgRating,
            recommendRate
        };
        
    } catch (error) {
        console.error('Error calculating statistics:', error);
        return {
            total: 0,
            avgRating: 0,
            recommendRate: 0
        };
    }
}