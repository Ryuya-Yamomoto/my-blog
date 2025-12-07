import type { Metadata } from "next";

import WrapperContent from "../components/common/wrapper/wrapper-content";
import { unstable_ViewTransition as ViewTransition } from "react";
import HeadingSection from "../components/common/heading/heading-section";
import FormBlock from "../components/contact/form/form-block";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "お問い合わせ | Ryuya Yamamoto",
};

export default async function Page() {
  return (
    <WrapperContent>
      <section>
        <ViewTransition name="heading-pageTtl">
          <HeadingSection en={"CONTACT"} ja={"お問い合わせ"} />
        </ViewTransition>

        <div className="mt-16 grid gap-y-4">
          <p>
            お気軽にご連絡、ご相談ください。
            <br />
            通常24時間以内に返信いたします。
          </p>
          <ul className="text-sm">
            <li className="pl-[1em] -indent-[1em]">
              ・当サイト記事についての訂正、ご意見
            </li>
            <li className="pl-[1em] -indent-[1em]">
              ・副業案件のご相談（平日夜、土日祝日 稼働）
            </li>
            <li className="pl-[1em] -indent-[1em]">・暇つぶし...etc</li>
          </ul>
        </div>

        <div className={cn("mt-16 border-t")}>
          <FormBlock />
        </div>
      </section>
    </WrapperContent>
  );
}
