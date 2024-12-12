import Link from "next/link";
import { FC, SVGProps } from "react";

interface IconLinkBoxProps {
  Icon: FC<SVGProps<SVGSVGElement>>;
  title?: string;
  link: string;
}

export default function IconLinkBox({ Icon, title, link }: IconLinkBoxProps) {
  return (
    <Link className="bg-gray-300 w-52 h-52 flex flex-col justify-center items-center text-center py-4" href={link}>
      <h3 className="text-base">{title}</h3>
      <Icon className="w-24 h-24 mt-auto mb-6" fill="#000" />
    </Link>
  );
}