type SkeletonBarProps = {
  className?: string;
};

/** 회색 pulse 블록. 자리만 잡는 용도. */
export function SkeletonBar({ className = 'h-4 w-3/4' }: SkeletonBarProps) {
  return (
    <div
      className={`animate-pulse rounded bg-gray-100 ${className}`}
      aria-hidden
    />
  );
}

type SkeletonColumn = {
  /** 컬럼 컨테이너 클래스 (폭·gap 등) */
  className: string;
  /** 컬럼 안 bar들. 생략 시 기본 가로 bar 하나 */
  bars?: SkeletonBarProps[];
};

type TableRowSkeletonProps = {
  columns: SkeletonColumn[];
  className?: string;
};

/** PC/태블릿 테이블 한 행 자리 유지용 스켈레톤 */
export default function TableRowSkeleton({
  columns,
  className = '',
}: TableRowSkeletonProps) {
  return (
    <li
      className={`flex h-[100px] w-full items-center border-b border-solid border-gray-100 ${className}`}
      aria-hidden
    >
      {columns.map((column, index) => (
        <div key={index} className={`flex items-center ${column.className}`}>
          {(column.bars ?? [{ className: 'h-4 w-3/4' }]).map(
            (bar, barIndex) => (
              <SkeletonBar key={barIndex} className={bar.className} />
            )
          )}
        </div>
      ))}
    </li>
  );
}

type TableSkeletonProps = TableRowSkeletonProps & {
  rows?: number;
};

/** 테이블 행 스켈레톤 N개 */
export function TableSkeleton({
  rows = 5,
  columns,
  className,
}: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }, (_, index) => (
        <TableRowSkeleton key={index} columns={columns} className={className} />
      ))}
    </>
  );
}

type CardRowSkeletonProps = {
  className?: string;
  /** 본문 라인 수 (기본 2) */
  lines?: number;
};

/** 모바일 카드 리스트용 스켈레톤 한 장 */
export function CardRowSkeleton({
  className = '',
  lines = 2,
}: CardRowSkeletonProps) {
  return (
    <li
      className={`flex w-full flex-col gap-3 border-b border-solid border-gray-100 py-[30px] ${className}`}
      aria-hidden
    >
      <div className="flex w-full items-center justify-between">
        <SkeletonBar className="h-4 w-24" />
        <SkeletonBar className="h-6 w-14 rounded" />
      </div>
      <div className="flex flex-col gap-2">
        {Array.from({ length: lines }, (_, index) => (
          <SkeletonBar
            key={index}
            className={index === 0 ? 'h-4 w-3/4' : 'h-4 w-1/2'}
          />
        ))}
      </div>
    </li>
  );
}

type CardListSkeletonProps = CardRowSkeletonProps & {
  rows?: number;
};

/** 모바일 카드 스켈레톤 N개 */
export function CardListSkeleton({
  rows = 5,
  className,
  lines,
}: CardListSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }, (_, index) => (
        <CardRowSkeleton key={index} className={className} lines={lines} />
      ))}
    </>
  );
}
