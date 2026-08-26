import type { ComponentPropsWithoutRef } from 'react';

export type RequestMessageProps = {
  placeholder?: string;
  readOnly?: boolean;
  error?: string | null;
  value?: string;
  characterCount?: number;
} & Omit<ComponentPropsWithoutRef<'textarea'>, 'placeholder' | 'readOnly'>;

export type CartOrderContentProps = {
  selectedIds: number[];
};

//요청메세지 최대 길이
export const REQUEST_MESSAGE_MAX_LENGTH = 500;
