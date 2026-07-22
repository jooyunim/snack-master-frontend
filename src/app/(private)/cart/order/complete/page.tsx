import CartStepIndicator, {
  type CartFlow,
} from '../../components/CartStepIndicator';
import PurchaseCompleteContent from './components/PurchaseCompleteContent';
import RequestCompleteContent from './components/RequestCompleteContent';

// TODO: 유저 조건에 따라 'purchase'(2단계) | 'request'(3단계)로 교체
const CART_FLOW: CartFlow = 'purchase';

export default function CartOrderCompletePage() {
  const currentStep = CART_FLOW === 'purchase' ? 2 : 3;

  return (
    <div className="min-h-screen bg-white">
      <main
        className={`mx-auto flex w-full max-w-[1200px] flex-col items-center px-6 pb-20 pt-20 max-lg:pt-[60px] max-sm:px-[25px] max-sm:pb-[136px] max-sm:pt-10 ${
          CART_FLOW === 'purchase'
            ? 'gap-[70px] max-sm:gap-10'
            : 'gap-[60px] max-sm:gap-10'
        }`}
      >
        <CartStepIndicator flow={CART_FLOW} currentStep={currentStep} />
        {CART_FLOW === 'purchase' ? (
          <PurchaseCompleteContent />
        ) : (
          <RequestCompleteContent />
        )}
      </main>
    </div>
  );
}
