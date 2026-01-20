# Next.js Portfolio Website

This is a modern React-based portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - React components
  - `cards/` - Card components for displaying content
  - `layout/` - Layout components (Navbar, Footer, SearchModal)
  - `modals/` - Modal components for detailed views
  - `providers/` - Context providers (Theme)
  - `ui/` - Reusable UI components
- `data/` - JSON content files
- `lib/` - Utility functions and content loaders
- `public/` - Static assets (images, PDFs)

## Content Management

All content is stored in JSON files in the `data/` directory:

- `publications.json` - Research publications
- `skills.json` - Technical skills by category
- `experience.json` - Experience items (programs, research, internships, engineering projects)
- `education.json` - Educational background
- `awards.json` - Awards and honors
- `volunteering.json` - Volunteering experience
- `blog.json` - Blog posts
- `profile.json` - Personal profile information

To update content, edit the corresponding JSON file and restart the dev server.

## Features

- **Modern Design**: Minimal, clean aesthetic with light/dark theme toggle
- **Responsive**: Mobile-first design that works on all devices
- **Fast Search**: Global search across all content types
- **Modal Views**: Quick preview modals with expand to full page
- **Type-Safe**: Full TypeScript support
- **SEO Optimized**: Next.js built-in SEO features

## Deployment

This site can be deployed to:

- **Vercel** (recommended): Connect your GitHub repo to Vercel
- **Netlify**: Use the Netlify CLI or connect via GitHub
- **Any Node.js host**: Run `npm run build` and deploy the `.next` folder

## Assets

Images and PDFs should be placed in the `public/` directory:

- `public/images/publications/` - Publication thumbnails
- `public/images/projects/` - Project images
- `public/images/profile/` - Profile photos
- `public/pdfs/` - PDF documents
- `public/cv.pdf` - CV/Resume

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette. The base background color is `#EDE6E0`.

### Fonts

The site uses DM Sans from Google Fonts, configured in `app/layout.tsx`.

## Notes

- All content is stored in JSON format in `data/`
- Images and assets should be placed directly in `public/images/`
