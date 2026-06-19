import React from "react";
import PengajuanFilters from "./PengajuanFilters";
import PengajuanMobileList from "./PengajuanMobileList";
import PengajuanTable from "./PengajuanTable";
import PengajuanTabs from "./temp/PengajuanTabs";

export default function PengajuanListCard({
  activeTab,
  counts,
  items,
  search,
  onDetail,
  onReset,
  onSearchChange,
  onTabChange,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-scale-in">
      {/* <PengajuanTabs activeTab={activeTab} counts={counts} onChange={onTabChange} /> */}
      <PengajuanFilters
        search={search}
        onSearchChange={onSearchChange}
        onReset={onReset}
      />
      <div className="overflow-hidden">
        <PengajuanTable items={items} onDetail={onDetail} />
        <PengajuanMobileList items={items} onDetail={onDetail} />
      </div>
    </div>
  );
}
