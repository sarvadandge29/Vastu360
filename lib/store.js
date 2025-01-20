import { create } from 'zustand';

const useStore = create((set) => ({
    selectedSite: null,
    updateState: (newValue) => set({ selectedSite: newValue }),
}));

export default useStore;