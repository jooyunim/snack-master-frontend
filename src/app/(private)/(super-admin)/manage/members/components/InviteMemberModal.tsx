'use client';

import Image from 'next/image';
import { useState } from 'react';
import Button from '@/components/Button';
import icChevronUp from '@/assets/icons/ic_chevron_up.svg';
import icChevronDown from '@/assets/icons/ic_chevron_down.svg';
import { MemberRole } from '../page';

export type InviteMemberModalMode = 'invite' | 'editRole';

type RoleOption = {
  value: MemberRole;
  label: string;
};

const ROLE_OPTIONS: RoleOption[] = [
  { value: 'USER', label: '일반 사용자' },
  { value: 'ADMIN', label: '관리자' },
];

type InviteMemberModalProps = {
  mode: InviteMemberModalMode;
  onClose: () => void;
  member?: {
    name: string;
    email: string;
    role?: MemberRole;
  } | null;
  onConfirm: (payload: {
    email: string;
    name: string;
    role: MemberRole;
  }) => void;
  isPending?: boolean;
};

export default function InviteMemberModal({
  mode,
  onClose,
  member,
  onConfirm,
  isPending,
}: InviteMemberModalProps) {
  const isEditRole = mode === 'editRole';
  const title = isEditRole ? '권한 변경' : '회원 초대';
  const confirmLabel = isEditRole ? '변경하기' : '초대하기';

  const [name, setName] = useState(member?.name ?? '');
  const [email, setEmail] = useState(member?.email ?? '');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleOption>(
    ROLE_OPTIONS.find((option) => option.value === member?.role) ??
      ROLE_OPTIONS[1]
  );

  const toggleRoleDropdown = () => {
    setIsRoleDropdownOpen((prev) => !prev);
  };

  const handleSelectRole = (role: RoleOption) => {
    setSelectedRole(role);
    setIsRoleDropdownOpen(false);
  };

  const handleConfirm = () => {
    onConfirm({
      email: email.trim(),
      name: name.trim(),
      role: selectedRole.value,
    });
  };

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
        {title}
      </h2>

      <div className="flex w-full flex-col gap-9">
        <div className="flex w-full flex-col gap-7">
          <div className="flex w-full flex-col gap-5">
            <div className="flex h-14 w-full flex-col justify-end gap-[5px] border-b border-solid border-gray-600 px-1 py-2">
              <span className="text-[12px] tracking-[-0.3px] text-gray-400">
                이름
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                readOnly={isEditRole}
                disabled={isEditRole}
                placeholder="이름을 입력하세요"
                className="w-full bg-transparent text-[16px] tracking-[-0.4px] text-gray-700 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:text-gray-500"
              />
            </div>

            <div className="flex h-14 w-full flex-col justify-end gap-[5px] border-b border-solid border-gray-600 px-1 py-2">
              <span className="text-[12px] tracking-[-0.3px] text-gray-400">
                이메일
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={isEditRole}
                disabled={isEditRole}
                placeholder="이메일을 입력하세요"
                className="w-full bg-transparent text-[16px] tracking-[-0.4px] text-gray-700 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:text-gray-500"
              />
            </div>
          </div>

          <div className="relative flex w-full flex-col gap-3">
            <p className="text-[16px] font-bold tracking-[-0.4px] text-gray-950">
              권한
            </p>
            <button
              type="button"
              onClick={toggleRoleDropdown}
              aria-expanded={isRoleDropdownOpen}
              aria-haspopup="listbox"
              className="flex h-11 w-full items-center justify-between border border-solid border-gray-100 bg-white px-4 py-2.5"
            >
              <span className="text-[16px] tracking-[-0.4px] text-gray-950">
                {selectedRole.label}
              </span>
              <span className="relative size-4 shrink-0 overflow-hidden">
                <Image
                  src={isRoleDropdownOpen ? icChevronDown : icChevronUp}
                  alt=""
                  fill
                  className="object-contain"
                />
              </span>
            </button>

            {isRoleDropdownOpen && (
              <ul
                role="listbox"
                className="absolute top-[calc(100%+4px)] left-0 z-10 flex w-full flex-col overflow-hidden border border-solid border-gray-100 bg-white"
              >
                {ROLE_OPTIONS.map((role) => (
                  <li
                    key={role.value}
                    role="option"
                    aria-selected={selectedRole.value === role.value}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectRole(role)}
                      className={`flex h-[50px] w-full items-center px-4 text-left text-[16px] tracking-[-0.4px] hover:bg-gray-25 ${
                        selectedRole.value === role.value
                          ? 'font-bold text-gray-950'
                          : 'text-gray-950'
                      }`}
                    >
                      {role.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex w-full items-center gap-5">
          <Button
            variant="line"
            className="min-w-0 flex-1"
            onClick={onClose}
            disabled={isPending}
          >
            취소
          </Button>
          <Button
            variant="filled"
            className="min-w-0 flex-1"
            onClick={handleConfirm}
            disabled={isPending}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
