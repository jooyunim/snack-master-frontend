import Button from '@/components/Button';
import Input from '@/components/Input';

export default function UserProfilePage() {
  return (
    <div className="min-h-[calc(100vh-90px)] bg-white max-lg:min-h-[calc(100vh-100px)] max-sm:min-h-[calc(100vh-56px)]">
      <main className="flex min-h-[calc(100vh-90px)] flex-col items-center justify-center px-6 py-10 max-lg:min-h-[calc(100vh-100px)] max-sm:min-h-[calc(100vh-56px)]">
        <section className="flex w-full max-w-[600px] flex-col gap-5 rounded-[2px] bg-white px-0 py-0 max-lg:px-[60px] max-lg:py-10 max-lg:shadow-[0_0_40px_rgba(0,0,0,0.1)] md:px-[60px] md:py-10 md:shadow-[0_0_40px_rgba(0,0,0,0.1)] max-sm:px-0 max-sm:py-0 max-sm:shadow-none">
          <h1 className="text-[24px] font-bold tracking-[-0.6px] text-gray-950 max-sm:text-[20px] max-sm:tracking-[-0.5px]">
            내 프로필 변경
          </h1>

          <form className="flex w-full flex-col gap-[30px]">
            <div className="flex w-full flex-col gap-5">
              <Input floatingLabel="기업명" value="코드잇" disabled />
              <Input floatingLabel="권한" value="최고 관리자" disabled />
              <Input floatingLabel="이름" value="김스낵" disabled />
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
                placeholder="비밀번호를 한번 더 입력해주세요"
                showPasswordToggle
                autoComplete="new-password"
              />
            </div>

            <Button type="submit" disabled>
              변경하기
            </Button>
          </form>
        </section>
      </main>
    </div>
  );
}
