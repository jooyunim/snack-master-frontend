# 개발 결정 기록

## `src/lib/api.ts` — localStorage Bearer → httpOnly accessToken 쿠키 인증 (2026-08-22)

**왜 했나**: 백엔드(`auth.controller.ts`, `auth.middleware.ts`)가 이미 `accessToken`/`refreshToken`을 httpOnly 쿠키로 발급·검증하도록 바뀌었는데, FE `apiFetch`는 여전히 `localStorage`에 토큰을 저장하고 `Authorization: Bearer` 헤더로 보내고 있었음. BE와 FE 인증 방식이 어긋나 있어서 쿠키 기준으로 맞춤.

**변경 요약**: `localStorage + Authorization Bearer` → `credentials: 'include'` + httpOnly 쿠키

---

### 삭제된 코드

**`getAccessToken()` 함수 전체 삭제**

- 이전: `localStorage.getItem('accessToken')`으로 토큰 읽음
- 쿠키는 httpOnly라 JS에서 읽을 수 없으므로 클라이언트 측 토큰 저장/조회 자체가 불필요

**`buildHeaders`의 Authorization 헤더 삭제**

- 이전: `...(token ? { Authorization: \`Bearer ${token}\` } : {})`
- 현재: `Content-Type`과 caller가 넘긴 headers만 설정

**`expireSession()`의 localStorage 제거**

- 이전: `localStorage.removeItem('accessToken')` + `SESSION_EXPIRED_EVENT` dispatch
- 현재: `SESSION_EXPIRED_EVENT` dispatch만 (쿠키 삭제는 서버 `logout`/`clearCookie`에 위임)

---

### `apiFetch` 401 처리 변경

**이전**

```typescript
let token = getAccessToken();

// localStorage에 token이 있을 때만 refresh 시도
if (response.status === 401 && token) {
  token = await refreshAccessToken(); // string 반환 기대
  // Authorization 헤더에 token 첨부 후 재시도
}

// refresh 후 401은 token이 있으면 세션 유지
if (response.status === 401 && !token) {
  expireSession();
}
```

**현재**

```typescript
let refreshed = false;

// 401이면 refresh 시도 (쿠키로 인증)
if (response.status === 401) {
  await refreshAccessToken(); // void, 서버가 accessToken 쿠키 갱신
  refreshed = true;
  // credentials: 'include'로 재시도 (헤더에 토큰 없음)
}

// refresh 시도 전 401만 세션 만료 처리
if (response.status === 401 && !refreshed) {
  expireSession();
}
```

---

### 핵심 차이

|                | 이전                            | 현재                        |
| -------------- | ------------------------------- | --------------------------- |
| 인증 방식      | `Authorization: Bearer <token>` | `accessToken` httpOnly 쿠키 |
| 토큰 저장      | `localStorage`                  | 없음 (브라우저 쿠키)        |
| refresh 조건   | localStorage에 token 있을 때    | 401 응답 시 항상            |
| 재시도 요청    | Bearer 헤더 + credentials       | `credentials: 'include'`만  |
| 세션 만료 판단 | `!token`                        | `!refreshed`                |

---

### 유지된 부분

- `SESSION_EXPIRED_EVENT` — 세션 만료 시 `AuthContext`에 알림
- `ApiError` 클래스
- 모든 fetch 요청에 `credentials: 'include'`
- refresh 성공 후 401은 세션 만료로 처리하지 않음 (예: 현재 비밀번호 불일치)

---
