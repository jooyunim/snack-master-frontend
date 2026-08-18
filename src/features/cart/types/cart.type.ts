export type RequestMessageProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  error?: string | null;
};

export type CartOrderContentProps = {
  selectedIds: number[];
};

//요청메세지 최대 길이
export const REQUEST_MESSAGE_MAX_LENGTH = 500;
