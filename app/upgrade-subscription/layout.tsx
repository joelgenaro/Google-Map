import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airseed - Upgrade Subscription",
  description: "Airseed Upgrade Subscription",
};

export default function UpgradeSubscriptionLayout(props: { children: React.ReactNode }) {
  return <div className="w-full px-3 pt-28 lg:pt-32">{props.children}</div>;
}
