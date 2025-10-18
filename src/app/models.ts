// API response types

export interface FeedbackItem {
  id: string;
  created_at: string;
  customer_tier: string;
  priority: number;
  product_area: string;
  region: string;
  sentiment: string;
  source: string;
  summary: string;
  topic: string;
}

export interface Action {
  title: string;
  description: string;
  magnitude?: number;
}

export interface AskResponse {
  question: string;
  data_preview: FeedbackItem[];
  summary: string;
  recommendations: string[];
  actions: Action[];
}
