'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { ApiError } from '@/lib/api';
import { useProfile } from '@/features/user/hooks/useProfile';
import { useUserMutations } from '@/features/user/hooks/useUserMutations';
import type { Role } from '@/features/auth/types/auth.types';

const ROLE_LABEL: Record<Role, string> = {
  SUPER_ADMIN: '최고 관리자',
  ADMIN: '관리자',
  USER: '일반',
};

// 회원가입 폼(signup/page.tsx)과 동일한 규칙 — BE는 일치 여부만 검사하고 강도는
// 강제하지 않아서, 이 검사는 순수 클라이언트 UX용이다.
const PASSWORD_REGEX =
  /^(?=(?:.*[A-Za-z].*[0-9])|(?=.*[A-Za-z].*[@$!%*?&])|(?=.*[0-9].*[@$!%*?&]))[A-Za-z\d@$!%*?&]{8,}$/;

const getNewPasswordError = (newPassword: string, newPasswordConfirm: string) => {
  if (newPassword !== newPasswordConfirm) {
    return '새 비밀번호와 확인이 일치하지 않습니다.';
  }
  if (newPassword.length < 8 || newPassword.length > 20) {
    return '비밀번호는 8자 이상 20자 이하여야 합니다.';
  }
  if (!PASSWORD_REGEX.test(newPassword)) {
    return '비밀번호는 영문, 숫자, 특수문자 중 두 가지 이상 포함해야 합니다.';
  }
  return null;
};

export default function UserProfilePage() {
  const { data: profile, isLoading } = useProfile();
  const { updatePasswordMutation } = useUserMutations();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage(null);

    if (!currentPassword || !newPassword || !newPasswordConfirm) {
      setFieldError('모든 필드를 입력해주세요.');
      return;
    }

    const validationError = getNewPasswordError(newPassword, newPasswordConfirm);
    if (validationError) {
      setFieldError(validationError);
      return;
    }

    setFieldError(null);
    updatePasswordMutation.mutate(
      { currentPassword, newPassword, newPasswordConfirm },
      {
        onSuccess: () => {
          setCurrentPassword('');
          setNewPassword('');
          setNewPasswordConfirm('');
          setSuccessMessage('비밀번호가 변경되었습니다.');
        },
        onError: (error) => {
          setFieldError(
            error instanceof ApiError
              ? error.message
              : '비밀번호 변경에 실패했습니다.',
          );
        },
      },
    );
  };

  return (
    <div className="min-h-[calc(100vh-90px)] bg-white max-lg:min-h-[calc(100vh-100px)] max-sm:min-h-[calc(100vh-56px)]">
      <main className="flex min-h-[calc(100vh-90px)] flex-col items-center justify-center px-6 py-10 max-lg:min-h-[calc(100vh-100px)] max-sm:min-h-[calc(100vh-56px)]">
        <section className="flex w-full max-w-[600px] flex-col gap-5 rounded-[2px] bg-white px-0 py-0 max-lg:px-[60px] max-lg:py-10 max-lg:shadow-[0_0_40px_rgba(0,0,0,0.1)] md:px-[60px] md:py-10 md:shadow-[0_0_40px_rgba(0,0,0,0.1)] max-sm:px-0 max-sm:py-0 max-sm:shadow-none">
          <h1 className="text-[24px] font-bold tracking-[-0.6px] text-gray-950 max-sm:text-[20px] max-sm:tracking-[-0.5px]">
            내 프로필 변경
          </h1>

          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-[30px]">
            <div className="flex w-full flex-col gap-5">
              <Input
                floatingLabel="기업명"
                value={isLoading ? '' : (profile?.companyName ?? '')}
                disabled
              />
              <Input
                floatingLabel="권한"
                value={isLoading ? '' : ROLE_LABEL[profile?.role ?? 'USER']}
                disabled
              />
              <Input
                floatingLabel="이름"
                value={isLoading ? '' : (profile?.name ?? '')}
                disabled
              />
              <Input
                floatingLabel="이메일"
                value={isLoading ? '' : (profile?.email ?? '')}
                disabled
              />
              <Input
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                placeholder="현재 비밀번호를 입력해주세요"
                showPasswordToggle
                autoComplete="current-password"
              />
              <Input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="새 비밀번호를 입력해주세요"
                showPasswordToggle
                autoComplete="new-password"
              />
              <Input
                type="password"
                value={newPasswordConfirm}
                onChange={(event) => setNewPasswordConfirm(event.target.value)}
                placeholder="새 비밀번호를 한번 더 입력해주세요"
                showPasswordToggle
                autoComplete="new-password"
              />
              {fieldError ? (
                <p className="px-1 text-[14px] tracking-[-0.35px] text-red-500">
                  {fieldError}
                </p>
              ) : null}
              {successMessage ? (
                <p className="px-1 text-[14px] tracking-[-0.35px] text-secondary-500">
                  {successMessage}
                </p>
              ) : null}
            </div>

            <Button type="submit" disabled={updatePasswordMutation.isPending}>
              {updatePasswordMutation.isPending ? '변경 중...' : '변경하기'}
            </Button>
          </form>
        </section>
      </main>
    </div>
  );
}
