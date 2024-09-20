/* eslint-disable @typescript-eslint/no-explicit-any */

import { Config } from 'ziggy-js';
import { User } from '@/types/user';

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  user: User;
  ziggy: Config & { location: string; query: any };
  status?: string;
  success?: string;
  error?: string;
  message?: string;
};
