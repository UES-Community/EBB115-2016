import { Skeleton } from "@/components/ui/skeleton";
import { PageShell } from "@/components/layout";

export default function Loading() {
  return (
    <PageShell>
      <div className="border-b border-onyx/20 px-6 py-4">
        <Skeleton className="h-6 w-48" />
      </div>
      <div className="mx-auto max-w-3xl px-8 py-10 space-y-6">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-40 w-full" />
      </div>
    </PageShell>
  );
}
