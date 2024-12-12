import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EnvironmentalPlantingPage() {
  return (
    <div className="flex h-[calc(100vh-7rem)] w-full flex-col px-12 pb-8 lg:h-[calc(100vh-8rem)]">
      <h2 className="mt-8 text-3xl sm:text-2xl">Project methodology</h2>
      <div className="flex flex-1 items-center justify-center gap-8">
        <div className="flex flex-1 justify-center">
          <Link href="/project-management/environmental-planting/project-details" className="flex h-40 w-48 items-center justify-center bg-black text-2xl text-white">
            New
          </Link>
        </div>
        <div className="flex flex-1 justify-center">
          <Link href="/project-management/environmental-planting" className="flex h-40 w-48 items-center justify-center bg-black text-2xl text-white">
            Established
          </Link>
        </div>
      </div>
      <div className="relative flex justify-between">
        <Link
          href="/project-management/project-methodology"
        >
          <Button className='h-16 w-52 text-xl rounded-none'>Back</Button>
        </Link>
        <Link
          href="/contact-us"
          className="absolute left-1/2 mt-auto flex h-16 w-52 -translate-x-1/2 transform flex-col items-center justify-center bg-airseed-dark-blue font-semibold text-white"
        >
          <p>Need Help?</p>
          <p>Contact Us</p>
        </Link>
      </div>
    </div>
  );
}
