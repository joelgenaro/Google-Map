import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airseed - Contact US",
  description: "Airseed Contact US",
};

export default function ContactUsLayout(props: { children: React.ReactNode }) {
  return <div className="w-full px-3 pt-28 lg:pt-32">{props.children}</div>;
}
