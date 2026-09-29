// Supabase project for Google sign-in and cloud saves (Project Settings > API). Left empty, the game skips sign-in
// and saves to the browser only. The anon key is public by design: row-level security in supabase/schema.sql is what
// keeps each player's save private.
window.G = window.G || {};
window.G.CONFIG = {
  supabaseUrl: '',
  supabaseAnonKey: '',
};
