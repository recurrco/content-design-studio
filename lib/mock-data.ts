import { Client, ImageOpportunity, SocialStrategy } from './types';

export const mockClients: Client[] = [
  {
    id: 'client-1',
    name: 'TechVenture Inc',
    brandColors: ['#2C3E50', '#E74C3C', '#ECF0F1'],
    brandStyle: 'Modern, minimalist with bold accents. Clean sans-serif typography. Emphasis on innovation and technology.',
    referenceImages: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800'
    ]
  },
  {
    id: 'client-2',
    name: 'GreenEarth Organics',
    brandColors: ['#27AE60', '#F39C12', '#FFFFFF'],
    brandStyle: 'Natural, organic, earthy tones. Hand-drawn illustrations welcome. Warm and approachable.',
    referenceImages: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
      'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800'
    ]
  },
  {
    id: 'client-3',
    name: 'FinanceFirst Advisors',
    brandColors: ['#1E3A8A', '#10B981', '#F3F4F6'],
    brandStyle: 'Professional, trustworthy, corporate. Geometric shapes. Data visualizations preferred.',
    referenceImages: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
    ]
  }
];

export const mockImageOpportunities: ImageOpportunity[] = [
  {
    id: 'opp-1',
    type: 'cover',
    position: 'Top of article',
    prompt: 'Modern office workspace with diverse team collaborating around a digital screen, showing data analytics. Clean, bright environment with natural light. Brand colors: #2C3E50 and #E74C3C accents. Minimalist aesthetic with technology focus.',
    aspectRatio: '16:9',
    status: 'pending',
    iteration: 1
  },
  {
    id: 'opp-2',
    type: 'in-blog',
    position: 'After paragraph 3 (discussing remote work benefits)',
    prompt: 'Split screen showing home office setup on left and traditional office on right. Balance and harmony between work environments. Modern, clean aesthetic with brand colors #2C3E50 and #E74C3C. Professional yet comfortable atmosphere.',
    aspectRatio: '16:9',
    status: 'pending',
    iteration: 1
  },
  {
    id: 'opp-3',
    type: 'in-blog',
    position: 'After paragraph 7 (productivity statistics)',
    prompt: 'Infographic-style data visualization showing productivity metrics. Clean bar charts and line graphs in brand colors #2C3E50 and #E74C3C. Minimalist design with clear labels. Professional and modern aesthetic.',
    aspectRatio: '16:9',
    status: 'pending',
    iteration: 1
  },
  {
    id: 'opp-4',
    type: 'og',
    position: 'Open Graph meta tag',
    prompt: 'Blog title "The Future of Remote Work in 2026" prominently displayed with abstract geometric pattern background in brand colors #2C3E50 and #E74C3C. Modern sans-serif typography. Professional and eye-catching. 1200x630px dimensions.',
    aspectRatio: '1200:630',
    status: 'pending',
    iteration: 1
  }
];

export const mockSocialStrategy: SocialStrategy = {
  format: 'carousel',
  rationale: 'The blog discusses 5 key trends in remote work. A carousel format allows us to break down each trend into a digestible slide, maximizing engagement on Instagram and LinkedIn.',
  slides: [
    {
      id: 'slide-1',
      prompt: 'Cover slide with title "5 Remote Work Trends for 2026" in bold typography. Abstract tech-inspired background with brand colors #2C3E50 and #E74C3C. Modern and attention-grabbing.',
      status: 'pending'
    },
    {
      id: 'slide-2',
      prompt: 'Slide 1: "Hybrid Models are Here to Stay" with icon of office building and home. Clean layout with brand colors. Key stat: 73% of companies adopting hybrid. Minimalist design.',
      status: 'pending'
    },
    {
      id: 'slide-3',
      prompt: 'Slide 2: "AI-Powered Productivity Tools" with illustration of robot assisting human. Modern tech aesthetic. Brand colors #2C3E50 and #E74C3C. Professional yet approachable.',
      status: 'pending'
    },
    {
      id: 'slide-4',
      prompt: 'Slide 3: "Mental Health Focus" with wellness icons and calm imagery. Soft approach while maintaining brand identity. Brand colors used subtly.',
      status: 'pending'
    },
    {
      id: 'slide-5',
      prompt: 'Slide 4: "Global Talent Pool" with world map and connection lines. International feel. Brand colors #2C3E50 and #E74C3C. Modern and inclusive.',
      status: 'pending'
    },
    {
      id: 'slide-6',
      prompt: 'Slide 5: "Sustainability in Remote Work" with green tech imagery. Eco-friendly messaging while staying on brand. Call-to-action to read full blog.',
      status: 'pending'
    }
  ]
};

export const sampleBlogContent = `The landscape of remote work continues to evolve at an unprecedented pace. As we move through 2026, organizations worldwide are discovering that the future of work is not just about where we work, but how we work.

The COVID-19 pandemic accelerated a transformation that was already underway, forcing companies to rethink traditional office-centric models. Now, three years later, we're seeing the emergence of sustainable, productive remote work ecosystems that benefit both employers and employees.

Recent studies show that 73% of companies have adopted some form of hybrid work model, combining the flexibility of remote work with the collaboration benefits of in-person interaction. This isn't just a temporary trend – it's a fundamental shift in how we approach productivity and work-life balance.

Technology plays a crucial role in this transformation. AI-powered productivity tools are helping teams stay connected and efficient, regardless of physical location. Video conferencing platforms have evolved beyond simple video calls to become comprehensive collaboration hubs, featuring virtual whiteboards, real-time document editing, and AI-powered meeting summaries.

However, the shift to remote work isn't without its challenges. Mental health and employee wellbeing have become top priorities for forward-thinking organizations. Companies are investing in virtual wellness programs, flexible scheduling, and digital tools that promote healthy work boundaries.

The global nature of remote work is also reshaping talent acquisition. Geographic barriers are dissolving, allowing companies to tap into talent pools worldwide. This democratization of opportunity is creating more diverse, inclusive workforces while presenting new challenges around time zones and cultural integration.

Looking ahead, the most successful organizations will be those that embrace flexibility while maintaining strong company culture. The future of work is here, and it's more dynamic, distributed, and digital than ever before.`;
