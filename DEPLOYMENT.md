# Deployment Guide - Content Design Studio

## Project Context
- **Organization**: Recurr Studio
- **Division**: Magazine (Agency Arm)
- **Domain**: team.recurr.co (multi-workflow platform)
- **Repository**: https://github.com/recurrco/content-design-studio

---

## Railway Web UI Deployment

### Step 1: Create New Project
1. Go to https://railway.app/dashboard
2. Click **"+ New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose repository: **`recurrco/content-design-studio`**
5. Click **"Deploy Now"**

### Step 2: Configure Build Settings
Railway will auto-detect Next.js. If needed, verify:
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Root Directory**: `/`

### Step 3: Add Environment Variables
1. In your Railway project, go to **Variables** tab
2. Add these variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://fhrcbnlzfwrwvjcasfbu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<get-from-supabase-dashboard>

# Get the ANON_KEY from:
# https://supabase.com/dashboard/project/fhrcbnlzfwrwvjcasfbu/settings/api
```

### Step 4: Get Railway Domain
1. Go to **Settings** tab
2. Scroll to **Domains** section
3. Click **"Generate Domain"**
4. Copy the generated domain (e.g., `content-design-studio-production.up.railway.app`)

### Step 5: Wait for Deployment
- Railway will automatically build and deploy
- Check **Deployments** tab for progress
- Green checkmark = successful deployment
- Click the domain to test your app

---

## Cloudflare Domain Configuration

### Configure team.recurr.co

#### Option A: Subdirectory Path (Recommended for Multi-Workflow)
```
team.recurr.co/design-studio → Content Design Studio
team.recurr.co/social-scheduler → Future workflow
team.recurr.co/analytics → Future workflow
```

**Implementation:**
1. Deploy a simple Next.js router app to Railway at team.recurr.co
2. Each workflow runs on separate Railway service
3. Router proxies requests to appropriate service based on path

#### Option B: Root Domain (Simpler, Single Workflow)
```
team.recurr.co → Content Design Studio (this deployment)
```

**Implementation:**
1. Go to Cloudflare Dashboard → Domains → team.recurr.co
2. Add DNS record:
   - Type: `CNAME`
   - Name: `team` (or `@` if using root recurr.co)
   - Target: `<your-railway-domain>.up.railway.app`
   - Proxy status: ✅ Proxied (orange cloud)
3. In Railway:
   - Go to Settings → Domains
   - Click "Custom Domain"
   - Enter: `team.recurr.co`
   - Railway will provide validation instructions

### Recommended Architecture for Multi-Workflow Platform

```
team.recurr.co (Router App on Railway)
├── /design-studio → Content Design Studio service
├── /social-scheduler → Social Media Scheduler service
├── /analytics → Analytics Dashboard service
└── / → Landing page with workflow directory
```

**Benefits:**
- Single domain for all Magazine workflows
- Easy to add new workflows
- Centralized authentication (future)
- Shared design system

---

## Supabase Configuration

### Get Supabase Credentials
1. Go to: https://supabase.com/dashboard/project/fhrcbnlzfwrwvjcasfbu/settings/api
2. Copy these values:
   - **Project URL**: `https://fhrcbnlzfwrwvjcasfbu.supabase.co`
   - **Anon/Public Key**: `eyJ...` (long JWT token)

### Link Local Project (Optional, for development)
```bash
# Wait 2-3 minutes for Supabase to fully start
supabase link --project-ref fhrcbnlzfwrwvjcasfbu

# Check project status
supabase projects list
```

---

## Database Schema (Future Implementation)

When ready to implement actual API integration:

### Tables Required:
```sql
-- Clients (brand specifications)
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  brand_colors TEXT[] NOT NULL,
  brand_style TEXT NOT NULL,
  logo_url TEXT,
  reference_images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects (user workflows)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id),
  title TEXT NOT NULL,
  status TEXT NOT NULL,
  blog_content JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Image Opportunities
CREATE TABLE image_opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id),
  type TEXT NOT NULL, -- 'cover', 'in-blog', 'og'
  prompt TEXT NOT NULL,
  aspect_ratio TEXT NOT NULL,
  status TEXT NOT NULL,
  generated_url TEXT,
  iteration INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Generated Images History
CREATE TABLE image_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id UUID REFERENCES image_opportunities(id),
  generated_url TEXT NOT NULL,
  iteration INTEGER NOT NULL,
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## Next Steps

1. ✅ Deploy to Railway (follow steps above)
2. ⏳ Get Railway domain
3. ⏳ Configure team.recurr.co on Cloudflare
4. 🔜 Set up authentication (NextAuth.js or Supabase Auth)
5. 🔜 Implement Gemini API integration
6. 🔜 Implement Imagen 4 integration
7. 🔜 Create database schema
8. 🔜 Build remaining Magazine workflows

---

## Support

**Supabase Dashboard**: https://supabase.com/dashboard/project/fhrcbnlzfwrwvjcasfbu
**GitHub Repository**: https://github.com/recurrco/content-design-studio
**Railway Dashboard**: https://railway.app/dashboard

Database Password: `2Lt3d4dYvhrBvKY6KTQiMBVP8`
