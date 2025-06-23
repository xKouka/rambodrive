// src/app/supabase-client.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Cliente que se puede usar con persistencia en cliente
export const client = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storage: typeof window !== 'undefined' ? localStorage : undefined,
  },
});

// Cliente auxiliar para funciones generales (sin configuración personalizada)
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Verificar sesión actual
export async function checkLoginStatus() {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Error al obtener la sesión:', error.message);
    return;
  }

  if (session) {
    console.log('El usuario ha iniciado sesión:', session.user);
  } else {
    console.log('El usuario no ha iniciado sesión.');
  }
}

// Cerrar sesión
export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error al cerrar sesión:', error.message);
  } else {
    console.log('Sesión cerrada exitosamente.');
  }
}

// Solo ejecutar en cliente
if (typeof window !== 'undefined') {
  checkLoginStatus();
}
