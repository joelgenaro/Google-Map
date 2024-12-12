import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airseed - Profile",
  description: "Airseed Profile",
};

export default function ProfileLayout(props: { children: React.ReactNode }) {
  return <div className="w-full min-h-screen flex px-3 pt-28 lg:pt-32">{props.children}</div>;
}
