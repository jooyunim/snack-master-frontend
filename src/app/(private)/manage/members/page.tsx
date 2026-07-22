import Image from 'next/image';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Pagination from '@/components/Pagination';
import icSearch from '@/assets/icons/ic_search.svg';
import icMenu from '@/assets/icons/ic_menu.svg';
import InviteMemberModal from './components/InviteMemberModal';

type MemberRole = 'admin' | 'member';

type Member = {
  id: number;
  name: string;
  initials: string;
  email: string;
  role: MemberRole;
};

const MEMBERS: Member[] = [
  {
    id: 1,
    name: '김스낵',
    initials: 'JN',
    email: 'sn@codeit.com',
    role: 'admin',
  },
  {
    id: 2,
    name: '김스낵',
    initials: 'JN',
    email: 'sn@codeit.com',
    role: 'member',
  },
  {
    id: 3,
    name: '김스낵',
    initials: 'JN',
    email: 'sn@codeit.com',
    role: 'member',
  },
  {
    id: 4,
    name: '김스낵',
    initials: 'JN',
    email: 'sn@codeit.com',
    role: 'member',
  },
  {
    id: 5,
    name: '김스낵',
    initials: 'JN',
    email: 'sn@codeit.com',
    role: 'member',
  },
];

export default function MembersPage() {
  return (
    <main className="relative flex w-full max-w-[960px] flex-col gap-10 max-lg:max-w-none max-sm:gap-6 max-sm:pb-[112px]">
      <section className="flex w-full flex-col gap-6 max-sm:gap-3">
        <div className="flex w-full items-start justify-between gap-4">
          <h1 className="text-[24px] font-bold tracking-[-0.6px] text-black max-sm:text-[18px] max-sm:tracking-[-0.45px]">
            회원 관리
          </h1>
          <Button
            type="button"
            className="h-16 w-[200px] shrink-0 max-sm:hidden"
          >
            회원 초대하기
          </Button>
        </div>

        <div className="flex w-full items-center gap-2 border-b border-solid border-gray-900 py-2 pl-2 pr-3 max-sm:gap-3 max-sm:px-0 max-sm:py-3">
          <span className="relative size-6 shrink-0 overflow-hidden">
            <Image src={icSearch} alt="" fill className="object-contain" />
          </span>
          <input
            type="search"
            placeholder="이름으로 검색하세요"
            className="w-full bg-transparent text-[18px] tracking-[-0.45px] text-gray-950 outline-none placeholder:text-gray-400 max-sm:text-[16px] max-sm:tracking-[-0.4px]"
          />
        </div>
      </section>

      <section className="flex w-full flex-col gap-6">
        {/* PC / Tablet table */}
        <div className="flex w-full flex-col max-sm:hidden">
          <div className="flex w-full items-center gap-20 border-y border-solid border-gray-100 p-5 max-lg:gap-8">
            <div className="flex w-[142px] shrink-0 items-center px-[50px] max-lg:w-[132px] max-lg:px-[46px]">
              <span className="w-[90px] text-[16px] font-bold tracking-[-0.4px] text-gray-500 max-lg:w-20">
                이름
              </span>
            </div>
            <span className="min-w-0 flex-1 text-[16px] font-bold tracking-[-0.4px] text-gray-500">
              메일
            </span>
            <span className="w-[72px] shrink-0 text-center text-[16px] font-bold tracking-[-0.4px] text-gray-500">
              권한
            </span>
            <span className="w-[200px] shrink-0 text-center text-[16px] font-bold tracking-[-0.4px] text-gray-500">
              비고
            </span>
          </div>

          {MEMBERS.map((member) => (
            <article
              key={member.id}
              className={`flex h-[100px] w-full items-center gap-20 border-b border-solid border-gray-100 px-5 max-lg:gap-8 ${
                member.role === 'admin' ? 'bg-gray-25' : 'bg-white'
              }`}
            >
              <div className="flex shrink-0 items-center gap-5 max-lg:gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-50">
                  <span className="text-[10px] tracking-[-0.25px] text-black">
                    {member.initials}
                  </span>
                </div>
                <span
                  className={`w-[90px] text-[16px] tracking-[-0.4px] text-gray-950 max-lg:w-20 ${
                    member.role === 'admin' ? 'font-bold' : 'font-normal'
                  }`}
                >
                  {member.name}
                </span>
              </div>

              <p className="min-w-0 flex-1 text-[16px] tracking-[-0.4px] text-gray-950">
                {member.email}
              </p>

              <div className="flex w-[72px] shrink-0 justify-center">
                <Badge
                  variant={member.role === 'admin' ? 'admin' : 'member'}
                  className="w-16"
                />
              </div>

              <div className="flex w-[200px] shrink-0 items-center gap-2">
                <Button type="button" variant="sub" className="w-[96px]">
                  권한 변경
                </Button>
                <button
                  type="button"
                  className="inline-flex w-[96px] items-center justify-center rounded-[2px] bg-red px-5 py-2.5 text-center text-[16px] tracking-[-0.4px] text-white"
                >
                  계정 탈퇴
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile card list */}
        <ul className="hidden w-full flex-col max-sm:flex">
          {MEMBERS.map((member, index) => (
            <li
              key={member.id}
              className="relative flex w-full items-center gap-3 border-b border-solid border-gray-100 py-4"
            >
              <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-50">
                <span className="text-[14px] tracking-[-0.35px] text-black">
                  {member.initials}
                </span>
              </div>

              <div className="flex min-w-0 flex-1 items-start justify-between">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] font-bold tracking-[-0.4px] text-gray-950">
                      {member.name}
                    </span>
                    <Badge
                      variant={member.role === 'admin' ? 'admin' : 'member'}
                      size="sm"
                    />
                  </div>
                  <p className="w-[172px] text-[16px] tracking-[-0.4px] text-gray-950">
                    {member.email}
                  </p>
                </div>

                <span className="relative size-6 shrink-0 overflow-hidden">
                  <Image src={icMenu} alt="" fill className="object-contain" />
                </span>
              </div>

              {index === 0 ? (
                <div className="absolute top-12 right-0 z-10 flex w-[110px] flex-col items-start justify-center overflow-hidden border border-solid border-gray-100 bg-white">
                  <div className="flex h-[50px] w-full items-center py-2 pr-5 pl-4">
                    <span className="text-center text-[16px] tracking-[-0.4px] text-gray-950">
                      권한 변경
                    </span>
                  </div>
                </div>
              ) : null}
            </li>
          ))}
        </ul>

        <Pagination />
      </section>

      <div className="fixed right-0 bottom-0 left-0 z-20 hidden bg-white p-6 max-sm:flex">
        <Button type="button" className="w-full">
          회원 초대하기
        </Button>
      </div>

      <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/20 p-6 max-sm:items-end max-sm:p-0">
        <InviteMemberModal />
      </div>
    </main>
  );
}
