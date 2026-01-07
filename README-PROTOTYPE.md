# Content Design Studio - Prototype

AI-Powered Blog & Social Media Image Generation Workflow

## Overview

This is a fully functional prototype demonstrating the workflow for generating blog images and social media content using Google Gemini API and Imagen 4.

## Features

### ✨ Complete 4-Step Workflow

1. **Setup** - Select client and upload blog content
2. **Review** - Edit AI-generated image prompts
3. **Generate** - Create blog images with Imagen
4. **Social** - Generate social media distribution content

### 🎨 Key Capabilities

- ✅ Multi-client brand management
- ✅ Automatic image opportunity detection
- ✅ AI-generated prompts with brand consistency
- ✅ Cover image, in-blog images, and OG image generation
- ✅ Social media format recommendation (carousel/infographic/static)
- ✅ Image regeneration with iteration tracking
- ✅ Real-time progress tracking
- ✅ Mock data for 3 different client brands

## Running the Prototype

### Install Dependencies (if not already done)
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Open in Browser
Navigate to: http://localhost:3000

## Using the Prototype

### 1. Select a Client
Choose from 3 mock clients:
- **TechVenture Inc** - Modern, minimalist tech company
- **GreenEarth Organics** - Natural, organic brand
- **FinanceFirst Advisors** - Professional, corporate finance

### 2. Review Blog Content
The prototype comes pre-loaded with a sample blog about "The Future of Remote Work in 2026". You can edit the content or use as-is.

### 3. Review AI-Generated Prompts
The system will analyze the blog and identify:
- 1 Cover image
- 2 In-blog images
- 1 OG (Open Graph) image

Edit any prompts before generating.

### 4. Generate Images
Images are generated with simulated delays to mimic real API calls. Watch the progress as each image is created.

### 5. Social Media Strategy
Choose between:
- **Carousel** (6 slides) - Recommended for multi-point content
- **Infographic** - Single comprehensive image
- **Static** - Simple single post image

## Mock Data Highlights

### Sample Client: TechVenture Inc
- **Brand Colors**: #2C3E50, #E74C3C, #ECF0F1
- **Style**: Modern, minimalist with bold accents
- **Typography**: Clean sans-serif
- **Focus**: Innovation and technology

### AI Features Demonstrated
- ✅ Content analysis (simulated Gemini)
- ✅ Prompt generation with brand context
- ✅ Image generation (simulated Imagen)
- ✅ Format recommendation for social media
- ✅ Progressive image generation with status tracking

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Library**: Shadcn/UI + Tailwind CSS
- **State Management**: React Context
- **Mock Images**: Unsplash & Picsum

## Next Steps for Production

### Backend API Required
Create a FastAPI or Node.js backend with:
- `/api/projects` - Project CRUD operations
- `/api/analyze` - Gemini blog analysis
- `/api/generate` - Imagen image generation
- `/api/social` - Social media strategy

### Database Schema
- `clients` table - Brand guidelines and reference images
- `projects` table - User projects
- `opportunities` table - Image opportunities
- `generated_images` table - Results with iterations

### File Storage
- Google Cloud Storage or Cloudflare R2
- Store brand assets and generated images

### Google AI Integration
1. Get Gemini API key from Google AI Studio
2. Implement structured output for opportunity detection
3. Use context caching for brand guidelines
4. Connect Imagen 4 for actual image generation

### Authentication
- Implement user authentication (NextAuth.js or Supabase Auth)
- Multi-user support with team collaboration

## File Structure

```
content-design-studio/
├── app/
│   ├── page.tsx              # Main workflow page
│   └── layout.tsx            # Root layout
├── components/
│   ├── steps/
│   │   ├── step-1-setup.tsx      # Client selection & blog upload
│   │   ├── step-2-opportunities.tsx  # Prompt review
│   │   ├── step-3-review.tsx     # Image review & regeneration
│   │   └── step-4-social.tsx     # Social media generation
│   └── ui/                   # Shadcn components
├── lib/
│   ├── types.ts              # TypeScript interfaces
│   ├── mock-data.ts          # Sample data
│   └── project-context.tsx   # State management
└── public/
```

## Questions or Issues?

This prototype demonstrates the complete workflow. For production implementation, you'll need:
- Google Gemini API integration
- Imagen 4 API integration
- Backend API server
- Database (PostgreSQL/Supabase)
- File storage solution
- User authentication

Estimated development time with a full-stack developer: **2-4 weeks**
