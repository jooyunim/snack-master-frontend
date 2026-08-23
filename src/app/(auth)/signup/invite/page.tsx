'use client';

import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/icons/logo.svg';
import icWarning from '@/assets/icons/ic_!.svg';
import AlertModal from '@/components/AlertModal';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  inviteSignupSchema,
  type InviteSignupFormValues,
} from '@/features/auth/schemas/auth';
import { useInviteSignup } from '@/features/auth/hooks/useInviteSignup';
import { useEmailName } from '@/features/auth/hooks/useEmailName';

const SignupPage = () => {
  //이메일 쿼리 파라미터 가져오기
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [signupError, setSignupError] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InviteSignupFormValues>({
    resolver: zodResolver(inviteSignupSchema),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });

  const { data, isPending, isError, error } = useEmailName({ token });

  const showInviteAlert = !token || isError;
  const inviteAlertContent = !token
    ? '초대 링크를 다시 확인해 주세요'
    : (error?.message ?? '초대 링크를 다시 확인해 주세요');

  const { inviteSignupMutation } = useInviteSignup({
    onSuccess: () => {
      router.push('/login');
    },
    onError: (error) => {
      setSignupError(error.message);
    },
  });

  const onValid = (values: InviteSignupFormValues) => {
    if (inviteSignupMutation.isPending || !token) return;
    setSignupError(null);
    inviteSignupMutation.mutate({
      token,
      ...values,
    });
  };

  const onInvalid = () => {
    setSignupError(null);
  };

  const clearSignupError = () => {
    if (signupError) setSignupError(null);
  };

  return (
    <div className="relative min-h-screen bg-white">
      <main className="flex min-h-screen flex-col items-center px-6 pb-10 pt-[139px] md:justify-center md:px-4 md:pt-0">
        <div className="relative flex w-full max-w-[600px] flex-col items-center">
          <div className="relative h-[140px] w-full shrink-0 overflow-hidden md:mb-[-62px] md:h-[214px] md:max-w-[500px]">
            <Image
              src={logo}
              alt="Snack"
              fill
              className="object-contain"
              priority
            />
          </div>

          <section className="relative z-[1] flex w-full flex-col gap-[46px] rounded-[2px] bg-white md:gap-5 md:px-[60px] md:py-10 md:shadow-[0_0_40px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col items-center gap-2.5 text-center">
              <h1 className="text-[18px] font-bold tracking-[-0.45px] text-gray-950 md:text-[24px] md:tracking-[-0.6px]">
                {isPending
                  ? '로딩 중...'
                  : isError || !data?.name
                    ? '초대 링크를 확인해 주세요'
                    : `${data?.name} 님, 만나서 반갑습니다.`}
              </h1>
              <p className="text-[14px] tracking-[-0.35px] text-gray-600 md:text-[16px] md:tracking-[-0.4px]">
                비밀번호를 입력해 회원가입을 완료해주세요
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onValid, onInvalid)}
              className="flex w-full flex-col items-center gap-6"
            >
              <div className="flex w-full flex-col gap-[30px]">
                <div className="flex w-full flex-col gap-5">
                  <Input floatingLabel="이메일" disabled value={data?.email} />
                  <Input
                    {...register('password', { onChange: clearSignupError })}
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    showPasswordToggle
                    autoComplete="new-password"
                  />
                  {errors.password ? (
                    <p className="px-1 text-[14px] tracking-[-0.35px] text-red-500">
                      {errors.password.message}
                    </p>
                  ) : null}
                  <div className="flex w-full flex-col gap-2">
                    <Input
                      {...register('passwordConfirm', {
                        onChange: clearSignupError,
                      })}
                      type="password"
                      placeholder="비밀번호를 한 번 더 입력해주세요"
                      showPasswordToggle
                      autoComplete="new-password"
                    />
                    {errors.passwordConfirm ? (
                      <p className="px-1 text-[14px] tracking-[-0.35px] text-red-500">
                        {errors.passwordConfirm.message}
                      </p>
                    ) : null}
                  </div>
                </div>
                {!errors.password && !errors.passwordConfirm && signupError ? (
                  <p className="px-1 text-[14px] tracking-[-0.35px] text-red-500">
                    {signupError}
                  </p>
                ) : null}
                <Button
                  type="submit"
                  disabled={
                    inviteSignupMutation.isPending ||
                    !token ||
                    isPending ||
                    isError
                  }
                >
                  {inviteSignupMutation.isPending ? '가입 중...' : '가입하기'}
                </Button>
              </div>

              <p className="flex items-center justify-center gap-1 text-[16px] tracking-[-0.4px]">
                <span className="text-gray-400">이미 계정이 있으신가요?</span>
                <Link
                  href="/login"
                  className="font-bold text-gray-950 underline"
                >
                  로그인
                </Link>
              </p>
            </form>
          </section>
        </div>
      </main>

      {showInviteAlert && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/20 p-6"
          onClick={() => router.push('/')}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AlertModal
              icon={icWarning}
              title="초대 링크 확인"
              content={inviteAlertContent}
              confirmLabel="메인페이지"
              showCancel={false}
              onConfirm={() => router.push('/')}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
