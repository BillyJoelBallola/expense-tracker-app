import { Skeleton } from "./ui/skeleton";

function BalanceCardSkeleton() {
  return (
    <div className="flex flex-col justify-between p-4 w-full md:w-sm h-32 md:h-48 duration-200 ease-in-out rounded-lg bg-neutral-100 dark:bg-neutral-900">
      <div>
        <Skeleton className="h-4 w-16 mb-2 rounded-full" />
        <Skeleton className="h-8 w-32 rounded-full" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-4 w-16 mb-2 rounded-full" />
          <Skeleton className="h-4 w-20 rounded-full" />
        </div>
        <div>
          <Skeleton className="h-4 w-16 mb-2 rounded-full" />
          <Skeleton className="h-4 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default BalanceCardSkeleton;
