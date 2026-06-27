import { Skeleton } from "@/components/ui/skeleton";
import { PageShell } from "@/components/layout";

export default function LessonLoading() {
  return (
    <PageShell>
      <div className="flex min-h-screen">
        <aside className="hidden lg:block w-64 border-r border-onyx/20 p-4 space-y-3">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </aside>
        <main className="flex-1 px-8 py-10 space-y-6">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-32 w-full" />
        </main>
      </div>
    </PageShell>
  );
}
