import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL or Anon Key is missing. Please check your environment variables.');
    return null;
  }

  try {
    return createClientComponentClient({
      supabaseUrl,
      supabaseKey,
    });
  } catch (error) {
    console.error('Error creating Supabase client:', error);
    return null;
  }
};