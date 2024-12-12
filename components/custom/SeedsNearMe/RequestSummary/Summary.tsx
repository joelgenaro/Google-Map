'use client';

import { useSeedsNearMeContext } from '@/components/context/SeedsNearMeContext';
import { Button } from '@/components/ui/button';
import { useStepper } from '@/components/ui/stepper';
import { cn } from '@/lib/utils';
import { CircleCheck, CirclePlus, ReceiptText } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Summary = () => {
  const buttonBaseClasses =
    'flex h-12 w-2/5 rounded-xl border-primary p-2 text-primary';
  const iconBaseClasses = 'text-primary mr-2';

  const router = useRouter();
  const { resetContext } = useSeedsNearMeContext();
  const { setStep } = useStepper();

  const handleCreateNewRequest = () => {
    resetContext();
    setStep(0);
    router.refresh();
  };

  // Using the native <a> tag to force a hard refresh and disable the framework caching
  const handleViewEditRequest = (e: MouseEvent) => {
    e.preventDefault();
    // Use native window.location to force a hard refresh
    window.location.href = '/seeds-near-me';
  };

  return (
    <div className="flex max-h-snm-mapbox min-h-snm-mapbox flex-1 flex-col gap-6 rounded-xl bg-white p-10 shadow-around">
      <div className="flex h-3/6 w-full flex-col items-center justify-center rounded-3xl bg-green-600 p-6">
        <CircleCheck className="mb-4" color="white" size={150} />
        <p className="text-xl font-bold text-white">SEED REQUEST SUBMITTED</p>
      </div>
      <div className="flex h-3/6 w-full flex-col items-center justify-center gap-4">
        <a
          href="/seeds-near-me"
          className="flex h-12 w-2/5"
          onClick={() => handleViewEditRequest}
        >
          <Button
            className="h-full w-full rounded-xl border-primary p-2 text-primary"
            variant="outline"
          >
            <ReceiptText className={cn(iconBaseClasses, '')} />
            View/edit request
          </Button>
        </a>
        <Button
          className={cn(buttonBaseClasses, '')}
          variant="outline"
          onClick={handleCreateNewRequest}
        >
          <CirclePlus className={cn(iconBaseClasses, '')} />
          Create new request
        </Button>
      </div>
    </div>
  );
};

export default Summary;
