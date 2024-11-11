# EatFresh Recipe Finder 🍳

EatFresh is a modern web application built with Next.js that helps users discover, search, and save their favorite recipes. The application integrates with TheMealDB API.

## Features ✨

- 🔍 Search recipes by name or ingredients
- 🎲 Get random recipe suggestions
- ❤️ Save favorite recipes
- 📜 View search history
- 📱 Responsive design for all devices

## Tech Stack 🛠️

- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui Components
- TheMealDB API

## Getting Started 🚀

1. Clone the repository:

```bash
git clone https://github.com/Magdalena-megi/eat-fresh.git
cd eat-fresh
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure 📁

- `/app` - Next.js app router pages and layouts
- `/components` - Reusable UI components
- `/hooks` - Custom React hooks
- `/types` - TypeScript type definitions
- `/public` - Static assets

## Key Components 🔑

- Navigation Bar - Main navigation with search, favorites, and history
- Recipe Search - Search functionality with real-time results
- Recipe Details - Detailed view of recipes with ingredients and instructions
- Favorites System - Local storage-based favorite recipe management
- Search History - Track and manage search history

## Local Development 💻

The application runs on port 3000 by default and uses local storage for maintaining favorites and search history. No additional configuration is required as the application uses the public TheMealDB API.
