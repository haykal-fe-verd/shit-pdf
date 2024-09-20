import { LucideIcon, Monitor, Moon, Sun } from 'lucide-react';

import { Theme } from '@/stores/use-theme-store';

interface ThemeModeType {
  name: string;
  value: Theme;
  icon: LucideIcon;
}

export const themeMode: ThemeModeType[] = [
  { name: 'System', value: 'system', icon: Monitor },
  { name: 'Light', value: 'light', icon: Sun },
  { name: 'Dark', value: 'dark', icon: Moon },
];
