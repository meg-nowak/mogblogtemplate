## 🪴 My Digital Space (mogblogtemplate)

Welcome to the source code for my personal digital space. This site is a static, JSON-driven application built with React, Vite, and Tailwind CSS, designed to be hosted on Neocities.

Rather than relying on a complex backend database, this site uses a completely decoupled architecture. All the content (books, microblogs, pages) and layout structures are managed via simple JSON files, making it incredibly fast and easy to maintain.

## 🚀 Basic Setup

To get this project running on your local machine, you'll need Node.js installed.

Open your terminal, navigate to the directory where you want this project to live, and run the following commands:
1. Install dependencies:
    ```bash
    npm install
   ```
2.    Start the development server:
   ```bash
  npm run dev
   ```

Vite will start up a local server (usually at http://localhost:5173). Any changes you make to the code or JSON files will automatically hot-reload in your browser.

## 🗺️ The 10,000-Foot View

The codebase is organized to separate the presentation (React) from the configuration (JSON). Here is a quick map of the src/ directory to help you find your way around:

 - `/siteconfig`: The control center. Contains JSON files like home-layout.json and custom-pages.json that dictate the layout, grid, and routing of the site without needing to write code.

 - `/content`: The database. This is where all the raw text, reviews, and page data live (e.g., books.json or individual page data like about.json).

 - `/components`: The building blocks. Contains the reusable UI widgets (like BookTracker or Microblog) and the WidgetRegistry that links them to the JSON layouts.

 - `/layouts` & `/pages`: The structural shells. These handle the main responsive grids, the navigation headers, and the React Router logic.

## 📚 Documentation

If you want to customize this site, add your own content, or build new widgets, check out the dedicated guides in the /docs folder:

- **01: Managing Content & Pages** - How to write posts and add new custom pages.

- **02: Layouts & Widgets** - How to rearrange the home grid and build new components.

- **03: Theming & Style** - How to change colors, fonts, and the overall aesthetic.