import { Skeleton } from "../ui/skeleton";

export function PlacesSkeleton() {
  return (
    <div className="absolute mt-3 w-full rounded-md border border-gray-200 bg-white shadow-sm">
      <ul className="max-h-60 overflow-auto py-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className="px-4 py-2">
            <div className="space-y-2">
              <div className="h-5 w-3/4 animate-pulse rounded-md bg-gray-200" />
              <div className="h-4 w-1/2 animate-pulse rounded-md bg-gray-100" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
