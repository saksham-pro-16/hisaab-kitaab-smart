import { Insight } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const priorityStyles: Record<Insight["priority"], string> = {
  Urgent: "bg-alert-soft text-alert border-alert/20",
  Important: "bg-warning-soft text-warning border-warning/20",
  Opportunity: "bg-success-soft text-success border-success/20",
};

export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <div className="group rounded-2xl bg-card p-5 border border-border/60 shadow-soft hover:shadow-elevated transition-smooth hover:-translate-y-0.5 animate-fade-up">
      <div className="flex items-start gap-4">
        <div className="text-3xl leading-none shrink-0">{insight.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={cn(
                "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border",
                priorityStyles[insight.priority],
              )}
            >
              {insight.priority}
            </span>
          </div>
          <h3 className="mt-2 font-semibold text-foreground leading-snug">{insight.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{insight.detail}</p>
          <button className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
            Take action <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
