export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  avatar?: string;
}

export interface UpdateUser {
  name: string;
  email: string;
  avatar?: File | string | null;
  _method?: string;
}
