import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airseed - Login",
  description: "Airseed Login",
};

export default function LoginLayout(props: { children: React.ReactNode }) {
  return <>{props.children}</>;
}
