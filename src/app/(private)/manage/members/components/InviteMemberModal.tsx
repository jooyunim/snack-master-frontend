import Image from 'next/image';
import Button from '@/components/Button';
import icChevronUp from '@/assets/icons/ic_chevron_up.svg';

export default function InviteMemberModal() {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="invite-member-title"
      className="flex w-[600px] flex-col items-center gap-8 rounded-[2px] bg-white px-[60px] py-10 shadow-[0_0_20px_rgba(0,0,0,0.1)] max-sm:w-full max-sm:px-6 max-sm:py-8 max-sm:shadow-none"
    >
      <h2
        id="invite-member-title"
        className="text-[18px] font-bold tracking-[-0.45px] text-black"
      >
        회원 초대
      </h2>

      <div className="flex w-full flex-col gap-9">
        <div className="flex w-full flex-col gap-7">
          <div className="flex w-full flex-col gap-5">
            <div className="flex h-14 w-full flex-col justify-end gap-[5px] border-b border-solid border-gray-600 px-1 py-2">
              <span className="text-[12px] tracking-[-0.3px] text-gray-400">
                이름
              </span>
              <span className="text-[16px] tracking-[-0.4px] text-gray-700">
                김스낵
              </span>
            </div>

            <div className="flex h-14 w-full flex-col justify-end gap-[5px] border-b border-solid border-gray-600 px-1 py-2">
              <span className="text-[12px] tracking-[-0.3px] text-gray-400">
                이메일
              </span>
              <span className="text-[16px] tracking-[-0.4px] text-gray-700">
                sn@codeit.com
              </span>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3">
            <p className="text-[16px] font-bold tracking-[-0.4px] text-gray-950">
              권한
            </p>
            <div className="flex h-11 w-full items-center justify-between border border-solid border-gray-100 bg-white px-4 py-2.5">
              <span className="text-[16px] tracking-[-0.4px] text-gray-950">
                관리자
              </span>
              <span className="relative size-4 shrink-0 overflow-hidden">
                <Image
                  src={icChevronUp}
                  alt=""
                  fill
                  className="object-contain"
                />
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center gap-5">
          <Button variant="line" className="min-w-0 flex-1">
            취소
          </Button>
          <Button variant="filled" className="min-w-0 flex-1">
            초대하기
          </Button>
        </div>
      </div>
    </div>
  );
}
