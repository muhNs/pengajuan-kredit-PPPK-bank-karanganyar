import React from "react";
import { PENGAJUAN_TABS } from "../../constants/pengajuanConstants";

export default function PengajuanTabs({ activeTab, counts, onChange }) {
  return (
    <div className="flex border-b border-gray-100 overflow-x-auto bg-gray-50/50">
      {PENGAJUAN_TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={`px-8 py-6 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
            activeTab === tab
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab}
          <span className="ml-2 text-xs px-2.5 py-0.5 rounded-full bg-gray-100">
            {counts[tab] || 0}
          </span>
        </button>
      ))}
    </div>
  );
}
