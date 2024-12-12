'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { PlatformUpdate } from '@/database/types';
import { format } from 'date-fns';
import Marquee from 'react-fast-marquee';

type PlatformUpdatesBannerProps = {
  platformUpdates: PlatformUpdate[];
};

const PlatformUpdatesBanner = ({
  platformUpdates,
}: PlatformUpdatesBannerProps) => {
  if (!platformUpdates.length) {
    return null;
  }

  return (
    <Card className="mb-4 h-20 w-full rounded-xl !shadow-around">
      <Marquee
        className="flex h-full items-center"
        pauseOnHover={true} // Make default speed - 50 pixels/second
      >
        {platformUpdates
          .filter((update) => update.startDate && update.message)
          .sort((a, b) => {
            // Safely handle potentially null dates in TypeScript
            if (!a.startDate || !b.startDate) {
              return 0;
            }
            const dateA = new Date(a.startDate);
            const dateB = new Date(b.startDate);
            return dateA.getTime() - dateB.getTime();
          })
          .map((update) => (
            <span
              key={update.id}
              className="mx-2 flex items-center justify-center text-2xl"
            >
              <Badge className="mr-2 text-lg">
                {update.startDate
                  ? format(new Date(update.startDate), 'MMMM do, yyyy')
                  : 'Invalid date'}
              </Badge>
              {update.message}
              {platformUpdates.length > 1 && (
                <span className="ml-4 flex h-5 w-5 items-center justify-center text-6xl">
                  •
                </span>
              )}
            </span>
          ))}
      </Marquee>
    </Card>
  );
};

export default PlatformUpdatesBanner;
