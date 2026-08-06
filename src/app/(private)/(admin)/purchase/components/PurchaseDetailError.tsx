type PurchaseDetailErrorProps = {
    message: string;
  };
  
  export default function PurchaseDetailError({
    message,
  }: PurchaseDetailErrorProps) {
    return (
      <div className="min-h-screen bg-white">
        <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-[30px] px-6 pb-20 pt-[60px] max-lg:pt-[30px]">
          <p className="text-[16px] text-gray-500">{message}</p>
        </main>
      </div>
    );
  }