import { createClient } from "@supabase/supabase-js";

// Client for browser (read-only via anon key)
export function getSupabaseClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) {
        return null;
    }

    return createClient(url, anonKey);
}

// Server client with service role key (full access)
export function getSupabaseAdmin() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_KEY;

    if (!url || !serviceKey) {
        return null;
    }

    return createClient(url, serviceKey);
}
