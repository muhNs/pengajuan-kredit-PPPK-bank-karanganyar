import { create } from 'zustand';

export const useUIStore = create((set) => ({
    globalSearch: '',
    setGlobalSearch: (term) => set({ globalSearch: term }),
    isSidebarOpen: false,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    closeSidebar: () => set({ isSidebarOpen: false }),
}));
