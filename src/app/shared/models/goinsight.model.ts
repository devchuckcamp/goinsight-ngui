export interface FeedbackItem {
  id: string;
  created_at: string;
  customer_tier: 'enterprise' | 'professional' | 'starter' | 'free';
  priority: number;
  product_area: 'billing' | 'api' | 'ui' | 'performance' | 'security' | 'documentation' | 'other';
  region: 'NA' | 'EU' | 'APAC' | 'LATAM' | 'other';
  sentiment: 'positive' | 'negative' | 'neutral';
  source: 'zendesk' | 'slack' | 'email' | 'survey' | 'other';
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

export interface AskRequest {
  question: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
