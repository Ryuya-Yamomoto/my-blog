"use client";

import { cn } from "@/lib/utils";

import FormRow from "./form-row";
import FormInput from "./form-input";
import FormTextarea from "./form-textarea";
import FormLabel from "./form-label";
import ButtonRect from "../../common/button/button-rect";

import { useActionState } from "react";
import { actionContactForm } from "@/app/server/action";

const FormBlock = () => {
  const [state, contactAction, isPending] = useActionState(actionContactForm, {
    name: "",
    department: "",
    email: "",
    inquiry: "",
    zodErrors: null,
    contactFormErrors: null,
    message: null,
  });

  return (
    <form action={contactAction} className={cn("border-t pt-16", "md:px-8")}>
      <div className={cn("grid gap-y-8", "md:grid-cols-[max-content_1fr]")}>
        <FormRow>
          <FormLabel htmlFor="name">お名前</FormLabel>
          <FormInput
            type="text"
            id="name"
            name="name"
            placeholder="山本 竜也"
            defaultValue={state.name}
            errorMsg={
              state.zodErrors && state.zodErrors.name
                ? state.zodErrors.name[0]
                : ""
            }
          />
        </FormRow>
        <FormRow>
          <FormLabel htmlFor="department">所属</FormLabel>
          <FormInput
            type="text"
            id="department"
            name="department"
            placeholder="会社名 or 個人 ...etc"
            defaultValue={state.department}
            errorMsg={
              state.zodErrors && state.zodErrors.department
                ? state.zodErrors.department[0]
                : ""
            }
          />
        </FormRow>
        <FormRow>
          <FormLabel htmlFor="email">メールアドレス</FormLabel>
          <FormInput
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            defaultValue={state.email}
            errorMsg={
              state.zodErrors && state.zodErrors.email
                ? state.zodErrors.email[0]
                : ""
            }
          />
        </FormRow>
        <FormRow className="md:items-start">
          <FormLabel className="mt-5" htmlFor="inquiry">
            お問い合わせ内容
          </FormLabel>
          <FormTextarea
            name="inquiry"
            id="inquiry"
            placeholder="お問い合わせ内容を入力してください"
            defaultValue={state.inquiry}
            className={cn(
              "onFocus min-h-40 w-full rounded-sm border px-4 py-4 leading-[2]"
            )}
            errorMsg={
              state.zodErrors && state.zodErrors.inquiry
                ? state.zodErrors.inquiry[0]
                : ""
            }
          />
        </FormRow>
      </div>

      <div className="mx-auto mt-8 flex w-fit items-center">
        <ButtonRect
          label={isPending ? "送信中..." : "送信する"}
          type="submit"
          disabled={isPending}
        />
      </div>
    </form>
  );
};

export default FormBlock;
