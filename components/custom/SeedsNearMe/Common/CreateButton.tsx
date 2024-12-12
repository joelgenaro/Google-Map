'use client';

import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CreateButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="default"
      onClick={() => router.push('/seeds-near-me/create')}
    >
      <CirclePlus className="mr-2" />
      Create a Seed Request
    </Button>
  );
};

export default CreateButton;
