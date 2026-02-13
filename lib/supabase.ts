import { createClient } from '@supabase/supabase-js';

const envSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const envSupabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(envSupabaseUrl && envSupabaseKey);
export const supabaseConfigError = (() => {
  const missing: string[] = [];
  if (!envSupabaseUrl) missing.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!envSupabaseKey) missing.push('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY 또는 NEXT_PUBLIC_SUPABASE_ANON_KEY');
  if (missing.length === 0) return null;

  // NEXT_PUBLIC_* envs are inlined into the client bundle at build time. If you add envs later,
  // you must trigger a rebuild/redeploy for the client to pick them up.
  return `Supabase 환경변수가 설정되지 않았습니다: ${missing.join(', ')} (Vercel에 등록 후 재배포 필요)` as const;
})();

// 빌드 시점에 환경 변수가 없어도 에러가 나지 않도록 placeholder를 둡니다.
// (대신 UI에서 supabaseConfigError로 미설정 상태를 안내합니다.)
const supabaseUrl = envSupabaseUrl || 'https://placeholder.supabase.co';
const supabaseKey = envSupabaseKey || 'placeholder';

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
