'use client';

import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/icons/logo.svg';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useMutation } from '@tanstack/react-query';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const { login, isAuthChecked } = useAuth();

  const router = useRouter();

  const mutate = useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.push('/products');
    },
    onError: (error) => {
      const message = error.message;
      setLoginError(null);
      setEmailError(null);
      setPasswordError(null);

      if (message.includes('이메일')) {
        setEmailError(message);
      } else if (message.includes('비밀번호')) {
        setPasswordError(message);
      } else {
        setLoginError(message);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mutate.isPending) return;

    setLoginError(null);
    setEmailError(null);
    setPasswordError(null);
    mutate.mutate({ email, password });
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

          <section className="relative z-[1] flex w-full flex-col gap-2.5 rounded-[2px] bg-white md:gap-5 md:px-[60px] md:py-10 md:shadow-[0_0_40px_rgba(0,0,0,0.1)]">
            <h1 className="text-[20px] font-bold tracking-[-0.5px] text-gray-950 md:text-[24px] md:tracking-[-0.6px]">
              로그인
            </h1>

            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col items-center gap-6"
            >
              <div className="flex w-full flex-col gap-[30px]">
                <div className="flex w-full flex-col gap-5">
                  <Input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setLoginError(null);
                      setEmailError(null);
                      setPasswordError(null);
                    }}
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    autoComplete="email"
                  />
                  {emailError ? (
                    <p className="px-1 text-[14px] tracking-[-0.35px] text-red-500">
                      {emailError}
                    </p>
                  ) : null}
                  <div className="flex w-full flex-col gap-2">
                    <Input
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setLoginError(null);
                        setEmailError(null);
                        setPasswordError(null);
                      }}
                      type="password"
                      placeholder="비밀번호를 입력해주세요"
                      autoComplete="current-password"
                      showPasswordToggle
                    />
                    {passwordError ? (
                      <p className="px-1 text-[14px] tracking-[-0.35px] text-red-500">
                        {passwordError}
                      </p>
                    ) : null}
                  </div>
                </div>
                {loginError ? (
                  <p className="px-1 text-[14px] tracking-[-0.35px] text-red-500">
                    {loginError}
                  </p>
                ) : null}
                <Button
                  type="submit"
                  disabled={!isAuthChecked || mutate.isPending}
                >
                  {mutate.isPending ? '로그인 중...' : '로그인'}
                </Button>
              </div>

              <p className="flex items-center justify-center gap-1 text-[16px] tracking-[-0.4px]">
                <span className="text-gray-400">기업 담당자이신가요?</span>
                <Link
                  href="/signup"
                  className="font-bold text-gray-950 underline"
                >
                  가입하기
                </Link>
              </p>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
