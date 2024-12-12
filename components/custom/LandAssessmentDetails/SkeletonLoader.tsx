import { Skeleton } from '@/components/ui/skeleton';

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex min-h-60 flex-col items-start justify-center gap-4 lg:flex-row">
        <Skeleton className="h-60 w-full lg:w-1/4" />
        <Skeleton className="h-60 w-full lg:w-3/4" />
      </div>
      <div className="flex h-full w-full flex-col gap-4 md:flex-row">
        <Skeleton className="min-h-[470px] w-full flex-1 md:w-7/12" />
        <div className="flex w-full flex-col gap-4 md:w-5/12">
          <Skeleton className="min-h-80 w-full" />
          <Skeleton className="min-h-60 w-full" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
