import { Skeleton } from "@nextui-org/react";

function DecorationsPreviewSckleton() {
  return (
  <div className="flex flex-col gap-2">
    <Skeleton className="w-full h-20 rounded-md"></Skeleton>
    <Skeleton className="h-96 p-4 flex justify-center items-center border-2 rounded-md border-gray-100 bg-gray-50"></Skeleton>
  </div>
  )
}

export default DecorationsPreviewSckleton;
