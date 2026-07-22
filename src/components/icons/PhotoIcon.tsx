// Figma 디자인 시스템 Icon 섹션 icon_photo. 프레임(currentColor)과 흰색 컷아웃(mountain) 2톤 아이콘.
interface PhotoIconProps {
  className?: string;
}

export default function PhotoIcon({ className }: PhotoIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g transform="translate(3, 3)" fill="currentColor">
        <path d="M7.86804e-07 16.5H18V18H7.86804e-07V16.5Z" />
        <path d="M16.5 18V6.55673e-08L18 0V18H16.5Z" />
        <path d="M7.86804e-07 18L0 6.55673e-08L1.5 0L1.5 18H7.86804e-07Z" />
      </g>
      <g transform="translate(4, 7.07)" fill="white">
        <path d="M8.52344 10.041L11.8711 5.85156L16 11.0195V13.9336H0V11.1807L4.6377 4.14453L8.52344 10.041ZM11.1123 0C12.2165 0.000263774 13.1121 0.895739 13.1123 2C13.1123 3.10441 12.2166 3.99974 11.1123 4C10.0077 4 9.1123 3.10457 9.1123 2C9.11248 0.895576 10.0078 0 11.1123 0Z" />
      </g>
    </svg>
  );
}
