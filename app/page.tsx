"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingCart, Trash2, Plus, Minus, Copy, CheckCircle2, 
  UtensilsCrossed, X, Image as ImageIcon, ExternalLink, User, Cloud, ChevronUp, ChevronDown
} from 'lucide-react';
import { isSupabaseConfigured, supabaseConfigError, supabase, type CartItem } from '../lib/supabase';

// --- 데이터 구성 ---
const MENU_DATA = [
  { id: 1, category: '대표 메뉴', name: '투움바 파스타', price: 12900, description: '파르미지아노 레지아노 치즈를 사용하여 만든 투움바 파스타.', signature: true },
  { id: 2, category: '대표 메뉴', name: '알배추 샐러드', price: 9900, description: '직화로 겉면을 태워 풍미를 더한 알배추, 치즈의 고소한 조화', signature: true },
  { id: 3, category: '대표 메뉴', name: '목살 플레이트', price: 14500, description: '돼지고기 목살, 샐러드, 감자튀김', signature: true },
  { id: 4, category: '대표 메뉴', name: '시금치 플렛 피자', price: 13900, description: '수제 화이트 소스, 시금치, 토마토, 햄을 돌돌 말아 먹는 피자', signature: true },
  { id: 5, category: '대표 메뉴', name: '전복 내장 크림 새우 리조또', price: 14500, description: '진한 전복내장과 게우소스 크림, 탱글한 새우', signature: true },
  { id: 6, category: '대표 메뉴', name: '브런치 루꼴라 피자', price: 14500, description: '루꼴라 듬뿍, 델리 햄, 페퍼로니, 베이컨', signature: true },
  { id: 7, category: '대표 메뉴', name: '전복 내장 크림 새우 파스타', price: 14500, description: '진한 전복내장과 게우소스 크림, 탱글한 새우', signature: true },
  { id: 8, category: '피자', name: '바싹 불고기 피자', price: 11900 },
  { id: 9, category: '피자', name: '소보루 고르곤졸라 피자', price: 11900 },
  { id: 10, category: '피자', name: '허니 콘치즈 피자', price: 11500 },
  { id: 11, category: '피자', name: '잔나비 피자', price: 11500 },
  { id: 12, category: '피자', name: '소보루 고구마 피자', price: 13500 },
  { id: 13, category: '피자', name: '고구마 무스 피자', price: 11500 },
  { id: 14, category: '피자', name: '포테이토 피자', price: 10900 },
  { id: 15, category: '피자', name: '페퍼로니 피자', price: 10900 },
  { id: 16, category: '피자', name: '부어스트 핫도그 피자', price: 13500, description: '한 조각에 독일 소시지가 하나씩 들어간 핫도그 피자' },
  { id: 17, category: '피자', name: '반반 피자', price: 11500, description: '페페로니 / 포테이토 반반' },
  { id: 18, category: '피자', name: '옥수수 새우 피자', price: 13900, description: '불향 가득, 옥수수와 새우의 단짠 조합' },
  { id: 19, category: '파스타', name: '새우 알리오 올리오 파스타', price: 10500 },
  { id: 20, category: '파스타', name: '매콤 해물 로제 파스타', price: 10500 },
  { id: 21, category: '파스타', name: '매콤 불고기 로제 파스타', price: 10500 },
  { id: 22, category: '파스타', name: '매콤 불고기 토마토 파스타', price: 9900 },
  { id: 23, category: '파스타', name: '바질 크림 불고기 파스타', price: 11500 },
  { id: 24, category: '파스타', name: '매콤 해물 토마토 파스타', price: 9900 },
  { id: 25, category: '파스타', name: '매콤 불고기 크림 파스타', price: 9900 },
  { id: 26, category: '파스타', name: '해물 크림 파스타', price: 9900 },
  { id: 27, category: '파스타', name: '베이컨 크림 파스타', price: 9900 },
  { id: 28, category: '파스타', name: '새우 바질 오일 파스타', price: 11900 },
  { id: 29, category: '파스타', name: '매콤 페퍼로니 토마토 파스타', price: 9900 },
  { id: 30, category: '리조또', name: '매콤 크림불고기 리조또', price: 9900 },
  { id: 31, category: '리조또', name: '바질 크림 불고기 리조또', price: 11500 },
  { id: 32, category: '리조또', name: '매콤 불고기 로제 리조또', price: 10500 },
  { id: 33, category: '리조또', name: '매콤 해물 로제 리조또', price: 10500 },
  { id: 34, category: '리조또', name: '매콤 불고기 토마토 리조또', price: 9900 },
  { id: 35, category: '리조또', name: '매콤 해물 토마토 리조또', price: 9900 },
  { id: 36, category: '리조또', name: '베이컨 크림치즈 리조또', price: 9900 },
  { id: 37, category: '샐러드/사이드', name: '리코타 치즈 샐러드', price: 9900 },
  { id: 38, category: '샐러드/사이드', name: 'Crane 샐러드', price: 6900, description: '기본 샐러드' },
  { id: 39, category: '샐러드/사이드', name: '케이준 치킨 샐러드', price: 10500 },
  { id: 40, category: '샐러드/사이드', name: '버팔로윙스&감자튀김', price: 10500, description: '버팔로 윙, 봉(각 3개)과 케이준 포테이토' },
  { id: 41, category: '샐러드/사이드', name: '크리스피텐더&감자튀김', price: 10900 },
  { id: 42, category: '샐러드/사이드', name: '치즈볼(4개)', price: 4500 },
  { id: 43, category: '샐러드/사이드', name: '고구마 치즈볼(4개)', price: 4500 },
  { id: 44, category: '샐러드/사이드', name: '케이준 포테이토', price: 6500 },
  { id: 45, category: '샐러드/사이드', name: '버터갈릭 포테이토', price: 7900 },
  { id: 46, category: '샐러드/사이드', name: '스위트 포테이토(고구마)', price: 7900 },
  { id: 47, category: '주류/음료', name: '청포도 맥주', price: 5500 },
  { id: 48, category: '주류/음료', name: '핑크자몽 맥주', price: 5500 },
  { id: 49, category: '주류/음료', name: '생맥주 500ml', price: 4900 },
  { id: 50, category: '주류/음료', name: '생맥주 380ml', price: 3900 },
  { id: 51, category: '주류/음료', name: '청포도 하이볼', price: 6900 },
  { id: 52, category: '주류/음료', name: '자몽 하이볼', price: 6900 },
  { id: 53, category: '주류/음료', name: '블루 하이볼', price: 6900 },
  { id: 54, category: '주류/음료', name: '짐빔 토닉 하이볼', price: 6500 },
  { id: 55, category: '주류/음료', name: '산토닉 토닉 하이볼', price: 6500 },
];

