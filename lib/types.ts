export interface Client {
  id: string;
  name: string;
  brandColors: string[];
  brandStyle: string;
  logo?: string;
  referenceImages: string[];
}

export interface BlogContent {
  title: string;
  metaDescription?: string;
  body: string;
}

export interface ImageOpportunity {
  id: string;
  type: 'cover' | 'in-blog' | 'og';
  position?: string;
  prompt: string;
  aspectRatio: string;
  status: 'pending' | 'generating' | 'completed' | 'error';
  generatedUrl?: string;
  iteration: number;
}

export interface SocialStrategy {
  format: 'carousel' | 'infographic' | 'static';
  rationale: string;
  slides?: {
    id: string;
    prompt: string;
    status: 'pending' | 'generating' | 'completed';
    generatedUrl?: string;
  }[];
}

export interface Project {
  id: string;
  clientId: string;
  blogContent: BlogContent;
  opportunities: ImageOpportunity[];
  socialStrategy?: SocialStrategy;
  currentStep: number;
  createdAt: Date;
  status: 'draft' | 'analyzing' | 'review' | 'generating' | 'completed';
}
