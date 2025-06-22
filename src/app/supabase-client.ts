// src/app/supabase-client.ts

import { createClient } from '@supabase/supabase-js';


export const client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
