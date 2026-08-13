import Image from 'next/image';
import Link from 'next/link';
import Gnb from '@/components/Gnb';
import heroImage from '@/assets/images/image 20.png';
import icArrowRight from '@/assets/icons/ic_arrow_right.svg';

const FEATURE_CARDS = [
  {
    lines: [
      '흩어진 간식 구매처를 통합하고,',
      '회사별 지출을 똑똑하게 관리하세요.',
    ],
  },
  {
    lines: ['관리자와 유저', '모두 이용할 수 있어요.'],
  },
  {
    lines: ['다양한 품목도', '한 눈에 파악해봐요.'],
  },
  {
    lines: ['쉽고 빠르게', '구매를 요청해보세요.'],
  },
  {
    lines: ['여러 플랫폼에서 구매한 간식 내역을', '한 곳에서 쉽게 관리해요'],
  },
] as const;

function FeatureCard({ lines }: { lines: readonly string[] }) {
  return (
    <li className="mr-3 flex shrink-0 list-none items-center justify-center rounded-lg border border-solid border-[#e4e4e4] bg-white/40 px-6 py-5 shadow-[0px_7px_20px_0px_rgba(0,0,0,0.02)] backdrop-blur-[20px] sm:mr-5 sm:px-[30px] sm:py-6 lg:mr-10 lg:p-[30px]">
      <p className="whitespace-nowrap text-[12px] font-normal leading-normal tracking-[-0.3px] text-[#808080] sm:text-[13px] sm:tracking-[-0.325px] lg:text-[16px] lg:font-medium lg:leading-[1.6] lg:tracking-[-0.4px]">
        {lines.map((line, index) => (
          <span key={line}>
            {line}
            {index < lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </p>
    </li>
  );
}

/** 한 세트만으로는 뷰포트보다 짧아 루프 끝에 빈 구간이 생김 → 세트를 충분히 반복한 뒤 2배로 복제 */
const MARQUEE_SEQUENCE = [...FEATURE_CARDS, ...FEATURE_CARDS, ...FEATURE_CARDS];

function FeatureMarquee() {
  const cards = [...MARQUEE_SEQUENCE, ...MARQUEE_SEQUENCE];

  return (
    <div className="w-full overflow-hidden">
      <ul className="sr-only">
        {FEATURE_CARDS.map((card) => (
          <li key={card.lines[0]}>{card.lines.join(' ')}</li>
        ))}
      </ul>
      <ul
        aria-hidden="true"
        className="m-0 flex w-max list-none animate-landing-marquee p-0 will-change-transform motion-reduce:animate-none"
      >
        {cards.map((card, index) => (
          <FeatureCard key={`${index}-${card.lines[0]}`} lines={card.lines} />
        ))}
      </ul>
    </div>
  );
}

const LandingPage = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      <Gnb className="absolute left-0 top-0 z-20" />

      <main className="flex flex-col items-center pb-0 pt-[120px] sm:pt-[170px] lg:pt-[171px]">
        <section
          className="flex flex-col items-center"
          aria-labelledby="landing-heading"
        >
          <h1
            id="landing-heading"
            className="px-4 text-center text-[20px] font-extrabold leading-normal tracking-[-0.5px] text-gray-950 sm:px-0 sm:text-[32px] sm:tracking-[-0.8px] lg:text-[50px] lg:leading-[1.4] lg:tracking-[-1.25px]"
          >
            내가 원하는 간식을 쉽고 빠르게 구매
          </h1>

          <p className="mt-4 text-center text-[16px] font-bold tracking-[-0.4px] text-[#b2b2b2] sm:mt-5 sm:text-[20px] sm:tracking-[-0.5px] lg:mt-3.5 lg:text-[24px] lg:tracking-[-0.6px]">
            스낵마스터와 함께하세요
          </p>

          <Link
            href="/signup"
            className="mt-7 flex h-10 items-center justify-center gap-1 rounded-[100px] bg-gray-950 px-4 py-2.5 transition-colors hover:bg-gray-900 sm:mt-11 sm:h-11 sm:px-5 lg:mt-9"
          >
            <span className="text-[14px] font-bold tracking-[-0.35px] text-white sm:text-[16px] sm:tracking-[-0.4px]">
              지금 가입하기
            </span>
            <span className="relative size-4 shrink-0 overflow-hidden sm:size-5">
              <Image
                src={icArrowRight}
                alt=""
                fill
                className="object-contain brightness-0 invert"
              />
            </span>
          </Link>
        </section>

        <section
          className="relative mt-10 w-full sm:mt-16"
          aria-label="서비스 미리보기와 주요 기능"
        >
          <div className="relative mx-auto w-full max-w-[300px] px-0 sm:max-w-[530px] sm:px-6 lg:max-w-[1300px] xl:px-0">
            <div className="relative overflow-hidden shadow-[0px_0px_20px_0px_rgba(0,0,0,0.08)] sm:rounded-[6px] lg:rounded-[10px]">
              <Image
                src={heroImage}
                alt="스낵마스터 서비스 미리보기"
                width={1340}
                height={677}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[236px] bg-gradient-to-t from-white to-transparent sm:h-[190px] lg:h-[195px]" />

          <div className="absolute inset-x-0 top-[55%] z-[2] -translate-y-1/2 sm:top-[58%] lg:top-[62%]">
            <FeatureMarquee />
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
