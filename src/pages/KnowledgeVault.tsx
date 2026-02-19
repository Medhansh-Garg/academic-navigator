import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Link2,
  Code2,
  FileText,
  Plus,
  Search,
  Grid3X3,
  List,
  Sparkles,
  ExternalLink,
  Tag,
  Clock,
} from "lucide-react";
import { PageWrapper } from "@/components/PageWrapper";
import { GlassCard } from "@/components/GlassCard";

type ItemType = "link" | "snippet" | "pdf";
type ViewMode = "grid" | "list";

interface VaultItem {
  id: string;
  type: ItemType;
  title: string;
  description: string;
  tags: string[];
  date: string;
  url?: string;
  preview?: string;
}

const mockItems: VaultItem[] = [
  {
    id: "1",
    type: "link",
    title: "React Server Components Deep Dive",
    description: "Comprehensive guide on RSC architecture and patterns",
    tags: ["React", "Frontend"],
    date: "2 hours ago",
    url: "https://react.dev",
  },
  {
    id: "2",
    type: "snippet",
    title: "Binary Search Implementation",
    description: "Optimized binary search with edge case handling",
    tags: ["DSA", "Python"],
    date: "Yesterday",
    preview: "def binary_search(arr, target):\n    lo, hi = 0, len(arr)-1\n    ...",
  },
  {
    id: "3",
    type: "pdf",
    title: "Operating Systems – Chapter 5",
    description: "Process scheduling algorithms and deadlock prevention",
    tags: ["OS", "Theory"],
    date: "3 days ago",
  },
  {
    id: "4",
    type: "link",
    title: "System Design Primer",
    description: "Learn how to design large-scale systems",
    tags: ["System Design"],
    date: "1 week ago",
    url: "https://github.com",
  },
  {
    id: "5",
    type: "snippet",
    title: "JWT Auth Middleware",
    description: "Express.js middleware for JWT token validation",
    tags: ["Node.js", "Auth"],
    date: "4 days ago",
    preview: "const verifyToken = (req, res, next) => {\n  const token = req.headers...",
  },
  {
    id: "6",
    type: "pdf",
    title: "Database Normalization Notes",
    description: "1NF to BCNF with examples and exercises",
    tags: ["DBMS", "Notes"],
    date: "5 days ago",
  },
];

const typeConfig = {
  link: { icon: Link2, color: "text-info", bg: "bg-info/10" },
  snippet: { icon: Code2, color: "text-accent", bg: "bg-accent/10" },
  pdf: { icon: FileText, color: "text-warning", bg: "bg-warning/10" },
};

const filterOptions: { label: string; value: ItemType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Links", value: "link" },
  { label: "Snippets", value: "snippet" },
  { label: "PDFs", value: "pdf" },
];

export default function KnowledgeVault() {
  const [view, setView] = useState<ViewMode>("grid");
  const [filter, setFilter] = useState<ItemType | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = mockItems.filter((item) => {
    if (filter !== "all" && item.type !== filter) return false;
    if (search && !item.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <PageWrapper title="Knowledge Vault" subtitle="Your curated library of links, code & documents">
      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`rounded-xl px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                filter === opt.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "btn-glass"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search vault..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="glass-panel h-9 w-48 rounded-xl pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button
            onClick={() => setView(view === "grid" ? "list" : "grid")}
            className="btn-glass p-2 rounded-xl"
          >
            {view === "grid" ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>

      {/* Items grid */}
      <motion.div
        layout
        className={
          view === "grid"
            ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col gap-3"
        }
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => {
            const cfg = typeConfig[item.type];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <GlassCard hover>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`rounded-lg p-2 ${cfg.bg}`}>
                      <Icon className={`h-4 w-4 ${cfg.color}`} />
                    </div>
                    <div className="flex items-center gap-1">
                      {item.type === "pdf" && (
                        <button className="btn-glass flex items-center gap-1 px-2.5 py-1 text-xs text-primary">
                          <Sparkles className="h-3 w-3" />
                          Summarize
                        </button>
                      )}
                      {item.url && (
                        <button className="btn-glass p-1.5">
                          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      )}
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm text-foreground leading-snug mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  {item.preview && (
                    <pre className="mb-3 rounded-lg bg-muted/50 p-3 text-[10px] text-muted-foreground font-mono line-clamp-3 overflow-hidden">
                      {item.preview}
                    </pre>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground"
                        >
                          <Tag className="h-2.5 w-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="h-2.5 w-2.5" />
                      {item.date}
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </PageWrapper>
  );
}
