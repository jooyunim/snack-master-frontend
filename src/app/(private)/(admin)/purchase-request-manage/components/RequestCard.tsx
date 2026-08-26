import React from 'react';
import { formatDate } from '../utils/formatDate';
import Link from 'next/link';
import { purchaseRequestManage } from '@/features/purchase-request-manage/types/purchase-request-manage.type';
import Button from '@/components/Button';

type RequestCardProps = {
  request: purchaseRequestManage;
  onReject?: () => void;
  onApprove?: () => void;
};

const RequestCard = ({ request, onReject, onApprove }: RequestCardProps) => {
  return (
    <li className="flex w-full flex-col gap-5 border-b border-solid border-gray-100 py-6">
      <Link
        href={`/purchase-request-manage/${request.id}`}
        className="flex flex-1 items-center gap-20"
      >
        <div className="flex w-full flex-col gap-2.5">
          <div className="flex w-full items-center justify-between pr-1">
            <span className="text-[14px] font-bold tracking-[-0.35px] text-gray-950">
              {formatDate(request.requestedAt)}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[14px] tracking-[-0.35px] text-gray-950">
                {request.requesterName}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[14px] tracking-[-0.35px] text-gray-950">
              {request.itemSummary}
            </p>
            <p className="text-[20px] font-extrabold tracking-[-0.5px] text-gray-950">
              {request.totalAmount.toLocaleString()}
            </p>
          </div>
        </div>
      </Link>
      <div className="flex w-full items-center gap-2">
        <Button variant="sub" className="min-w-0 flex-1" onClick={onReject}>
          반려
        </Button>
        <Button
          variant="filled"
          size="sm"
          className="min-w-0 flex-1"
          onClick={onApprove}
        >
          승인
        </Button>
      </div>
    </li>
  );
};

export default RequestCard;
