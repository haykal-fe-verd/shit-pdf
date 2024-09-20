/* eslint-disable no-param-reassign */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';

interface State {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const applyTheme = (theme: Theme) => {
  const html = document.documentElement;
  html.classList.remove('dark', 'light');

  if (theme === 'system') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  html.classList.add(theme);
  localStorage.setItem('theme', theme);
};

export const useThemeStore = create<State>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme: Theme) => {
        applyTheme(theme);
        set({ theme });
      },
    }),
    {
      name: 'theme-storage',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      getStorage: () => localStorage,
    }
  )
);
