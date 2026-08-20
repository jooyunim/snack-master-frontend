import { z } from 'zod';

const PASSWORD_ALLOWED_CHARS_REGEX = /^[A-Za-z\d@$!%*?&]+$/;

const hasPasswordComplexity = (password: string) => {
  const categories = [
    /[A-Za-z]/.test(password),
    /[0-9]/.test(password),
    /[@$!%*?&]/.test(password),
  ];

  return categories.filter(Boolean).length >= 2;
};

const passwordSchema = z
  .string()
  .trim()
  .min(1, '비밀번호를 입력해주세요.')
  .min(8, '비밀번호는 8자 이상이어야 합니다.')
  .max(20, '비밀번호는 20자 이하여야 합니다.')
  .regex(
    PASSWORD_ALLOWED_CHARS_REGEX,
    '비밀번호는 영문, 숫자, 특수문자(@$!%*?&)만 사용할 수 있습니다.'
  )
  .refine(hasPasswordComplexity, {
    message: '비밀번호는 영문, 숫자, 특수문자 중 두 가지 이상 포함해야 합니다.',
  });

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().trim().min(1, '비밀번호를 입력해주세요.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const adminSignupSchema = z
  .object({
    name: z.string().trim().min(1, '이름을 입력해주세요.'),
    email: z
      .string()
      .trim()
      .min(1, '이메일을 입력해주세요.')
      .email('올바른 이메일 형식이 아닙니다.'),
    password: passwordSchema,
    passwordConfirm: z
      .string()
      .trim()
      .min(1, '비밀번호 확인 값을 입력해주세요.'),
    companyName: z.string().trim().min(1, '회사명을 입력해주세요.'),
    businessNumber: z.string().trim().min(1, '사업자번호를 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호와 비밀번호 확인 값이 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type AdminSignupFormValues = z.infer<typeof adminSignupSchema>;

export const inviteSignupSchema = z
  .object({
    password: passwordSchema,
    passwordConfirm: z
      .string()
      .trim()
      .min(1, '비밀번호 확인 값을 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호와 비밀번호 확인 값이 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type InviteSignupFormValues = z.infer<typeof inviteSignupSchema>;
