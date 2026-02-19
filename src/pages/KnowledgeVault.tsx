import { useState } from "react";
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
  link: { icon: Link2, label: "Link" },
  snippet: { icon: Code2, label: "Snippet" },
  pdf: { icon: FileText, label: "PDF" },
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
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1.5">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors duration-150 ${
                filter === opt.value
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 w-44 rounded-lg border border-border bg-card pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/40 transition-colors"
            />
          </div>
          <button
            onClick={() => setView(view === "grid" ? "list" : "grid")}
            className="btn-ghost p-1.5 rounded-lg"
          >
            {view === "grid" ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity">
            <Plus className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>

      {/* Items grid */}
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col gap-2"
        }
      >
        {filtered.map((item) => {
          const cfg = typeConfig[item.type];
          const Icon = cfg.icon;
          return (
            <GlassCard key={item.id} hover>
              <div className="flex items-start justify-between mb-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
                  <Icon className="h-3 w-3" />
                  {cfg.label}
                </span>
                <div className="flex items-center gap-1">
                  {item.type === "pdf" && (
                    <button className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-primary hover:bg-secondary transition-colors">
                      <Sparkles className="h-3 w-3" />
                      Summarize
                    </button>
                  )}
                  {item.url && (
                    <button className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
              <h3 className="font-medium text-sm text-foreground leading-snug mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {item.description}
              </p>
              {item.preview && (
                <pre className="mb-3 rounded-md bg-muted p-2.5 text-[11px] text-muted-foreground font-mono line-clamp-3 overflow-hidden">
                  {item.preview}
                </pre>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-[11px] text-muted-foreground">{item.date}</span>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </PageWrapper>
  );
}
