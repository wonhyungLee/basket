import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 장바구니 아이템 타입 정의
export type CartItem = {
  id: string;
  menu_id: number;
  menu_name: string;
  price: number;
  owner: string;
  quantity: number;
  created_at: string;
};