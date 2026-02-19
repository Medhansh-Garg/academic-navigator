import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingDown, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { PageWrapper } from "@/components/PageWrapper";
import { GlassCard } from "@/components/GlassCard";

export default function LeaveManager() {
  const [currentAttendance, setCurrentAttendance] = useState(78);
  const [targetAttendance, setTargetAttendance] = useState(75);
  const [totalClasses, setTotalClasses] = useState(120);

  const result = useMemo(() => {
    const attended = Math.round((currentAttendance / 100) * totalClasses);
    const required = Math.ceil((targetAttendance / 100) * totalClasses);
    const canSkip = attended - required;

    return {
      attended,
      canSkip: Math.max(0, canSkip),
      safe: canSkip > 0,
      message:
        canSkip > 0
          ? `You can safely skip ${canSkip} more lectures!`
          : canSkip === 0
          ? "You're right at the edge. Don't skip any!"
          : `You need to attend ${Math.abs(canSkip)} more lectures to reach your target.`,
    };
  }, [currentAttendance, targetAttendance, totalClasses]);

  return (
    <PageWrapper title="Leave Manager" subtitle="Calculate how many lectures you can safely skip">
      <div className="mx-auto max-w-xl space-y-6">
        {/* Calculator Card */}
        <GlassCard>
          <div className="flex items-center gap-2 mb-6">
            <div className="rounded-xl bg-primary/10 p-2.5">
              <Calculator className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-lg font-bold text-foreground">Attendance Calculator</h2>
          </div>

          <div className="space-y-5">
            {/* Current Attendance */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-foreground">Current Attendance</label>
                <span className="text-sm font-bold text-primary">{currentAttendance}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={currentAttendance}
                onChange={(e) => setCurrentAttendance(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-muted cursor-pointer accent-primary"
              />
            </div>

            {/* Target */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-foreground">Target Attendance</label>
                <span className="text-sm font-bold text-accent">{targetAttendance}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={targetAttendance}
                onChange={(e) => setTargetAttendance(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-muted cursor-pointer accent-primary"
              />
            </div>

            {/* Total classes */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Total Classes</label>
              <input
                type="number"
                value={totalClasses}
                onChange={(e) => setTotalClasses(Number(e.target.value) || 0)}
                className="w-full rounded-xl bg-muted/50 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </GlassCard>

        {/* Result Card */}
        <motion.div
          key={`${currentAttendance}-${targetAttendance}-${totalClasses}`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <GlassCard
            className={result.safe ? "border-success/30" : "border-warning/30"}
          >
            <div className="text-center">
              <div
                className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${
                  result.safe ? "bg-success/10" : "bg-warning/10"
                }`}
              >
                {result.safe ? (
                  <TrendingDown className="h-8 w-8 text-success" />
                ) : (
                  <AlertTriangle className="h-8 w-8 text-warning" />
                )}
              </div>

              <div className="mb-2">
                <span className={`text-5xl font-extrabold ${result.safe ? "text-success" : "text-warning"}`}>
                  {result.canSkip}
                </span>
                <p className="text-sm text-muted-foreground mt-1">
                  lectures you can skip
                </p>
              </div>

              <p className="text-sm font-medium text-foreground">{result.message}</p>

              <div className="mt-4 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <Info className="h-3 w-3" />
                Attended {result.attended} of {totalClasses} classes
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Tips */}
        <GlassCard>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            Quick Tips
          </h3>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>• Most colleges require 75% minimum attendance for exam eligibility</li>
            <li>• Plan your leaves early in the semester when your percentage is high</li>
            <li>• Medical leaves are usually separate — check your college policy</li>
          </ul>
        </GlassCard>
      </div>
    </PageWrapper>
  );
}
