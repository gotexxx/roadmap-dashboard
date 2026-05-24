"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface XpEntry {
  date: string;
  xpGained: number;
}

export function XpHistoryChart() {
  const [data, setData] = useState<XpEntry[]>([]);

  useEffect(() => {
    fetch("/api/progress/xp-history")
      .then((res) => res.json())
      .then((json) => setData(json.history ?? []))
      .catch(() => {});
  }, []);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-24 text-xs text-zinc-600">
        Noch keine XP-Historie — verdiene XP um den Verlauf zu sehen
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={120}>
      <AreaChart
        data={data}
        margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
        <XAxis
          dataKey="date"
          tick={{ fill: "#52525b", fontSize: 9 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(d) => d.slice(5)} // "2026-05-24" → "05-24"
        />
        <YAxis
          tick={{ fill: "#52525b", fontSize: 9 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: "#18181b",
            border: "1px solid #27272a",
            borderRadius: 8,
            fontSize: 11,
          }}
          labelStyle={{ color: "#a1a1aa" }}
          formatter={(v) => [`${Number(v)} XP`, "gesammelte XP"]}
        />
        <Area
          type="monotone"
          dataKey="xpGained"
          stroke="#3b82f6"
          strokeWidth={1.5}
          fill="url(#xpGrad)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
