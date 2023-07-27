import { create } from 'zustand';

export const useStore = create((set) => ({
  points: 0,
}));
