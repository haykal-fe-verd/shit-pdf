export interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginationType {
  current_page: number;
  path?: string;
  first_page_url?: string;
  last_page_url?: string;
  next_page_url?: string | null;
  prev_page_url?: string | null;
  from: number;
  to: number;
  last_page: number;
  per_page: number;
  total: number;
  links: Link[];
}
