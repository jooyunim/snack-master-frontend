'use client';

import Image from 'next/image';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Pagination from '@/components/Pagination';
import icSearch from '@/assets/icons/ic_search.svg';
import icMenu from '@/assets/icons/ic_menu.svg';
import InviteMemberModal, {
  type InviteMemberModalMode,
} from './components/InviteMemberModal';
import AlertModal from '@/components/AlertModal';
import icWarning from '@/assets/icons/ic_!.svg';
import { useDebounce } from '@/features/member/hooks/useDebounce';
import { useInviteUser } from '@/features/member/hooks/useInviteUser';
import { useUpdateUserRole } from '@/features/member/hooks/useUpdateUserRole';
import { useEffect, useRef, useState } from 'react';
import EmptyState from '@/components/EmptyState';
import { Member } from '@/features/member/types/members.type';
import { useDeleteUser } from '@/features/member/hooks/useDeleteUser';
import { useUsers } from '@/features/member/hooks/useUsers';
import { useQueryPagination } from '@/features/member/hooks/useQueryPagination';

//아바타용 이니셜 뽑는 함수
const getInitials = (name: string) => name.trim().slice(0, 1) || '?';

const getMemberBadgeVariant = (role: Member['role']) => {
  if (role === 'ADMIN') return 'admin';
  if (role === 'SUPER_ADMIN') return 'superAdmin';
  return 'member';
};

