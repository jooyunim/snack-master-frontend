'use client';

import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/icons/logo.svg';
import Button from '@/components/Button';
import Gnb from '@/components/Gnb';
import Input from '@/components/Input';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

const getPasswordError = (password: string, passwordConfirm: string) => {
  if (!password || !passwordConfirm) {
    return '비밀번호와 비밀번호 확인이 필요합니다.';
  }
  if (password !== passwordConfirm) {
    return '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
  }
  if (password.length < 8 || password.length > 20) {
    return '비밀번호는 8자 이상 20자 이하여야 합니다.';
  }
  if (!PASSWORD_REGEX.test(password)) {
    return '비밀번호는 영문, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다.';
  }
  return null;
};

const SignupPage = () => {
  //이메일 쿼리 파라미터 가져오기
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const router = useRouter();

  const handleSignup = async (token: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup?token=${encodeURIComponent(token)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, passwordConfirm }),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.message || '서버로부터 응답을 받지 못했습니다.');
    }

    const data = await res.json();
    return data.data;
  };

  const getEmailName = async (token: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/get-email-name?token=${encodeURIComponent(token)}`,
      {
        method: 'GET',
      }
    );

    if (!res.ok) {
      throw new Error('서버로부터 이름, 이메일을 받지 못했습니다.');
    }

    const data = await res.json();
    return data.data;
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ['getEmailName', token],
    queryFn: () => getEmailName(token as string),
    enabled: !!token,
  });

  const mutate = useMutation({
    mutationFn: handleSignup,
    onSuccess: () => {
      router.push('/login');
    },
    onError: (error) => {
      setPasswordError(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mutate.isPending || !token) {
      return;
    }

    const error = getPasswordError(password, passwordConfirm);
    if (error) {
      setPasswordError(error);
      return;
    }

    setPasswordError(null);
    mutate.mutate(token);
  };

  //초대링크가 없을 때
  // if (!token) {
  //   return (
  //     <div className="text-center text-[16px] tracking-[-0.4px] text-gray-950">
  //       초대 링크를 다시 확인해 주세요
  //     </div>
  //   );
  // }

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

          <section className="relative z-[1] flex w-full flex-col gap-[46px] rounded-[2px] bg-white md:gap-5 md:px-[60px] md:py-10 md:shadow-[0_0_40px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col items-center gap-2.5 text-center">
              <h1 className="text-[18px] font-bold tracking-[-0.45px] text-gray-950 md:text-[24px] md:tracking-[-0.6px]">
                {isPending
                  ? '로딩 중...'
                  : isError || !data?.name
                    ? '초대 링크를 확인해 주세요'
                    : `${data?.name} 님, 만나서 반갑습니다.`}
                {}
              </h1>
              <p className="text-[14px] tracking-[-0.35px] text-gray-600 md:text-[16px] md:tracking-[-0.4px]">
                비밀번호를 입력해 회원가입을 완료해주세요
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col items-center gap-6"
            >
              <div className="flex w-full flex-col gap-[30px]">
                <div className="flex w-full flex-col gap-5">
                  <Input floatingLabel="이메일" disabled value={data?.email} />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError(null);
                    }}
                    placeholder="비밀번호를 입력해주세요"
                    showPasswordToggle
                    autoComplete="new-password"
                  />
                  <div className="flex w-full flex-col gap-2">
                    <Input
                      type="password"
                      value={passwordConfirm}
                      onChange={(e) => {
                        setPasswordConfirm(e.target.value);
                        setPasswordError(null);
                      }}
                      placeholder="비밀번호를 한 번 더 입력해주세요"
                      showPasswordToggle
                      autoComplete="new-password"
                    />
                    {passwordError ? (
                      <p className="px-1 text-[14px] tracking-[-0.35px] text-red-500">
                        {passwordError}
                      </p>
                    ) : null}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={mutate.isPending || !token || isPending || isError}
                >
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
