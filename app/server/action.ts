"use server";

import * as z from "zod";
import type { ContactFormData } from "@/app/types/common";

import { Resend } from "resend";

// 型
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

const resend = new Resend(process.env.RESEND_API_KEY);

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
  try {
    const { error } = await resend.emails.send({
      from: "MY-BLOG <my-blog@resend.dev>",
      to: ["ryuya.yamamoto.0325@gmail.com"],
      subject: "my-blog よりお問い合わせがありました",
      html: `
        <div>
          my-blogよりお問い合わせがありました。
          <br />
          <br />
          ------------------------
          <br />
          <br />
          【お名前】
          <br />
          ${payload.name}
          <br />
          <br />
          【所属】
          <br />
          ${payload.department}
          <br />
          <br />
          【メールアドレス】
          <br />
          ${payload.email}
          <br />
          <br />
          【お問い合わせ内容】
          <br />
          ${payload.inquiry}
          <br />
          <br />
          ------------------------
        </div>
      `,
    });

    if (error) {
      return {
        ...payload,
        zodErrors: null,
        contactFormErrors: null,
        status: "error",
      };
    }

    return {
      name: "",
      department: "",
      email: "",
      inquiry: "",
      zodErrors: null,
      contactFormErrors: null,
      status: "success",
    };
  } catch (error) {
    return {
      ...payload,
      zodErrors: null,
      contactFormErrors: [`${error}: メールの送信中にエラーが発生しました。`],
      status: "error",
    };
  }
};