export default function MembersPage() {
  const { page, setPage, search, setSearch } = useQueryPagination();
  const [searchInput, setSearchInput] = useState(search);
  const [pageSize] = useState(15);
  const [modalMode, setModalMode] = useState<InviteMemberModalMode | null>(
    null
  );
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);
  const [openMenuMemberId, setOpenMenuMemberId] = useState<string | null>(null);
  const [successAlert, setSuccessAlert] = useState<
    'invite' | 'editRole' | null
  >(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const debouncedSearch = useDebounce(searchInput, 300).trim();
  const skipSearchSyncRef = useRef(false);

  useEffect(() => {
    if (debouncedSearch === search) return;
    skipSearchSyncRef.current = true;
    setSearch(debouncedSearch);
  }, [debouncedSearch, search, setSearch]);

  useEffect(() => {
    if (skipSearchSyncRef.current) {
      skipSearchSyncRef.current = false;
      return;
    }
    setSearchInput(search);
  }, [search]);

  const openInviteModal = () => {
    setOpenMenuMemberId(null);
    setSelectedMember(null);
    setModalMode('invite');
  };

  const openEditRoleModal = (member: Member) => {
    setOpenMenuMemberId(null);
    setSelectedMember(member);
    setModalMode('editRole');
  };

  const closeInviteModal = () => {
    setModalMode(null);
    setSelectedMember(null);
  };

  const openDeleteAlert = (member: Member) => {
    setOpenMenuMemberId(null);
    setMemberToDelete(member);
  };

  const closeDeleteAlert = () => {
    setMemberToDelete(null);
  };

  const toggleMemberMenu = (memberId: string) => {
    setOpenMenuMemberId((prev) => (prev === memberId ? null : memberId));
  };

  const getErrorMessage = (error: unknown, fallback: string) =>
    error instanceof Error && error.message ? error.message : fallback;

  const { data, isLoading, isError, refetch } = useUsers(
    debouncedSearch,
    page,
    pageSize
  );

  const MEMBERS = data?.members ?? [];
  const totalUsers = data?.total ?? 0;
  const totalPages = Math.ceil(totalUsers / pageSize);

  const { inviteUsersMutation, isInviteUsersPending } = useInviteUser();
  const { updateMemberRoleMutation, isUpdateMemberRolePending } =
    useUpdateUserRole();

  const { deleteMemberMutation, isDeletePending } = useDeleteUser();

  const isPending = isInviteUsersPending || isUpdateMemberRolePending;

  const handleUpdateMemberRole = (id: string, role: Member['role']) => {
    updateMemberRoleMutation(
      { id, role },
      {
        onSuccess: () => {
          closeInviteModal();
          setSuccessAlert('editRole');
        },
        onError: (error) => {
          setErrorMessage(getErrorMessage(error, '권한 변경에 실패했습니다.'));
        },
      }
    );
  };

  const handleInviteUsers = (
    email: string,
    name: string,
    role: Member['role']
  ) => {
    inviteUsersMutation(
      { email, name, role },
      {
        onSuccess: () => {
          closeInviteModal();
          setSuccessAlert('invite');
        },
        onError: (error) => {
          setErrorMessage(getErrorMessage(error, '회원 초대에 실패했습니다.'));
        },
      }
    );
  };

  const handleConfirmDelete = () => {
    if (!memberToDelete) return;
    deleteMemberMutation(memberToDelete.id, {
      onSuccess: () => {
        closeDeleteAlert();
        if (MEMBERS.length === 1 && page > 1) {
          setPage(page - 1); // 현재 페이지가 1이면, 이전 페이지로 이동
        }
      },
      onError: (error) => {
        setErrorMessage(getErrorMessage(error, '회원 탈퇴에 실패했습니다.'));
      },
    });
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-[16px] tracking-[-0.4px] text-gray-600">
          회원을 불러오는 중입니다...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-[16px] tracking-[-0.4px] text-gray-600">
          회원 조회에 실패하였습니다. 다시 시도해주세요.
        </p>
        <button
          onClick={() => refetch()}
          className="text-[16px] tracking-[-0.4px] text-gray-600 underline max-sm:text-[14px] max-sm:tracking-[-0.35px] cursor-pointer"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <main className="relative flex w-full max-w-[960px] flex-col gap-10 max-lg:max-w-none max-sm:gap-6 max-sm:pb-[112px]">
      <section className="flex w-full flex-col gap-6 max-sm:gap-3">
        <div className="flex w-full items-start justify-between gap-4">
          <h1 className="text-[24px] font-bold tracking-[-0.6px] text-black max-sm:text-[18px] max-sm:tracking-[-0.45px]">
            회원 관리
          </h1>
          <Button
            type="button"
            className="h-16 !w-[200px] shrink-0 max-sm:hidden"
            onClick={openInviteModal}
          >
            회원 초대하기
          </Button>
        </div>

        <div className="flex w-full items-center gap-2 border-b border-solid border-gray-900 py-2 pl-2 pr-3 max-sm:gap-3 max-sm:px-0 max-sm:py-3">
          <span className="relative size-6 shrink-0 overflow-hidden">
            <Image src={icSearch} alt="" fill className="object-contain" />
          </span>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="search"
            placeholder="이름/이메일로 검색하세요"
            className="w-full bg-transparent text-[18px] tracking-[-0.45px] text-gray-950 outline-none placeholder:text-gray-400 max-sm:text-[16px] max-sm:tracking-[-0.4px]"
          />
        </div>
      </section>

      <section className="flex w-full flex-col gap-6">
        {MEMBERS.length === 0 ? (
          <div className="flex w-full justify-center py-20 max-sm:py-10">
            {debouncedSearch ? (
              <EmptyState
                title="검색 결과가 없습니다."
                description="다른 검색어를 시도해주세요."
              />
            ) : (
              <EmptyState
                title="아직 회원이 없습니다."
                description={
                  '함께 이용할 회원을 초대하고\n간식 구매를 통합 관리하세요.'
                }
                buttonLabel="회원 초대하기"
                onButtonClick={openInviteModal}
              />
            )}
          </div>
        ) : (
          <>
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
                  className="flex h-[100px] w-full items-center gap-20 border-b border-solid border-gray-100 bg-white px-5 hover:bg-gray-25 max-lg:gap-8"
                >
                  <div className="flex shrink-0 items-center gap-5 max-lg:gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-50">
                      <span className="text-[10px] tracking-[-0.25px] text-black">
                        {getInitials(member.name)}
                      </span>
                    </div>
                    <span className="w-[90px] text-[16px] font-normal tracking-[-0.4px] text-gray-950 max-lg:w-20">
                      {member.name}
                    </span>
                  </div>

                  <p className="min-w-0 flex-1 text-[16px] tracking-[-0.4px] text-gray-950">
                    {member.email}
                  </p>

                  <div className="flex w-[72px] shrink-0 justify-center">
                    <Badge
                      variant={getMemberBadgeVariant(member.role)}
                      className="w-16"
                    />
                  </div>

                  <div className="flex w-[200px] shrink-0 items-center gap-2">
                    <Button
                      onClick={() => openEditRoleModal(member)}
                      type="button"
                      variant="sub"
                      className="w-[96px]"
                      disabled={isPending}
                    >
                      권한 변경
                    </Button>
                    <button
                      type="button"
                      onClick={() => openDeleteAlert(member)}
                      className="inline-flex w-[96px] items-center justify-center whitespace-nowrap rounded-[2px] border border-solid border-red bg-red px-5 py-3 text-center text-[16px] font-normal tracking-[-0.4px] text-white"
                    >
                      계정 탈퇴
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Mobile card list */}
            <ul className="hidden w-full flex-col max-sm:flex">
              {MEMBERS.map((member) => (
                <li
                  key={member.id}
                  className="relative flex w-full items-center gap-3 border-b border-solid border-gray-100 py-4"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-50">
                    <span className="text-[14px] tracking-[-0.35px] text-black">
                      {getInitials(member.name)}
                    </span>
                  </div>

                  <div className="flex min-w-0 flex-1 items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] font-bold tracking-[-0.4px] text-gray-950">
                          {member.name}
                        </span>
                        <Badge
                          variant={getMemberBadgeVariant(member.role)}
                          size="sm"
                        />
                      </div>
                      <p className="w-[172px] text-[16px] tracking-[-0.4px] text-gray-950">
                        {member.email}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleMemberMenu(member.id)}
                      type="button"
                      className="relative size-6 shrink-0 overflow-hidden"
                      aria-label="메뉴 열기"
                    >
                      <Image
                        src={icMenu}
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </button>
                  </div>

                  {openMenuMemberId === member.id && (
                    <div className="absolute top-12 right-0 z-10 flex w-[110px] flex-col items-start justify-center overflow-hidden border border-solid border-gray-100 bg-white">
                      <button
                        type="button"
                        onClick={() => openEditRoleModal(member)}
                        className="flex h-[50px] w-full items-center py-2 pr-5 pl-4 text-center text-[16px] tracking-[-0.4px] text-gray-950"
                      >
                        권한 변경
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <Pagination
              page={page}
              totalPages={Math.max(totalPages, 1)}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </section>

      <div className="fixed right-0 bottom-0 left-0 z-20 hidden bg-white p-6 max-sm:flex">
        <Button type="button" className="w-full" onClick={openInviteModal}>
          회원 초대하기
        </Button>
      </div>

      {modalMode && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/20 p-6"
          onClick={closeInviteModal}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <InviteMemberModal
              mode={modalMode}
              member={selectedMember}
              isPending={isPending}
              onClose={closeInviteModal}
              onConfirm={({ email, name, role }) => {
                if (modalMode === 'editRole') {
                  if (!selectedMember) return;
                  handleUpdateMemberRole(selectedMember.id, role);
                  return;
                } else {
                  handleInviteUsers(email, name, role);
                }
              }}
            />
          </div>
        </div>
      )}

      {memberToDelete && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/20 p-6"
          onClick={closeDeleteAlert}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AlertModal
              icon={icWarning}
              title="회원 탈퇴"
              content={'정말 탈퇴시키겠습니까?\n탈퇴 후 복구할 수 없습니다.'}
              cancelLabel="취소"
              confirmLabel="탈퇴시키기"
              confirmDisabled={isDeletePending}
              onCancel={closeDeleteAlert}
              onConfirm={handleConfirmDelete}
            />
          </div>
        </div>
      )}

      {successAlert && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/20 p-6"
          onClick={() => setSuccessAlert(null)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AlertModal
              icon={icWarning}
              title={successAlert === 'invite' ? '회원 초대' : '권한 변경'}
              content={
                successAlert === 'invite'
                  ? '회원 초대에 성공했습니다.'
                  : '권한 변경에 성공했습니다.'
              }
              confirmLabel="확인"
              showCancel={false}
              onConfirm={() => setSuccessAlert(null)}
            />
          </div>
        </div>
      )}

      {errorMessage && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/20 p-6"
          onClick={() => setErrorMessage(null)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AlertModal
              icon={icWarning}
              title="요청 실패"
              content={errorMessage}
              confirmLabel="확인"
              showCancel={false}
              onConfirm={() => setErrorMessage(null)}
            />
          </div>
        </div>
      )}
    </main>
  );
}
