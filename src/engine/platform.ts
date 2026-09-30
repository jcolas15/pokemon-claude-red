// Browser setup the engine scripts expect before they load: the global G, plus the Supabase settings and client
// factory used by src/engine/game/cloudsave.js. Leave the env vars unset for browser-only saves with no sign-in.
import { createClient } from '@supabase/supabase-js';
import { game } from './global';

declare global {
  interface Window {
    supabase?: { createClient: typeof createClient };
  }
}

game().CONFIG = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
};
window.supabase = { createClient };
