import IconLinkBox from '@/components/custom/iconLinkBox';
import { CarbonMethodOptions } from '@/lib/constants';
import Link from 'next/link';

export default function NewProject() {
  return (
    <div className="flex h-[calc(100vh-7rem)] w-full flex-col px-12 pb-8 lg:h-[calc(100vh-8rem)]">
      <h2 className="mt-8 text-3xl sm:text-2xl">Project methodology</h2>
      <div className="flex flex-1 items-center justify-center gap-8">
        {CarbonMethodOptions.map((method, index) => (
          <IconLinkBox
            key={index}
            Icon={method.icon}
            link={method.url}
            title={method.title}
          ></IconLinkBox>
        ))}
      </div>
      <Link
        href="/contact-us"
        className="mx-auto mt-auto bg-airseed-dark-blue w-52 h-16 font-semibold flex flex-col justify-center items-center text-white"
      >
        <p>Need Help?</p>
        <p>Contact Us</p>
      </Link>
    </div>
  );
}
