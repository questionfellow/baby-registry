import { createClient } from '@supabase/supabase-js';

// Note: In a real app, these should be in an .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://cazmnbehgeyligrcztkt.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_dzQI8mppjQasiDuoPxlzrg_xMwJDkF0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
