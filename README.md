# 2026학년도 한들물빛초 6학년 메뉴 고르기 프로젝트

이 프로젝트는 여러 사람이 실시간으로 메뉴를 장바구니에 담고, 담긴 메뉴들을 자동으로 수합해주는 웹 애플리케이션입니다. Next.js와 Supabase를 사용하여 개발되었습니다.

## 주요 기능
- **실시간 공유 장바구니**: 누군가 메뉴를 담으면 모든 접속자의 화면에 즉시 반영됩니다.
- **주문자 식별**: 메뉴를 담을 때 이름을 입력하여 누가 어떤 메뉴를 선택했는지 알 수 있습니다.
- **주문서 복사**: 전체 주문 내역을 텍스트로 복사하여 메신저 등에 쉽게 공유할 수 있습니다.

## 설정 방법 (Supabase)

이 프로젝트의 백엔드는 Supabase를 사용합니다.

1. [Supabase](https://supabase.com/)에서 프로젝트를 생성합니다.
2. SQL Editor에서 다음 쿼리를 실행하여 테이블을 생성합니다:

```sql
-- 장바구니 테이블 생성
create table shared_cart (
  id uuid default gen_random_uuid() primary key,
  menu_id integer not null,
  menu_name text not null,
  price integer not null,
  owner text not null,
  quantity integer not null default 1,
  created_at timestamp with time zone default now()
);

-- 실시간 기능(Realtime) 활성화
alter publication supabase_realtime add table shared_cart;
```

3. `.env.local` 파일을 생성하고 Supabase의 API URL과 Anon Key를 입력합니다:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   # Recommended (new): Publishable key (starts with sb_publishable_)
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
   # Legacy: anon key (JWT). If you set this, you can omit PUBLISHABLE_KEY.
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## 배포 방법 (Vercel)

1. 이 코드를 GitHub 리포지토리에 업로드합니다.
2. [Vercel](https://vercel.com/)에서 새 프로젝트를 만들고 해당 GitHub 리포지토리를 연결합니다.
3. Vercel 설정의 **Environment Variables** 항목에 위의 두 환경 변수를 등록합니다.
4. 배포가 완료되면 생성된 URL을 공유하세요!

참고:
- Next.js 16은 Node.js `>=20.9.0`이 필요합니다. (Vercel Project Settings에서 Node 버전을 20/22로 설정하거나, `package.json`의 `engines`를 따릅니다.)
- Vercel 환경변수 변경 후에는 재배포가 필요합니다.

## 로컬 개발 환경 실행
```bash
npm install
npm run dev
```
