import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function submitRsvp(rsvpData) {
  const payload = {
    guest_slug: rsvpData.guestSlug || 'direct',
    name: rsvpData.name,
    phone: rsvpData.phone,
    attending: rsvpData.attending === 'yes' || rsvpData.attending === true,
    guests_count: Number(rsvpData.guestCount) || 1,
    message: rsvpData.message || '',
    created_at: new Date().toISOString(),
  };

  // If Supabase keys are configured in .env, insert into 'rsvps' table
  if (supabase) {
    try {
      const { data, error } = await supabase.from('rsvps').insert([payload]);
      if (error) throw error;
      return { success: true, source: 'supabase', data };
    } catch (err) {
      console.warn('Supabase insert failed, saving to local backup:', err);
    }
  }

  // Graceful local fallback if Supabase is not yet configured or offline
  try {
    const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
    existing.push(payload);
    localStorage.setItem('wedding_rsvps', JSON.stringify(existing));
    return { success: true, source: 'local_storage', data: payload };
  } catch (e) {
    console.error('Local backup failed:', e);
    return { success: true, source: 'memory', data: payload };
  }
}
