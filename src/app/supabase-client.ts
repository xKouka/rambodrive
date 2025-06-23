// src/app/supabase-client.ts

import { createClient } from '@supabase/supabase-js';


export const client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,
      storage: localStorage,
    },
  }
);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkLoginStatus() {
  const { data: { session }, error } = await supabase.auth.getSession()

  if (error) {
    console.error('Error al obtener la sesión:', error.message)
    return
  }

  if (session) {
    console.log('El usuario ha iniciado sesión:', session.user)
    // Puedes acceder a la información del usuario con session.user
  } else {
    console.log('El usuario no ha iniciado sesión.')
  }
}

async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Error al cerrar sesión:', error.message)
  } else {
    console.log('Sesión cerrada exitosamente.')
  }
}

checkLoginStatus()

