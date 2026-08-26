import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

//https://.../manage/members?page=2&search=홍길동 이면:
//pathname = /manage/members
//searchParams = { page: '2', search: '홍길동' }
//searchParams.get('page') = 2
//searchParams.get('search') = 홍길동

export const useQueryPagination = () => {
  const pathname = usePathname(); // ? 앞 경로를 읽음
  const searchParams = useSearchParams(); // ? 뒤를 읽음

  //url 값은 항상 문자열 -> 숫자로 변경해야, 단, Number(null) = 0 이므로, Number.isInteger(raw) && raw >= 1 조건 추가
  const raw = Number(searchParams.get('page'));
  //raw가 정수이고, 1이상이면, 그 숫자고, 아니면 무조건 1로!
  const page = Number.isInteger(raw) && raw >= 1 ? raw : 1;
  const search = searchParams.get('search') ?? '';
  const sort = searchParams.get('sort') ?? '';

  // router.replace는 하드 새로고침 후 초기 쿼리를 다시 붙이는 경우가 있어,
  // 쿼리만 바꿀 때는 history.replaceState를 쓴다 (Next.js 권장, useSearchParams와 동기화됨).
  const replaceQuery = useCallback(
    (params: URLSearchParams) => {
      const qs = params.toString();
      const url = qs ? `${pathname}?${qs}` : pathname;
      window.history.replaceState(null, '', url);
    },
    [pathname]
  );

  //page 값을 변경하는 함수
  const setPage = useCallback(
    // useCallback = setpage 함수를 매번 새로 만들지 않게 고정해줌
    //nextPage = 다음에 갈 페이지(pagination에서 next를 누르면)
    (nextPage: number) => {
      const params = new URLSearchParams(searchParams.toString()); //기존 쿼리를 복사(searchParams.toString() = page=2&search=홍길동)해서 새로운 객체를 만든다. page만 바뀌고 검색어는 사라지면 안 된다.
      if (nextPage <= 1)
        params.delete('page'); //nextPage가 1보다 작거나 같으면, page 쿼리를 삭제한다.
      else params.set('page', String(nextPage)); //nextPage가 1보다 크면, page 쿼리를 새로 설정한다.
      replaceQuery(params);
    },
    [replaceQuery, searchParams]
  );

  //search 값을 변경하는 함수. 검색이 바뀌면 1페이지로 돌아간다.
  const setSearch = useCallback(
    (nextSearch: string) => {
      const trimmed = nextSearch.trim();
      const currentRaw = searchParams.get('search') ?? '';
      const current = currentRaw.trim();
      // 값이 같으면 page를 지우지 않는다 (페이지 이동 직후 동기화 effect가 다시 호출해도 페이지가 리셋되지 않음)
      if (trimmed === currentRaw) return;

      const params = new URLSearchParams(searchParams.toString());
      if (trimmed) params.set('search', trimmed);
      else params.delete('search');
      if (trimmed !== current) params.delete('page');
      replaceQuery(params);
    },
    [replaceQuery, searchParams]
  );

  const setSort = useCallback(
    (nextSort: string) => {
      const current = searchParams.get('sort') ?? '';
      if (nextSort === current) return;

      const params = new URLSearchParams(searchParams.toString());
      if (nextSort) params.set('sort', nextSort);
      else params.delete('sort');
      params.delete('page');
      replaceQuery(params);
    },
    [replaceQuery, searchParams]
  );

  return { page, setPage, search, setSearch, sort, setSort };
};
