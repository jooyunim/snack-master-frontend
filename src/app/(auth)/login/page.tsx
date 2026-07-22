'use client';

import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/icons/logo.svg';
import Button from '@/components/Button';
import Input from '@/components/Input';

const LoginPage = () => {
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

            <form className="flex w-full flex-col items-center gap-6">
              <div className="flex w-full flex-col gap-[30px]">
                <div className="flex w-full flex-col gap-5">
                  <Input
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    autoComplete="email"
                  />
                  <Input
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    autoComplete="current-password"
                  />
                </div>

                <Button type="submit">로그인</Button>
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
