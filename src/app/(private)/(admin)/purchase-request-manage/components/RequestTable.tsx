import { purchaseRequestManage } from '@/features/purchase-request-manage/types/purchase-request-manage.type';
import RequestTableRow from './RequestTableRow';
import RequestCard from './RequestCard';

type RequestTableProps = {
  requests: purchaseRequestManage[];
  onReject: (id: number) => void;
  onApprove: (id: number) => void;
};

const RequestTable = ({ requests, onReject, onApprove }: RequestTableProps) => {
  return (
    <div className="flex w-full flex-col overflow-x-auto max-sm:hidden">
      <div className="flex w-full min-w-[1100px] items-center gap-20 border-y border-solid border-gray-100 px-10 py-5 max-lg:min-w-[696px] max-lg:justify-between max-lg:gap-0 max-lg:px-0">
        <span className="w-[142px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500 max-lg:w-[100px]">
          구매 요청일
        </span>
        <span className="w-[360px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500 max-lg:w-[140px]">
          상품 정보
        </span>
        <span className="w-[142px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500 max-lg:w-[100px]">
          주문 금액
        </span>
        <span className="w-[134px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500 max-lg:w-[108px]">
          요청인
        </span>
        <span className="w-[180px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500 max-lg:w-[168px]">
          비고
        </span>
      </div>

      <ul className="flex w-full min-w-[1100px] flex-col max-lg:min-w-[696px]">
        {requests.map((request) => (
          <RequestTableRow
            key={request.id}
            request={request}
            onReject={() => onReject(request.id)}
            onApprove={() => onApprove(request.id)}
          />
        ))}
      </ul>

      {/* Mobile card list */}
      <ul className="hidden w-full flex-col max-sm:flex">
        {requests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            onReject={() => onReject(request.id)}
            onApprove={() => onApprove(request.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default RequestTable;
