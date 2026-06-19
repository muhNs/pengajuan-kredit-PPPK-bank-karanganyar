import { User } from "lucide-react";
import { useAuthStore } from "../../features/auth/stores/authStore";

export const ProfileCard = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="px-4 py-3 border-b border-white/10">
      <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/10 rounded-xl p-3.5 border border-yellow-400/30 backdrop-blur-sm shadow-lg">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="h-12 w-12 rounded-full bg-yellow-400 flex items-center justify-center text-[#1a1c2d] shadow-lg flex-shrink-0">
            <User size={24} strokeWidth={2.5} />
          </div>

          {/* Info Profile */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">
              {user?.username || "Admin"}
            </p>
            <p className="text-xs text-gray-300 truncate">
              {user?.email || "admin@bank.com"}
            </p>
          </div>
        </div>

        {/* Badge Role */}
        <div className="mt-2.5 pt-2.5 border-t border-yellow-400/20">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400/30 text-yellow-200 border border-yellow-400/40">
            {user?.role || "Super Administrator"}
          </span>
        </div>
      </div>
    </div>
  );
};
