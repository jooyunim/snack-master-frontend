'use client';

import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/icons/logo.svg';
import Button from '@/components/Button';
import Gnb from '@/components/Gnb';
import Input from '@/components/Input';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  adminSignupSchema,
  type AdminSignupFormValues,
} from '@/features/auth/schemas/auth';
import { adminSignupApi } from '@/features/auth/services/auth.api';

const SignupPage = () => {
  const [signupError, setSignupError] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AdminSignupFormValues>({
    resolver: zodResolver(adminSignupSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      companyName: '',
      businessNumber: '',
    },
  });

  const mutate = useMutation({
    mutationFn: ({
      email,
      name,
      password,
      passwordConfirm,
      companyName,
      businessNumber,
    }: AdminSignupFormValues) =>
      adminSignupApi(
        email,
        name,
        password,
        passwordConfirm,
        companyName,
        businessNumber
      ),
    onSuccess: () => {
      router.push('/login');
    },
    onError: (error) => {
      setSignupError(error.message);
    },
  });

  const onValid = (values: AdminSignupFormValues) => {
    if (mutate.isPending) return;
    setSignupError(null);
    mutate.mutate(values);
  };

  return (
    <div className="relative min-h-screen bg-white">
      <Gnb className="absolute left-0 top-0 z-10" />

      <main className="flex min-h-screen flex-col items-center px-6 pb-10 pt-[115px] md:justify-center md:px-4 md:pt-[90px]">
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

          <section className="relative z-[1] flex w-full flex-col gap-[30px] rounded-[2px] bg-white md:gap-5 md:px-[60px] md:py-10 md:shadow-[0_0_40px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col gap-2.5">
              <h1 className="text-[20px] font-bold tracking-[-0.5px] text-gray-950 md:text-[24px] md:tracking-[-0.6px]">
                기업 담당자 회원가입
              </h1>
              <p className="text-[14px] tracking-[-0.35px] text-gray-600 md:text-[16px] md:tracking-[-0.4px]">
                * 그룹 내 유저는 기업 담당자의 초대 메일을 통해 가입이
                가능합니다.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onValid)}
              className="flex w-full flex-col items-center gap-6"
            >
              <div className="flex w-full flex-col gap-[30px]">
                <div className="flex w-full flex-col gap-5">
                  <div className="flex w-full flex-col gap-2">
                    <Input
                      {...register('name')}
                      placeholder="이름(기업 담당자)을 입력해주세요."
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p className="px-1 text-[14px] tracking-[-0.35px] text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="flex w-full flex-col gap-2">
                    <Input
                      {...register('email')}
                      type="email"
                      placeholder="이메일을 입력해주세요."
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="px-1 text-[14px] tracking-[-0.35px] text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="flex w-full flex-col gap-2">
                    <Input
                      {...register('password')}
                      type="password"
                      placeholder="비밀번호를 입력해주세요"
                      autoComplete="new-password"
                      showPasswordToggle
                    />
                    {errors.password && (
                      <p className="px-1 text-[14px] tracking-[-0.35px] text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="flex w-full flex-col gap-2">
                    <Input
                      {...register('passwordConfirm')}
                      type="password"
                      placeholder="비밀번호를 한 번 더 입력해주세요"
                      autoComplete="new-password"
                      showPasswordToggle
                    />
                    {errors.passwordConfirm && (
                      <p className="px-1 text-[14px] tracking-[-0.35px] text-red-500">
                        {errors.passwordConfirm.message}
                      </p>
                    )}
                  </div>

                  <div className="flex w-full flex-col gap-2">
                    <Input
                      {...register('companyName')}
                      placeholder="회사명을 입력해주세요."
                      autoComplete="organization"
                    />
                    {errors.companyName && (
                      <p className="px-1 text-[14px] tracking-[-0.35px] text-red-500">
                        {errors.companyName.message}
                      </p>
                    )}
                  </div>

                  <div className="flex w-full flex-col gap-2">
                    <Input
                      {...register('businessNumber')}
                      inputMode="numeric"
                      placeholder="사업자 번호를 입력해주세요"
                    />
                    {errors.businessNumber && (
                      <p className="px-1 text-[14px] tracking-[-0.35px] text-red-500">
                        {errors.businessNumber.message}
                      </p>
                    )}
                  </div>
                </div>
                {signupError ? (
                  <p className="px-1 text-[14px] tracking-[-0.35px] text-red-500">
                    {signupError}
                  </p>
                ) : null}
                <Button type="submit" disabled={!isValid || mutate.isPending}>
                  {mutate.isPending ? '가입 중...' : '가입하기'}
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
    </div>
  );
};

export default SignupPage;
