# Snack Master Frontend

**스낵 마스터**는 회사 간식 구매·지출을 한곳에서 관리하는 웹 서비스입니다.  
이 저장소는 Next.js 기반 클라이언트로, 역할(USER / ADMIN / SUPER_ADMIN)에 따라 상품 조회·장바구니·구매 요청·승인·구매 내역·멤버/예산 관리 UI를 제공합니다.

> 백엔드: [`snack-master-backend`](./snack-master-backend) (기본 `http://localhost:4000`)

---

## 서비스 개요

- 흩어진 간식 구매처를 통합하고, **회사별 지출**을 관리
- **USER**: 상품 탐색 → 장바구니 → 구매 요청
- **ADMIN / SUPER_ADMIN**: 요청 승인·거절, 직접 구매, 구매 내역·예산 요약 확인
- **SUPER_ADMIN**: 멤버 초대/역할 변경, 월 예산 설정

랜딩 카피: *「내가 원하는 간식을 쉽고 빠르게 구매 — 스낵마스터와 함께하세요」*

---

## Tech Stack

| 구분 | 기술 |
|------|------|
| Framework | Next.js **16.2** (App Router) |
| Language | TypeScript 5 |
| UI | React **19**, Tailwind CSS **v4** |
| Data Fetching | TanStack React Query **v5** |
| HTTP | `fetch` (`src/lib/api.ts`) + Axios |
| Form / Validation | react-hook-form, Zod, `@hookform/resolvers` |
| Date | date-fns |
| Tooling | ESLint (eslint-config-next), Prettier, Husky, lint-staged |

---

## Features

### 인증
- 로그인 / 로그아웃
- 회사 SUPER_ADMIN 회원가입 (`/signup`)
- 초대 링크 기반 멤버 가입 (`/signup/invite`)
- Access Token: `localStorage` (`accessToken`)
- Refresh: Backend httpOnly cookie + 401 시 1회 재시도

### 공통 (로그인 사용자)
| 기능 | 경로 |
|------|------|
| 상품 리스트 / 상세 | `/products`, `/products/[id]` |
| 상품 등록 내역 | `/product-register` |
| 위시리스트 | `/wishlist` |
| 장바구니 · 주문 · 완료 | `/cart`, `/cart/order`, `/cart/purchase`, `/cart/complete` |
| 구매 요청 내역 | `/purchase-request`, `/purchase-request/[id]` |
| 마이페이지 | `/user` |

### ADMIN / SUPER_ADMIN
| 기능 | 경로 |
|------|------|
| 구매 요청 관리 (승인/거절) | `/purchase-request-manage`, `/purchase-request-manage/[id]` |
| 구매 내역 확인 · 대시보드 요약 | `/purchase`, `/purchase/[id]` |

### SUPER_ADMIN only
| 기능 | 경로 |
|------|------|
| 멤버 관리 (초대·역할·삭제) | `/manage/members` |
| 월 예산 관리 | `/manage/budget` |

### 역할별 장바구니 흐름
- **USER** → 구매 요청 생성 (`POST /cart/purchase-request`)
- **ADMIN / SUPER_ADMIN** → 직접 구매 / 즉시 구매 (`POST /cart/purchase`, `/cart/instant`)

---

## Project Structure

```text
snack-master-frontend/
├── public/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # 공개 랜딩
│   │   ├── layout.tsx / providers.tsx
│   │   ├── (auth)/                  # login, signup, signup/invite
│   │   └── (private)/               # 로그인 필수 (GNB + Auth guard)
│   │       ├── products/
│   │       ├── product-register/
│   │       ├── wishlist/
│   │       ├── cart/                # order, purchase, complete
│   │       ├── purchase-request/
│   │       ├── user/
│   │       ├── (admin)/             # ADMIN+ layout guard
│   │       │   ├── purchase/
│   │       │   └── purchase-request-manage/
│   │       └── (super-admin)/       # SUPER_ADMIN layout guard
│   │           └── manage/          # members, budget
│   ├── features/                    # 도메인별 API · hooks · types · query-keys
│   │   ├── auth/
│   │   ├── product/
│   │   ├── cart/
│   │   ├── wishlist/
│   │   ├── purchase/                # 구매 내역 · dashboard summary
│   │   ├── purchase-request/
│   │   ├── purchase-request-manage/
│   │   └── member/
│   ├── components/                  # Gnb, SideMenu, Button, Pagination 등
│   ├── contexts/AuthContext.tsx
│   ├── lib/api.ts                   # apiFetch, 토큰, 401 refresh
│   └── assets/                      # icons, images
├── next.config.ts
├── package.json
└── README.md
```

권한 가드:
- `(private)/layout.tsx` — 미로그인 → `/login`
- `(admin)/layout.tsx` — `ADMIN` | `SUPER_ADMIN`만
- `(super-admin)/layout.tsx` — `SUPER_ADMIN`만

---

## Getting Started

### Prerequisites

- Node.js **18+** (권장: LTS)
- Backend 서버 실행 (`http://localhost:4000`)
- Backend CORS `CLIENT_URL` = Frontend origin (`http://localhost:3000`)

### Environment

프로젝트 루트에 `.env.local` (또는 `.env`) 생성:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

미설정 시 기본값은 `http://localhost:4000` 입니다.

### Install & Run

```bash
npm install
npm run dev
```

- 개발 서버: [http://localhost:3000](http://localhost:3000)
- 프로덕션:

```bash
npm run build
npm run start
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Next.js 개발 서버 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | ESLint |
| `npm run prepare` | Husky 설치 |

### Git Hooks

`lint-staged` (pre-commit):
- `*.{js,jsx,ts,tsx}` → Prettier + ESLint `--fix`
- `*.{css,scss}` → Prettier

---

## Architecture Notes

### API 통신
- Base URL: `NEXT_PUBLIC_BACKEND_URL`
- 인증 헤더: `Authorization: Bearer <accessToken>`
- `credentials: 'include'` (refresh cookie)
- 공통 래퍼: `src/lib/api.ts`의 `apiFetch` (401 → refresh → 1회 재시도)

### React Query
- 도메인별 `features/*/hooks` + `constants/query-keys.ts`
- 예: 구매 내역 `useOrders`, `useOrderDetail`, `useDashboardSummary`

### 이미지
`next.config.ts`에서 허용:
- `picsum.photos`
- `*.amazonaws.com` (S3 상품 이미지)

---

## GNB 메뉴 (역할별)

| 메뉴 | USER | ADMIN | SUPER_ADMIN |
|------|:----:|:-----:|:-----------:|
| 상품 리스트 | ✓ | ✓ | ✓ |
| 구매 요청 내역 | ✓ | ✓ | ✓ |
| 상품 등록 내역 | ✓ | ✓ | ✓ |
| 구매 요청 관리 | | ✓ | ✓ |
| 구매 내역 확인 | | ✓ | ✓ |
| 관리 (멤버/예산) | | | ✓ |

---

## Related

- Backend README: `snack-master-backend/README.md`
- 상품 API 계약: `snack-master-backend/docs/product-api-contract.md`
