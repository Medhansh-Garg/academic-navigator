import { useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Sparkles,
  CheckCircle2,
  XCircle,
  Circle,
  Clock,
  ChevronDown,
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { PageWrapper } from "@/components/PageWrapper";
import { GlassCard } from "@/components/GlassCard";

interface TestCase {
  id: number;
  input: string;
  expected: string;
  actual?: string;
  status?: "pass" | "fail" | "running";
}

const defaultProblem = {
  title: "Two Sum",
  difficulty: "Easy",
  description:
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
  constraints: [
    "2 ≤ nums.length ≤ 10⁴",
    "-10⁹ ≤ nums[i] ≤ 10⁹",
    "-10⁹ ≤ target ≤ 10⁹",
    "Only one valid answer exists.",
  ],
  examples: [
    { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
    { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
  ],
};

const defaultCode = `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
`;

const defaultTestCases: TestCase[] = [
  { id: 1, input: "[2,7,11,15], 9", expected: "[0, 1]" },
  { id: 2, input: "[3,2,4], 6", expected: "[1, 2]" },
  { id: 3, input: "[3,3], 6", expected: "[0, 1]" },
];

const difficultyColor = {
  Easy: "text-success bg-success/10",
  Medium: "text-warning bg-warning/10",
  Hard: "text-destructive bg-destructive/10",
};

export default function Testpad() {
  const [topic, setTopic] = useState("");
  const [code, setCode] = useState(defaultCode);
  const [testCases, setTestCases] = useState<TestCase[]>(defaultTestCases);
  const [running, setRunning] = useState(false);

  const runTests = () => {
    setRunning(true);
    setTestCases((prev) =>
      prev.map((tc) => ({ ...tc, status: "running", actual: undefined }))
    );

    // Simulate sequential test execution
    testCases.forEach((_, i) => {
      setTimeout(() => {
        setTestCases((prev) =>
          prev.map((tc, j) =>
            j === i
              ? {
                  ...tc,
                  status: j < 2 ? "pass" : Math.random() > 0.3 ? "pass" : "fail",
                  actual: tc.expected,
                }
              : tc
          )
        );
        if (i === testCases.length - 1) setRunning(false);
      }, 800 * (i + 1));
    });
  };

  return (
    <PageWrapper title="Testpad" subtitle="Practice coding problems with AI-generated challenges">
      {/* Topic input */}
      <GlassCard className="mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic (e.g., 'Invert a binary tree')"
            className="flex-1 rounded-xl bg-muted/50 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 transition-shadow"
          />
          <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 transition-opacity whitespace-nowrap">
            <Sparkles className="h-4 w-4" />
            Generate Problem
          </button>
        </div>
      </GlassCard>

      {/* Split pane */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left - Problem */}
        <GlassCard className="overflow-y-auto max-h-[calc(100vh-280px)] scrollbar-thin">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-bold text-foreground">{defaultProblem.title}</h2>
            <span
              className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                difficultyColor[defaultProblem.difficulty as keyof typeof difficultyColor]
              }`}
            >
              {defaultProblem.difficulty}
            </span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {defaultProblem.description}
          </p>

          <div className="mb-4">
            <h3 className="text-xs font-semibold text-foreground mb-2">Constraints</h3>
            <ul className="space-y-1">
              {defaultProblem.constraints.map((c, i) => (
                <li key={i} className="text-xs text-muted-foreground font-mono">
                  • {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-foreground">Examples</h3>
            {defaultProblem.examples.map((ex, i) => (
              <div key={i} className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs font-mono text-muted-foreground">
                  <span className="font-semibold text-foreground">Input:</span> {ex.input}
                </p>
                <p className="text-xs font-mono text-muted-foreground mt-1">
                  <span className="font-semibold text-foreground">Output:</span> {ex.output}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Right - Editor */}
        <div className="flex flex-col gap-4">
          <GlassCard className="flex-1 p-0 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/30">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">Python</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </div>
              <button
                onClick={runTests}
                disabled={running}
                className="flex items-center gap-2 rounded-lg bg-success px-4 py-1.5 text-xs font-medium text-success-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Play className="h-3.5 w-3.5" />
                {running ? "Running..." : "Run"}
              </button>
            </div>
            <Editor
              height="350px"
              defaultLanguage="python"
              value={code}
              onChange={(v) => setCode(v || "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                padding: { top: 12 },
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                renderLineHighlight: "gutter",
              }}
            />
          </GlassCard>

          {/* Test results */}
          <GlassCard>
            <h3 className="text-xs font-semibold text-foreground mb-3">Test Cases</h3>
            <div className="space-y-2">
              {testCases.map((tc) => (
                <motion.div
                  key={tc.id}
                  layout
                  className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    {tc.status === "pass" ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : tc.status === "fail" ? (
                      <XCircle className="h-4 w-4 text-destructive" />
                    ) : tc.status === "running" ? (
                      <Clock className="h-4 w-4 text-warning animate-pulse" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-xs font-mono text-muted-foreground">
                      Test {tc.id}: {tc.input}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">→ {tc.expected}</span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </PageWrapper>
  );
}
