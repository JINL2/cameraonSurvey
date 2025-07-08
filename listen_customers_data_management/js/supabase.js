// Supabase client initialization
const supabase = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);

// Test connection
async function testConnection() {
    try {
        const { data, error } = await supabase
            .from(CONFIG.TABLE_NAME)
            .select('count')
            .limit(1);
        
        if (error) {
            console.error('Supabase connection error:', error);
            return false;
        }
        
        console.log('Supabase connected successfully');
        return true;
    } catch (err) {
        console.error('Connection test failed:', err);
        return false;
    }
}