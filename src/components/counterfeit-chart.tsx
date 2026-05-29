"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CategoryCount } from "@/lib/admin-stats";

const RED = "#D4302F";

// Horizontal bar chart of the most-counterfeited part categories.
export function CounterfeitChart({ data }: { data: CategoryCount[] }) {
  if (data.length === 0) {
    return (
      <div className="flex h-[260px] items-center justify-center text-sm text-muted-foreground">
        No counterfeits recorded yet.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={Math.max(180, data.length * 52)}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
        <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12, fill: "#64748B" }} />
        <YAxis
          type="category"
          dataKey="name"
          width={140}
          tick={{ fontSize: 12, fill: "#0A1929" }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          cursor={{ fill: "#F1F5F9" }}
          formatter={(value: number) => [`${value} counterfeits`, ""]}
          labelStyle={{ color: "#0A1929", fontWeight: 600 }}
        />
        <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={22}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={RED} fillOpacity={0.85} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
