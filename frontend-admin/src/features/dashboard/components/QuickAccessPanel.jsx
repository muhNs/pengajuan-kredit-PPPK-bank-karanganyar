import React from 'react';
import { ChevronRight, ClipboardList, Database, Settings, Users } from 'lucide-react';
import BankBrandCard from './BankBrandCard';

const ICONS = {
    users: Users,
    database: Database,
    clipboard: ClipboardList,
    settings: Settings,
};

export default function QuickAccessPanel({ links, onNavigate }) {
    const handleKeyDown = (event, path) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onNavigate(path);
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" style={{ animation: 'fadeUp 0.55s 340ms both' }}>
            <div className="px-6 py-4 border-b border-gray-50">
                <h3 className="text-sm font-bold text-gray-800">Akses Cepat</h3>
            </div>
            <div className="p-3 space-y-1">
                {links?.map((link, index) => {
                    const Icon = ICONS[link.icon] || Database;

                    return (
                        <div
                            key={link.path}
                            role="button"
                            tabIndex={0}
                            className="q-row flex items-center justify-between px-3 py-3"
                            onClick={() => onNavigate(link.path)}
                            onKeyDown={(event) => handleKeyDown(event, link.path)}
                            style={{ animation: `fadeUp 0.4s ${440 + index * 65}ms both` }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: `${link.color}15`, color: link.color }}
                                >
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-semibold text-gray-800">{link.label}</p>
                                        {link.badge && (
                                            <span
                                                className="text-[10px] font-bold px-1.5 py-0.5 rounded-md text-white leading-none"
                                                style={{ background: '#f59e0b' }}
                                            >
                                                {link.badge}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[11px] text-gray-400 mt-0.5">{link.desc}</p>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                        </div>
                    );
                })}
            </div>
            <BankBrandCard />
        </div>
    );
}
