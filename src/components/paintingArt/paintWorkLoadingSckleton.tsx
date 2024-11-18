import { memo } from "react";
import { Skeleton } from "@nextui-org/react";

const paintWorkLoadingSckleton = memo(function () {
  return (
    <div className="w-full h-96 space-y-5 pt-10">
      <div className="h-80 w-full">
        <Skeleton className="w-full h-full bg-default-300 rounded-lg"></Skeleton>
      </div>
      <div className="w-full grid justify-items-end gap-2">
        <div className="w-full h-3 flex flex-row gap-2 justify-between">
          <Skeleton className="w-2/5 h-full rounded-lg bg-default-200"></Skeleton>
          <Skeleton className="w-1/5 h-full rounded-lg bg-default-200"></Skeleton>
        </div>

        <div className="w-1/3 rounded-lg">
          <Skeleton className="h-3 w-full rounded-lg bg-default-200"></Skeleton>
        </div>
      </div>
    </div>
  );
});


export default paintWorkLoadingSckleton;
