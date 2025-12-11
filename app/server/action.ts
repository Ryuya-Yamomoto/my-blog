"use server";

import * as z from "zod";

// 型
type ContactFormData = {
  name: string;
  department: string;
  email: string;
  inquiry: string;
};
type ContactFormErrors = string[] | null;
type ZodErrors = {
  name?: string[];
  department?: string[];
  email?: string[];
  inquiry?: string[];
} | null;
type ContactActionStateProps = ContactFormData & {
  zodErrors: ZodErrors;
  contactFormErrors: ContactFormErrors;
  status: "success" | "error" | "validation_error" | undefined;
};

// validation
const contactScheme = z.object({
  name: z
    .string()
    .trim()
    .min(1, "お名前は必須項目です")
    .max(20, "お名前は20文字以内で入力してください"),
  department: z.string().trim().min(1, "所属は必須項目です"),
  email: z
    .string()
    .trim()
    .min(1, "メールアドレスは必須項目です")
    .email("有効なメールアドレスを入力してください。"),
  inquiry: z
    .string()
    .trim()
    .min(1, "お問い合わせは必須項目です")
    .max(400, "お問い合わせは400文字以内で入力してください"),
});

export const actionContactForm = async (
  prevState: ContactFormData,
  formData: FormData
): Promise<ContactActionStateProps> => {
  const validatedFields = contactScheme.safeParse({
    name: formData.get("name"),
    department: formData.get("department"),
    email: formData.get("email"),
    inquiry: formData.get("inquiry"),
  });

  const rawFormData = Object.fromEntries(formData);

  // 型ガード
  const payload = {
    name: typeof rawFormData.name === "string" ? rawFormData.name : "",
    department:
      typeof rawFormData.department === "string" ? rawFormData.department : "",
    email: typeof rawFormData.email === "string" ? rawFormData.email : "",
    inquiry: typeof rawFormData.inquiry === "string" ? rawFormData.inquiry : "",
  };

  // zodのバリデーション
  if (!validatedFields.success) {
    return {
      ...payload,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      contactFormErrors: null,
      status: "validation_error",
    };
  }

  // ここでresendでメール処理

  // 一旦受け取った値を返す
  return {
    name: "",
    department: "",
    email: "",
    inquiry: "",
    zodErrors: null,
    contactFormErrors: null,
    status: "success",
  };
};
