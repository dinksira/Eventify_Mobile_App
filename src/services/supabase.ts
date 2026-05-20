import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yjkywqwbwtukzedkosqs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlqa3l3cXdid3R1a3plZGtvc3FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyOTAyMDIsImV4cCI6MjA5NDg2NjIwMn0.2H5PnaoUOklSP4GEk7JobUKeCsIhhllZZw_iSLLY6z4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
