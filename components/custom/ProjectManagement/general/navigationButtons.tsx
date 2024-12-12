import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NavigationButtonsProps {
  submitting: boolean;
  onSubmitSaveAndExit: () => void;
  onSubmitSaveAndContinue: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  submitting,
  onSubmitSaveAndExit,
  onSubmitSaveAndContinue,
}) => {
  const router = useRouter();
  return (
    <div className="relative flex justify-between">
      <Button
        disabled={submitting}
        onClick={() => router.back()}
        className="h-16 w-52 rounded-none text-xl"
      >
        Back
      </Button>
      <div className="absolute left-1/2 mt-auto flex w-1/2 justify-between">
        <Link href="/contact-us">
          <div className="flex h-16 w-52 -translate-x-1/2 transform flex-col items-center justify-center bg-airseed-dark-blue font-semibold text-white">
            <p>Need Help?</p>
            <p>Contact Us</p>
          </div>
        </Link>
        <Button
          disabled={submitting}
          type="submit"
          onClick={onSubmitSaveAndExit}
          className="h-16 w-52 -translate-x-1/4 rounded-none text-xl"
        >
          Save & Exit
        </Button>
        <Button
          disabled={submitting}
          onClick={onSubmitSaveAndContinue}
          type="submit"
          className="h-16 w-52 rounded-none text-xl"
        >
          Save and Continue
        </Button>
      </div>
    </div>
  );
};

export default NavigationButtons;
