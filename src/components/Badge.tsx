import { HTMLAttributes } from 'react';
import iconCheck from '@/assets/icons/icon_check.svg';
import iconTime from '@/assets/icons/icon_time.svg';
import iconX from '@/assets/icons/icon_X.svg';

type BadgeVariant =
  'label' | 'pending' | 'approved' | 'rejected' | 'admin' | 'member';

type BadgeSize = 'lg' | 'sm';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  /** admin / member에만 적용 */
  size?: BadgeSize;
};

const defaultLabel: Record<BadgeVariant, string> = {
  label: '즉시 요청',
  pending: '대기 중',
  approved: '승인',
  rejected: '거절',
  admin: '관리자',
  member: '일반',
};

const statusIconSrc: Partial<Record<BadgeVariant, string>> = {
  pending: iconTime,
  approved: iconCheck,
  rejected: iconX,
};

const baseClassName =
  'inline-flex items-center justify-center rounded-full font-bold whitespace-nowrap';

const variantClassName: Record<BadgeVariant, string> = {
  // secondary-100 배경 / secondary-500 글자 — Caption1/13 B
  label:
    'px-2 py-1 text-[13px] tracking-[-0.325px] bg-secondary-100 text-secondary-500',
  // gray-100 배경 / gray-800 글자 — Body2/14 B + icon_time
  pending:
    'gap-1 h-[30px] px-2 py-1.5 text-[14px] tracking-[-0.35px] bg-gray-100 text-gray-800',
  // Figma #def3ff/#00a2ff → secondary-100 / secondary-500
  approved:
    'gap-1 h-[30px] px-2 py-1.5 text-[14px] tracking-[-0.35px] bg-secondary-100 text-secondary-500',
  // Figma #ffdede → red/15 (globals red 기반), 글자 red
  rejected:
    'gap-1 h-[30px] px-2 py-1.5 text-[14px] tracking-[-0.35px] bg-red/15 text-red',
  // gray-700 배경 / white 글자
  admin: 'bg-gray-700 text-white',
  // gray-50 배경 / gray-500 글자
  member: 'bg-gray-50 text-gray-500',
};

const authoritySizeClassName: Record<BadgeSize, string> = {
  lg: 'h-[30px] px-2 py-1.5 text-[14px] tracking-[-0.35px]',
  sm: 'px-2.5 py-1 text-[12px] tracking-[-0.3px]',
};

function BadgeIcon({ src }: { src: string }) {
  return (
    <span
      aria-hidden
      className="inline-block size-[14px] shrink-0 bg-current [mask-image:var(--badge-icon)] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center] [-webkit-mask-image:var(--badge-icon)] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]"
      style={{ ['--badge-icon' as string]: `url(${src})` }}
    />
  );
}

export default function Badge({
  variant = 'label',
  size = 'lg',
  className = '',
  children,
  ...props
}: BadgeProps) {
  const isAuthority = variant === 'admin' || variant === 'member';
  const iconSrc = statusIconSrc[variant];
  const sizeClassName = isAuthority ? authoritySizeClassName[size] : '';

  return (
    <span
      className={`${baseClassName} ${variantClassName[variant]} ${sizeClassName} ${className}`.trim()}
      {...props}
    >
      {iconSrc ? <BadgeIcon src={iconSrc} /> : null}
      {children ?? defaultLabel[variant]}
    </span>
  );
}

// label — 즉시 요청 (secondary)
// pending / approved / rejected — status badge (아이콘 포함, 고정 30px)
// admin / member — authority badge (size: lg | sm)

// import Badge from '@/components/Badge';

// <Badge />
// <Badge variant="pending" />
// <Badge variant="approved" />
// <Badge variant="rejected" />
// <Badge variant="admin">관리자</Badge>
// <Badge variant="member" size="sm" />
