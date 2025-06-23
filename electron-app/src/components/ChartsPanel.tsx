import React, { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
  ChartOptions,
} from "chart.js";
import { Sheet, Box, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";

// Register Chart.js components once
Chart.register(
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ChartTooltip,
  ChartLegend,
);

export default function ChartsPanel() {
  const theme = useTheme();
  // @ts-ignore
  const isDark = theme.colorScheme === "dark";

  // forced colors for dark/light
  const textColor = isDark ? "#FFFFFF" : "#000000";
  const gridColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)";
  const bgSurface = isDark ? theme.vars.palette.background.surface : "#FFFFFF";
  const p500 = theme.vars.palette.primary[500];
  const p300 = theme.vars.palette.primary[300];

  // fetch stats
  const [stats, setStats] = useState<{ ts: number; type: string }[]>([]);
  useEffect(() => {
    const fetchStats = async () => {
      const all = await window.api.getHistory();
      setStats(all.map((r: any) => ({ ts: r.timestamp, type: r.type })));
    };
    fetchStats();
    const off = window.api.onHistory(fetchStats);
    return off;
  }, []);
  if (!stats.length) return null;

  // aggregate data
  const counts = stats.reduce<Record<string, number>>((acc, s) => {
    acc[s.type] = (acc[s.type] || 0) + 1;
    return acc;
  }, {});
  const perDayRaw = stats.reduce<Record<string, number>>((acc, s) => {
    const d = new Date(s.ts).toLocaleDateString();
    acc[d] = (acc[d] || 0) + 1;
    return acc;
  }, {});

  // prepare per-day buckets (max 5 points)
  const dayEntries = Object.entries(perDayRaw).sort(
    ([a], [b]) => new Date(a).getTime() - new Date(b).getTime(),
  );

  let dayLabels: string[];
  let dayValues: number[];

  if (dayEntries.length <= 5) {
    dayLabels = dayEntries.map(([d]) => d);
    dayValues = dayEntries.map(([, v]) => v);
  } else {
    const buckets = 5;
    const size = Math.ceil(dayEntries.length / buckets);
    const lbls: string[] = [];
    const vals: number[] = [];

    for (let i = 0; i < buckets; i++) {
      const slice = dayEntries.slice(i * size, i * size + size);
      if (!slice.length) continue;
      const [first, , last] = [
        slice[0][0],
        slice[Math.floor(slice.length / 2)][0],
        slice[slice.length - 1][0],
      ];
      const label = first === last ? first : `${first} – ${last}`;
      const sum = slice.reduce((sum, [, v]) => sum + v, 0);
      lbls.push(label);
      vals.push(sum);
    }
    dayLabels = lbls;
    dayValues = vals;
  }

  // palette for chart segments
  const segmentColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#8AFFC1",
    "#FF8A8A",
  ];

  // shared options
  const commonOpts: ChartOptions<"doughnut" | "line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: textColor },
      },
      tooltip: {
        titleColor: textColor,
        bodyColor: textColor,
        backgroundColor: bgSurface,
        borderColor: gridColor,
        borderWidth: 1,
      },
      title: { display: false },
    },
    scales: {
      x: { ticks: { color: textColor }, grid: { color: gridColor } },
      y: { ticks: { color: textColor }, grid: { color: gridColor } },
    },
  };

  const doughnutLabels = Object.keys(counts);
  const doughnutData = Object.values(counts);

  return (
    <Sheet
      variant="outlined"
      sx={{
        p: 2,
        bgcolor: "background.surface",
        borderRadius: "sm",
        boxShadow: "sm",
        border: "1px solid",
        borderColor: "neutral.300",
      }}
    >
      {/* @ts-ignore */}
      <Typography level="h5" color="text.primary" sx={{ mb: 0.5 }}>
        Clipboard Analytics
      </Typography>
      {/* @ts-ignore */}
      <Typography level="body-sm" color="text.secondary" sx={{ mb: 2 }}>
        Visual overview of your clipboard usage. Select a chart to explore
        details.
      </Typography>

      {/* @ts-ignore */}
      <Typography level="title-sm" color="text.primary" sx={{ mb: 1 }}>
        Usage Distribution
      </Typography>
      <Box
        sx={{
          height: 240,
          mb: 3,
          bgcolor: bgSurface,
          p: 1,
          borderRadius: "sm",
          boxShadow: "sm",
        }}
      >
        <Doughnut
          data={{
            labels: doughnutLabels,
            datasets: [
              {
                data: doughnutData,
                backgroundColor: doughnutLabels.map(
                  (_, i) => segmentColors[i % segmentColors.length],
                ),
                hoverBackgroundColor: doughnutLabels.map(
                  (_, i) => segmentColors[i % segmentColors.length],
                ),
              },
            ],
          }}
          options={commonOpts}
        />
      </Box>

      {/* @ts-ignore */}
      <Typography level="title-sm" color="text.primary" sx={{ mb: 1 }}>
        Copies Per Day
      </Typography>
      <Box
        sx={{
          height: 240,
          bgcolor: bgSurface,
          p: 1,
          borderRadius: "sm",
          boxShadow: "sm",
        }}
      >
        <Line
          data={{
            labels: dayLabels,
            datasets: [
              {
                label: "Total copies",
                data: dayValues,
                tension: 0.3,
                borderColor: p500,
                pointBackgroundColor: p500,
                backgroundColor: p500 + "33",
                fill: true,
              },
            ],
          }}
          // @ts-ignore
          options={commonOpts}
        />
      </Box>
    </Sheet>
  );
}
