import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airseed - Setting",
  description: "Airseed Setting",
};

export default function SettingLayout(props: { children: React.ReactNode }) {
  return <div className="w-full px-3 pt-28 lg:pt-32">{props.children}</div>;
}
