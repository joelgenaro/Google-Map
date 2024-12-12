import { Skeleton } from '@/components/ui/skeleton';

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-4">
            <Skeleton className="h-[300px] w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
