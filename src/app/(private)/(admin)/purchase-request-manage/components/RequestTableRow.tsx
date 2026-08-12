import Button from '@/components/Button';
import { purchaseRequestManage } from '@/features/purchase-request-manage/types/purchase-request-manage.type';
import Link from 'next/link';
import React from 'react';
import { getInitials } from '../utils/getInitials';
import { formatDate } from '../utils/formatData';

type RequestTableRowProps = {
  request: purchaseRequestManage;
  onReject?: () => void;
  onApprove?: () => void;
};

const RequestTableRow = ({
  request,
  onReject,
  onApprove,
}: RequestTableRowProps) => {
  return (
    <li
      key={request.id}
      className="group flex h-[100px] w-full items-center gap-20 border-b border-solid border-gray-100 px-10 transition-colors hover:bg-gray-50 max-lg:justify-between max-lg:gap-0 max-lg:px-0"
    >
      <Link
        href={`/purchase-request-manage/${request.id}`}
        className="flex flex-1 items-center gap-20"
      >
        <span className="w-[142px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950 max-lg:w-[100px]">
          {formatDate(request.requestedAt)}
        </span>
        <span className="w-[360px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950 max-lg:w-[140px]">
          {request.itemSummary}
        </span>
        <span className="w-[142px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950 max-lg:w-[100px]">
          {request.totalAmount.toLocaleString()}
        </span>
        <div className="flex w-[134px] shrink-0 items-center gap-3 max-lg:w-[108px]">
          <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-50">
            <span className="text-[10px] tracking-[-0.25px] text-black">
              {getInitials(request.requesterName)}
            </span>
          </div>
          <span className="w-[90px] text-[16px] tracking-[-0.4px] text-gray-950 max-lg:w-16">
            {request.requesterName}
          </span>
        </div>
      </Link>

      <div className="flex w-[180px] shrink-0 items-center gap-2 max-lg:w-[168px]">
        <Button variant="sub" className="w-20" onClick={onReject}>
          반려
        </Button>
        <Button variant="filled" size="sm" className="w-20" onClick={onApprove}>
          승인
        </Button>
      </div>
    </li>
  );
};

export default RequestTableRow;
