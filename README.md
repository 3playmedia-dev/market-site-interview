# TestCo Marketing Site

A marketing site built with Astro, React, Tailwind v4, and ShadCN.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`.

## Project Structure

```
src/
├── components/
│   ├── ui/              # ShadCN-style UI components
│   └── islands/         # React islands (interactive components)
├── hooks/
│   └── useTrackedQuery.ts  # Query abstraction with error reporting
├── layouts/
│   ├── Layout.astro     # Base layout
│   └── MarketingLayout.astro  # Marketing page layout with header/footer
├── lib/
│   ├── api.ts           # API client utilities
│   ├── devops.ts        # Error reporting to DevOps
│   └── utils.ts         # Utility functions (cn)
├── pages/
│   ├── api/             # API endpoints
│   ├── index.astro      # Home page
│   ├── about.astro      # About page
│   ├── pricing.astro    # Pricing page
│   └── blog.astro       # Blog page
└── styles/
    └── global.css       # Tailwind config and theme
```

## Key Conventions

### Theme System

We use CSS variables with OKLCH colors for theming. All colors should reference theme variables:

```css
/* Good */
className="text-primary bg-muted"

/* Bad */
style={{ color: '#e6006f' }}
```

Dark mode is supported via the `.dark` class on the document root.

### Data Fetching

**Always use `useTrackedQuery`** instead of raw `useQuery` for API calls:

```tsx
// Good - errors are reported to DevOps
import { useTrackedQuery } from '@/hooks/useTrackedQuery';

const { data } = useTrackedQuery({
  queryKey: ['posts'],
  queryFn: api.posts.list,
  endpoint: '/api/posts',  // Required for error context
});

// Bad - errors are not tracked
import { useQuery } from '@tanstack/react-query';
const { data } = useQuery({ ... });
```

### Font System

- **Headers**: `font-family: var(--font-heading)` (Clash Grotesk)
- **Body**: `font-family: var(--font-body)` (Supreme)
- **Accents**:
  - Serif: `var(--font-accent-serif)` (IBM Plex Serif)
  - Condensed: `var(--font-accent-condensed)` (IBM Plex Sans Condensed)
  - Mono: `var(--font-mono)` (IBM Plex Mono)

### API Module

Use the centralized API client for all fetch operations:

```tsx
import { api } from '@/lib/api';

// Good
const posts = await api.posts.list();

// Bad
const response = await fetch('/api/posts');
```

## Tech Stack

- **Framework**: Astro 5.x with React islands
- **Styling**: Tailwind CSS v4 with CSS variables
- **Components**: ShadCN/ui (New York style)
- **Data Fetching**: TanStack Query v5
- **Icons**: Lucide React
