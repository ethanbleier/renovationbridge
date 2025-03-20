# Renovation Bridge Website

A modern redesign of the Renovation Bridge website using Next.js and Tailwind CSS. This website connects homeowners with quality contractors for renovation projects.
![Renovation Bridge Website Screenshot](screenshot.png)

## Color Scheme

- Primary Blue: #313bc0
- Secondary Dark Blue: #002c66
- Gray: #717171
- Black: #000000
- Cream: #f2f0e9
- Lavender: #e5e4f0

## Project Structure

```
renovationbridge/
├── public/           # Static assets (images, favicons)
├── src/
│   ├── app/          # Next.js App Router pages
│   ├── components/   # Reusable UI components
│   │   ├── forms/    # Form components
│   │   ├── layout/   # Layout components (Header, Footer)
│   │   ├── sections/ # Page section components
│   │   └── ui/       # UI elements (buttons, cards)
│   ├── lib/          # Utility functions, API clients
│   ├── styles/       # Global styles
│   └── utils/        # Helper functions
├── .gitignore        # Git ignore configuration
├── .vscode/          # VS Code configuration
├── next.config.js    # Next.js configuration
├── package.json      # Project dependencies
├── postcss.config.js # PostCSS configuration
├── start.sh          # Development startup script
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json     # TypeScript configuration
```

## Dependencies

- Next.js 14.2+
- React 18
- Tailwind CSS 3.4+
- Framer Motion 12.5+
- React Hook Form 7.50+
- React Icons 5.0+
- Sharp 0.33+

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   Or use the start script:
   ```bash
   ./start.sh
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Pages

- **Home**: Landing page with hero, project types, and contact form
- **How It Works**: Process explanation
- **Project Types**: Various renovation project categories
- **Gallery**: Portfolio of completed projects
- **Resources**: Blog and referral program
- **For Contractors**: Information for contractors
- **Get Started**: Lead capture page

## Key Features

- **Responsive Design**: Mobile-first approach with responsive layouts
- **Modern UI**: Fresh and expensive-looking design
- **SEO Optimization**: Contact form on landing page for lead generation
- **Navigation**: Easy-to-use header with dropdown menus
- **As Seen on TV**: Section showcasing NBC Bay Area features 