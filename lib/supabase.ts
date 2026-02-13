import { createClient } from '@supabase/supabase-js';

// 빌드 시점에 환경 변수가 없어도 에러가 나지 않도록 처리합니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'placeholder';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type CartItem = {
  id: string;
  menu_id: number;
  menu_name: string;
  price: number;
  owner: string;
  quantity: number;
  created_at: string;
};
