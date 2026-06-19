import React from "react";
import { STAT_STYLES } from "../../constants/pengajuanConstants";

export default function PengajuanStats({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100 hover:shadow-xl transition-all animate-fade-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div
            className={`text-xs font-bold uppercase tracking-widest ${STAT_STYLES[stat.color] || "text-gray-600"} mb-3`}
          >
            {stat.label}
          </div>
          <p className="text-5xl font-bold text-gray-800 tracking-tighter">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
