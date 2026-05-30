"use client";

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import type { CityHotspot } from "@/lib/admin-stats";

// Brand palette for severity tiers (red → amber → green).
const RED = "#D4302F";
const AMBER = "#F4B400";
const GREEN = "#0F9D58";

// Severity is relative to the worst city so the map adapts to whatever the
// data looks like during the demo.
function severityColor(count: number, max: number): string {
  const ratio = max === 0 ? 0 : count / max;
  if (ratio > 0.6) return RED;
  if (ratio > 0.3) return AMBER;
  return GREEN;
}

export function AfricaMap({ hotspots }: { hotspots: CityHotspot[] }) {
  const max = hotspots.reduce((m, h) => Math.max(m, h.counterfeits), 0);

  return (
    <div className="relative">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 380, center: [18, 3] }}
        height={460}
        style={{ width: "70%", height: "auto", margin: "0 auto" }}
      >
        <Geographies geography="/africa.geo.json">
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#E8EDF2"
                stroke="#FFFFFF"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { fill: "#DCE3EA", outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {hotspots.map((h) => {
          const color = severityColor(h.counterfeits, max);
          const radius = 5 + (max === 0 ? 0 : h.counterfeits / max) * 16;
          return (
            <Marker key={h.city} coordinates={h.coordinates}>
              <circle r={radius} fill={color} fillOpacity={0.65} stroke={color} strokeWidth={1.5}>
                <title>{`${h.city}: ${h.counterfeits} counterfeit${h.counterfeits === 1 ? "" : "s"}`}</title>
              </circle>
              <text
                textAnchor="middle"
                y={-radius - 4}
                className="fill-primary"
                style={{ fontSize: 9, fontWeight: 600, pointerEvents: "none" }}
              >
                {h.city}
              </text>
            </Marker>
          );
        })}
      </ComposableMap>

      {hotspots.length === 0 && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <p className="rounded-md bg-background/80 px-4 py-2 text-sm text-muted-foreground shadow-sm">
            No counterfeit hotspots yet.
          </p>
        </div>
      )}

      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <Legend color={RED} label="High" />
        <Legend color={AMBER} label="Medium" />
        <Legend color={GREEN} label="Low" />
        <span>· bubble size = counterfeit volume</span>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
