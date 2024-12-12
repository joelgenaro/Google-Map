import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airseed - Register",
  description: "Airseed Register",
};

export default function RegisterLayout(props: { children: React.ReactNode }) {
  return <>{props.children}</>;
}
