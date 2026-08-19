import { Card } from "@/components/ui/card";

export function FoundationPlaceholder({ title }: { title: string }) {
  return (
    <Card>
      <p className="text-sm font-medium text-indigo-600 dark:text-violet-300">Protected placeholder</p>
      <h2 className="mt-1 text-2xl font-semibold">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
        This destination exists only to verify navigation and access control in Milestone 1. Data workflows are reserved for later milestones.
      </p>
    </Card>
  );
}
