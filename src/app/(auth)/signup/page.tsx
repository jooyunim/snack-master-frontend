'use client';

import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/icons/logo.svg';
import Button from '@/components/Button';
import Gnb from '@/components/Gnb';
import Input from '@/components/Input';

const SignupPage = () => {
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
                김스낵 님, 만나서 반갑습니다.
              </h1>
              <p className="text-[14px] tracking-[-0.35px] text-gray-600 md:text-[16px] md:tracking-[-0.4px]">
                비밀번호를 입력해 회원가입을 완료해주세요
              </p>
            </div>

            <form className="flex w-full flex-col items-center gap-6">
              <div className="flex w-full flex-col gap-[30px]">
                <div className="flex w-full flex-col gap-5">
                  <Input
                    floatingLabel="이메일"
                    value="codeit@demail.com"
                    disabled
                  />
                  <Input
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    showPasswordToggle

                    autoComplete="new-password"
                  />
                  <Input
                    type="password"
                    placeholder="비밀번호를 한 번 더 입력해주세요"
                    showPasswordToggle

                    autoComplete="new-password"
                  />
                </div>

                <Button type="submit">가입하기</Button>
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
