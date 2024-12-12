import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airseed - Project Management",
  description: "Airseed Project Management",
};

export default function ProjectManagementLayout(props: { children: React.ReactNode }) {
  return <div className="w-full px-3 pt-28 lg:pt-32 2xl:max-w-screen-2xl 2xl:mx-auto h-screen">{props.children}</div>;
}
