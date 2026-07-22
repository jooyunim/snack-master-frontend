// Figma 디자인 시스템 Icon 섹션의 ic_chevron_right export 경로를 그대로 사용.
// currentColor로 채워 부모의 text color를 그대로 상속받는다 (ic_chevron_left는 이 아이콘을 좌우 반전해 재사용).
interface ChevronRightIconProps {
  className?: string;
}

export default function ChevronRightIcon({ className }: ChevronRightIconProps) {
  return (
    <svg
      viewBox="0 0 7.95508 13.7881"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1.06055 0L7.95508 6.89355L1.06055 13.7881L0 12.7275L5.83301 6.89453L0 1.06055L1.06055 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
