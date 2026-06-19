import React from "react";
import useCounter from "../hooks/useCounter";
import Sparkline from "./Sparkline";

export default function StatCard({
  icon,
  label,
  value,
  sub,
  color,
  sparkColor,
  delay,
  prefix = "",
  suffix = "",
}) {
  const num = useCounter(value, 1300, delay + 200);

  return (
    <div
      className="d-card bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
      style={{ animation: `fadeUp 0.55s ${delay}ms both` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${color}18`, color }}
          >
            {icon}
          </div>
          <span className="text-xs font-semibold text-gray-500 leading-tight max-w-[120px]">
            {label}
          </span>
        </div>
        <Sparkline color={sparkColor} delay={delay} data={value} />
      </div>
      <p className="text-[1.65rem] font-extrabold stat-num tracking-tight leading-none">
        {prefix}
        {num.toLocaleString("id-ID")}
        {suffix}
      </p>
      <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
          <path d="M6 1.5l4.5 5H8V11H4V6.5H1.5L6 1.5z" />
        </svg>
        {sub}
      </p>
    </div>
  );
}
