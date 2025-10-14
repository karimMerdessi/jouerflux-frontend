import { Rule } from './rule.model';

export interface Policy {
  id: number;
  name: string;
  firewall_id: number;
  rules: Rule[];
  firewallName?: string;
}

export interface PolicyPaginatedResponse {
  current_page: number;
  items: Policy[];
  next_page: number | null;
  prev_page: number | null;
  total_pages: number;
}
