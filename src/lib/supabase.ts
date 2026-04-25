import { createClient } from '@supabase/supabase-js';

// Ini adalah konfigurasi client Supabase yang aman.
// URL dan KEY akan diambil dari Environment Variables (Vercel/Local).

// 1. Dapatkan VITE_SUPABASE_URL dari Project Settings > API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';

// 2. Dapatkan VITE_SUPABASE_ANON_KEY dari Project Settings > API
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validasi
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not found. App will run in Offline Mode (Mock Data).');
}

// Client Export
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
