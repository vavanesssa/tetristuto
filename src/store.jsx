import create from 'zustand';

export const useStore = create((set) => ({
  boardData: null,
  setBoardData: (data) => set({ boardData: data }),
}));
