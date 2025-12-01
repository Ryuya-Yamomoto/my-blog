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

        <div className={cn("mt-16")}>
          <FormBlock />
        </div>
      </section>
    </WrapperContent>
  );
}
