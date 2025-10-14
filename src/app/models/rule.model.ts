export interface Rule {
  id: number;
  name: string;
  policy_id: number;
  policyName?: string;
}

export interface PaginatedRules {
  current_page: number;
  items: Rule[];
  next_page: number | null;
  prev_page: number | null;
  total_pages: number;
}