const CATEGORIES = ['전체', '대표 메뉴', '파스타', '피자', '리조또', '샐러드/사이드', '주류/음료'];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [supabaseError, setSupabaseError] = useState<string | null>(supabaseConfigError);
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState<any>(null);
  const [ordererName, setOrdererName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('header_collapsed');
    if (saved === '1') setIsHeaderCollapsed(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('header_collapsed', isHeaderCollapsed ? '1' : '0');
  }, [isHeaderCollapsed]);

  // 1. 초기 데이터 로드 및 실시간 구독
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    fetchCart();

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'shared_cart' },
        () => {
          fetchCart();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchCart = async () => {
    if (!isSupabaseConfigured) return;

    try {
      const { data, error } = await supabase
        .from('shared_cart')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        setSupabaseError(error.message);
        console.error('Fetch error:', error);
        return;
      }

      setSupabaseError(null);
      if (data) setCart(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setSupabaseError(msg);
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const filteredMenu = useMemo(() => {
    if (activeCategory === '전체') return MENU_DATA;
    return MENU_DATA.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const totalAmount = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  const initAddToCart = (item: any) => {
    if (!isSupabaseConfigured) {
      setToast(supabaseConfigError || 'Supabase 연결이 설정되지 않았습니다.');
      return;
    }

    setPendingItem(item);
    if (!ordererName) {
      const storedName = localStorage.getItem('last_order_name');
      if (storedName) setOrdererName(storedName);
    }
    setIsNameModalOpen(true);
  };

  const confirmAddToCart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingItem) return;

    if (!isSupabaseConfigured) {
      setToast(supabaseConfigError || 'Supabase 연결이 설정되지 않았습니다.');
      return;
    }

    const name = ordererName.trim() || '익명';
    localStorage.setItem('last_order_name', name);

    try {
      const existingItem = cart.find(i => i.menu_id === pendingItem.id && i.owner === name);

      let error: { message: string } | null = null;
      if (existingItem) {
        const res = await supabase
          .from('shared_cart')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id);
        error = res.error;
      } else {
        const res = await supabase
          .from('shared_cart')
          .insert([{
            menu_id: pendingItem.id,
            menu_name: pendingItem.name,
            price: pendingItem.price,
            owner: name,
            quantity: 1
          }]);
        error = res.error;
      }

      if (error) {
        setSupabaseError(error.message);
        setToast(`저장 실패: ${error.message}`);
        return;
      }

      setSupabaseError(null);
      setToast(`${pendingItem.name} (${name}) 담김`);
      setIsNameModalOpen(false);
      void fetchCart(); // Realtime이 막혀도 즉시 UI 반영
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setSupabaseError(msg);
      setToast(`저장 실패: ${msg}`);
    }
  };

  const updateQuantity = async (id: string, currentQty: number, delta: number) => {
    if (!isSupabaseConfigured) {
      setToast(supabaseConfigError || 'Supabase 연결이 설정되지 않았습니다.');
      return;
    }

    const newQty = Math.max(1, currentQty + delta);
    try {
      const { error } = await supabase
        .from('shared_cart')
        .update({ quantity: newQty })
        .eq('id', id);
      if (error) {
        setSupabaseError(error.message);
        setToast(`수정 실패: ${error.message}`);
        return;
      }

      setSupabaseError(null);
      void fetchCart(); // Realtime이 막혀도 즉시 UI 반영
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setSupabaseError(msg);
      setToast(`수정 실패: ${msg}`);
    }
  };

  const removeFromCart = async (id: string) => {
    if (!isSupabaseConfigured) {
      setToast(supabaseConfigError || 'Supabase 연결이 설정되지 않았습니다.');
      return;
    }

    try {
      const { error } = await supabase
        .from('shared_cart')
        .delete()
        .eq('id', id);
      if (error) {
        setSupabaseError(error.message);
        setToast(`삭제 실패: ${error.message}`);
        return;
      }

      setSupabaseError(null);
      void fetchCart(); // Realtime이 막혀도 즉시 UI 반영
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setSupabaseError(msg);
      setToast(`삭제 실패: ${msg}`);
    }
  };

  const clearCart = async () => {
    if (!confirm('공유 장바구니의 모든 메뉴가 삭제됩니다. 계속하시겠습니까?')) return;
    if (!isSupabaseConfigured) {
      setToast(supabaseConfigError || 'Supabase 연결이 설정되지 않았습니다.');
      return;
    }

    try {
      const { error } = await supabase.from('shared_cart').delete().neq('id', '0');
      if (error) {
        setSupabaseError(error.message);
        setToast(`초기화 실패: ${error.message}`);
        return;
      }

      setSupabaseError(null);
      setToast('장바구니가 초기화되었습니다.');
      void fetchCart(); // Realtime이 막혀도 즉시 UI 반영
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setSupabaseError(msg);
      setToast(`초기화 실패: ${msg}`);
    }
  };

  const copyToClipboard = () => {
    if (cart.length === 0) return;
    const date = new Date().toLocaleDateString();
    let text = `[메뉴 주문서 - ${date}]

`;
    cart.forEach(item => {
      text += `- ${item.menu_name} (${item.owner}) x ${item.quantity}
`;
    });
    text += `
총 합계: ${totalAmount.toLocaleString()}원`;

    navigator.clipboard.writeText(text).then(() => {
      setToast('주문서가 복사되었습니다!');
    });
  };

  return (
    <div className="min-h-screen pb-24">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        {isHeaderCollapsed ? (
          <div className="max-w-4xl mx-auto px-4 py-2 flex justify-between items-center">
            <button
              type="button"
              onClick={() => setIsHeaderCollapsed(false)}
              className="text-xs bg-gray-100 text-gray-700 px-3 py-2 rounded-full flex items-center gap-1"
              aria-label="헤더 펼치기"
            >
              <ChevronDown size={14} /> 헤더 보기
            </button>

            <div className="flex items-center gap-2">
              <a
                href="https://naver.me/xMjKRA2c"
                target="_blank"
                className="text-xs bg-green-500 text-white px-3 py-2 rounded-full flex items-center gap-1"
              >
                <ExternalLink size={14} /> 매장 정보
              </a>
              <button onClick={() => setIsCartOpen(true)} className="relative p-2 rounded-full hover:bg-gray-100">
                <ShoppingCart size={22} className="text-gray-700" />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex justify-between w-full md:w-auto items-center">
              <div className="relative">
                <div className="welcome-glow absolute -inset-x-8 -inset-y-6 rounded-3xl pointer-events-none" aria-hidden="true" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide text-white bg-gradient-to-r from-orange-500 to-pink-500 shadow-sm rotate-[-1deg]">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/80" aria-hidden="true" />
                      선생님들, 격하게 환영합니다!
                    </span>
                    <span className="hidden sm:inline text-xs text-gray-500">함께해주셔서 감사합니다</span>
                  </div>

                  <h1 className="mt-2 font-display leading-tight">
                    <span className="block text-base sm:text-lg text-gray-700">2026학년도 한들물빛초</span>
                    <span className="block text-2xl sm:text-3xl welcome-gradient-text">
                      6학년 팀이 되신 것을 환영합니다
                    </span>
                  </h1>

                  <div className="pointer-events-none absolute -top-2 -left-2 h-2 w-2 rounded-full bg-orange-400 animate-welcome-float" aria-hidden="true" />
                  <div className="pointer-events-none absolute top-1 -right-1 h-2 w-2 rotate-12 bg-pink-400 animate-welcome-float-slow" aria-hidden="true" />
                  <div className="pointer-events-none absolute -bottom-1 left-1/2 h-2 w-2 rotate-45 bg-yellow-400 animate-welcome-float" aria-hidden="true" />

                  <p className="text-sm text-orange-500 font-medium mt-1 flex items-center gap-1">
                    <UtensilsCrossed size={16} /> 실시간 공유 장바구니
                  </p>
                </div>
              </div>
              <div className="md:hidden flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsHeaderCollapsed(true)}
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="헤더 숨기기"
                >
                  <ChevronUp size={22} className="text-gray-700" />
                </button>
                <button onClick={() => setIsCartOpen(true)} className="relative p-2 rounded-full hover:bg-gray-100">
                  <ShoppingCart size={24} className="text-gray-700" />
                  {cart.length > 0 && (
                    <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {cart.reduce((a, b) => a + b.quantity, 0)}
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a href="https://naver.me/xMjKRA2c" target="_blank" className="text-xs bg-green-500 text-white px-3 py-2 rounded-full flex items-center gap-1">
                <ExternalLink size={14} /> 매장 정보
              </a>
              <button
                type="button"
                onClick={() => setIsHeaderCollapsed(true)}
                className="hidden md:flex p-2 rounded-full hover:bg-gray-100"
                aria-label="헤더 숨기기"
              >
                <ChevronUp size={22} className="text-gray-700" />
              </button>
              <button onClick={() => setIsCartOpen(true)} className="hidden md:flex relative p-2 rounded-full hover:bg-gray-100">
                <ShoppingCart size={24} className="text-gray-700" />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        <div className="border-t overflow-x-auto hide-scrollbar bg-white">
          <div
            role="tablist"
            aria-label="카테고리"
            className="flex items-center gap-2 px-4 py-2 min-w-max md:justify-center md:gap-0 md:py-0 md:min-w-full"
          >
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                    active ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600'
                  } md:rounded-none md:bg-transparent md:px-4 md:py-3 md:border-b-2 ${
                    active ? 'md:border-orange-500 md:text-orange-600' : 'md:border-transparent md:text-gray-500'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {supabaseError && (
          <div className="border-t bg-red-50">
            <div className="max-w-4xl mx-auto px-4 py-2 text-xs text-red-700">
              {supabaseError}
            </div>
          </div>
        )}
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMenu.map(item => (
            <div key={item.id} className="menu-card bg-white rounded-xl shadow-sm border p-4 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">
                  {item.name} {item.signature && <span className="bg-red-100 text-red-600 text-[10px] px-2 py-0.5 rounded-full">HIT</span>}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{item.description || item.category}</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold text-lg">{item.price.toLocaleString()}원</span>
                <div className="flex gap-2">
                  <a href={`https://search.naver.com/search.naver?where=image&query=크레인+${item.name}`} target="_blank" className="bg-gray-100 p-2 rounded-lg text-gray-600">
                    <ImageIcon size={16} />
                  </a>
                  <button onClick={() => initAddToCart(item)} className="bg-orange-50 text-orange-600 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-1">
                    <Plus size={16} /> 담기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-2 animate-fade-in-up text-sm">
          <CheckCircle2 size={18} className="text-green-400" /> {toast}
        </div>
      )}

      {isNameModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-5 w-full max-w-sm animate-slide-up">
            <h3 className="text-lg font-bold mb-1">누구의 메뉴인가요?</h3>
            <p className="text-sm text-gray-500 mb-4">주문자 이름을 입력해주세요.</p>
            <form onSubmit={confirmAddToCart}>
              <input type="text" value={ordererName} onChange={(e) => setOrdererName(e.target.value)} placeholder="이름 (예: 홍길동)" className="w-full p-3 bg-gray-50 border rounded-xl mb-4" autoFocus />
              <div className="flex gap-2">
                <button type="button" onClick={() => setIsNameModalOpen(false)} className="flex-1 py-3 text-gray-500">취소</button>
                <button type="submit" className="flex-1 py-3 bg-orange-600 text-white rounded-xl font-bold">확인</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg h-[80vh] sm:h-auto sm:max-h-[80vh] sm:rounded-2xl rounded-t-2xl flex flex-col animate-slide-up">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Cloud className="text-orange-500" /> 공유 장바구니 ({cart.length})
              </h2>
              <button onClick={() => setIsCartOpen(false)}><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <Cloud size={48} className="mb-2" /> <p>장바구니가 비어있습니다.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div className="flex-1">
                      <span className="bg-orange-100 text-orange-700 text-[10px] px-1.5 py-0.5 rounded font-bold flex items-center w-fit gap-1 mb-1">
                        <User size={10} /> {item.owner}
                      </span>
                      <h4 className="font-medium">{item.menu_name}</h4>
                      <span className="text-sm text-gray-500">{(item.price * item.quantity).toLocaleString()}원</span>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                      <button onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity, -1) : removeFromCart(item.id)}>
                        {item.quantity === 1 ? <Trash2 size={16} /> : <Minus size={16} />}
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity, 1)}><Plus size={16} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">총 결제 예정 금액</span>
                <div className="flex items-center gap-3">
                  {cart.length > 0 && <button onClick={clearCart} className="text-xs text-gray-400 underline">전체 삭제</button>}
                  <span className="text-xl font-bold text-orange-600">{totalAmount.toLocaleString()}원</span>
                </div>
              </div>
              <button onClick={copyToClipboard} disabled={cart.length === 0} className="w-full bg-orange-600 text-white font-bold py-3.5 rounded-xl flex justify-center items-center gap-2 disabled:bg-gray-300">
                <Copy size={20} /> 주문서 복사하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
