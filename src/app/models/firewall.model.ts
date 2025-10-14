import { Policy } from "./policy.model";

export interface Firewall {
  id: number;
  name: string;
  policies?: Policy[];
}

export interface FirewallPaginatedResponse {
  current_page: number;
  items: Firewall[];
  next_page: number | null;
  prev_page: number | null;
  total_pages: number;
}
