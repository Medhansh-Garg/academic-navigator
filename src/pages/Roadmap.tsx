import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  BookOpen,
  Clock,
  ArrowRight,
} from "lucide-react";
import { PageWrapper } from "@/components/PageWrapper";
import { GlassCard } from "@/components/GlassCard";

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: "done" | "current" | "upcoming";
  resources: string[];
  subtasks: string[];
}

const mockRoadmap: RoadmapNode[] = [
  {
    id: "1",
    title: "Programming Fundamentals",
    description: "Master core programming concepts with Python or JavaScript",
    duration: "2 weeks",
    status: "done",
    resources: ["freeCodeCamp", "CS50"],
    subtasks: ["Variables & Data Types", "Control Flow", "Functions", "OOP Basics"],
  },
  {
    id: "2",
    title: "Data Structures & Algorithms",
    description: "Learn essential DSA for technical interviews",
    duration: "4 weeks",
    status: "current",
    resources: ["LeetCode", "NeetCode 150"],
    subtasks: ["Arrays & Hashing", "Linked Lists", "Trees & Graphs", "Dynamic Programming"],
  },
  {
    id: "3",
    title: "Backend Development",
    description: "Build RESTful APIs and understand server architecture",
    duration: "3 weeks",
    status: "upcoming",
    resources: ["Node.js Docs", "Express.js Guide"],
    subtasks: ["HTTP & REST", "Express.js", "Authentication", "Database Integration"],
  },
  {
    id: "4",
    title: "Databases",
    description: "Master SQL and NoSQL database systems",
    duration: "2 weeks",
    status: "upcoming",
    resources: ["PostgreSQL Tutorial", "MongoDB University"],
    subtasks: ["SQL Fundamentals", "Schema Design", "Indexing", "Transactions"],
  },
  {
    id: "5",
    title: "System Design",
    description: "Learn to design scalable distributed systems",
    duration: "3 weeks",
    status: "upcoming",
    resources: ["System Design Primer", "Designing Data-Intensive Applications"],
    subtasks: ["Load Balancing", "Caching", "Message Queues", "Microservices"],
  },
];

const statusConfig = {
  done: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10", line: "bg-success" },
  current: { icon: Circle, color: "text-primary", bg: "bg-primary/10", line: "bg-primary" },
  upcoming: { icon: Circle, color: "text-muted-foreground", bg: "bg-muted", line: "bg-border" },
};

export default function Roadmap() {
  const [goal, setGoal] = useState("Become a Backend Engineer");
  const [expandedId, setExpandedId] = useState<string | null>("2");
  const [generated, setGenerated] = useState(true);

  return (
    <PageWrapper title="AI Roadmap Architect" subtitle="Describe a goal and get a personalized learning path">
      {/* Input */}
      <GlassCard className="mb-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., Become a Backend Engineer"
            className="flex-1 rounded-xl bg-muted/50 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 transition-shadow"
          />
          <button
            onClick={() => setGenerated(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <Sparkles className="h-4 w-4" />
            Generate Roadmap
          </button>
        </div>
      </GlassCard>

      {/* Timeline */}
      {generated && (
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-4">
            {mockRoadmap.map((node, i) => {
              const cfg = statusConfig[node.status];
              const Icon = cfg.icon;
              const isExpanded = expandedId === node.id;

              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <div className="relative flex gap-4 pl-0">
                    {/* Timeline dot */}
                    <div className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${cfg.bg}`}>
                      <Icon className={`h-5 w-5 ${cfg.color}`} />
                    </div>

                    {/* Card */}
                    <GlassCard
                      className="flex-1"
                      hover
                      onClick={() => setExpandedId(isExpanded ? null : node.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">{node.title}</h3>
                            {node.status === "current" && (
                              <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                                IN PROGRESS
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{node.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {node.duration}
                          </span>
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-border/50">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-xs font-semibold text-foreground mb-2">Subtasks</h4>
                                  <div className="space-y-1.5">
                                    {node.subtasks.map((st, j) => (
                                      <div key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <ArrowRight className="h-3 w-3 text-primary" />
                                        {st}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-xs font-semibold text-foreground mb-2">Resources</h4>
                                  <div className="space-y-1.5">
                                    {node.resources.map((r, j) => (
                                      <div key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <BookOpen className="h-3 w-3 text-accent" />
                                        {r}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </GlassCard>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
