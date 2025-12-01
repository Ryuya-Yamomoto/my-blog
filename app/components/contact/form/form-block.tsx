"use client";

import { useActionState } from "react";
import { cn } from "@/lib/utils";

import FormRow from "./form-row";
import FormInput from "./form-input";
import FormLabel from "./form-label";
import ButtonRect from "../../common/button/button-rect";

const FormBlock = () => {
  return (
    <form action="" className={cn("border-t px-8 pt-16")}>
      <div className={cn("grid grid-cols-[max-content_1fr] gap-y-8")}>
        <FormRow>
          <FormLabel htmlFor="name">お名前</FormLabel>
          <div className={cn("w-full")}>
            <FormInput
              type="text"
              id="name"
              name="name"
              placeholder="山本 竜也"
              required
            />
          </div>
        </FormRow>
        <FormRow>
          <FormLabel htmlFor="department">所属</FormLabel>
          <FormInput
            type="text"
            id="department"
            name="department"
            placeholder="会社名 or 個人 ...etc"
            required
          />
        </FormRow>
        <FormRow>
          <FormLabel htmlFor="email">メールアドレス</FormLabel>
          <FormInput
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            required
          />
        </FormRow>
        <FormRow className="items-baseline">
          <FormLabel htmlFor="inquiry">お問い合わせ内容</FormLabel>
          <textarea
            name="inquiry"
            id="inquiry"
            placeholder="お問い合わせ内容を入力してください"
            className={cn(
              "min-h-40 w-full rounded-sm border px-4 py-4 leading-[2] outline-none"
            )}
            required
          />
        </FormRow>
      </div>

      <div className="mx-auto mt-8 flex w-fit items-center">
        <ButtonRect
          label="確認する"
          handleClick={() => console.log("確認するよ")}
        />
      </div>
    </form>
  );
};

export default FormBlock;
