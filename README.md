# 🌱 Digital Garden Template

Welcome to your new digital space! This is a modular, JSON-driven personal website built with React, Vite, and Tailwind CSS.

It is designed to be highly customizable without needing to write a single line of code. You can manage your pages, theme, and homepage layout entirely through simple text files.

## 📦 Prerequisites & Dependencies

Before running this project, you will need to have **Node.js** and **npm** (Node Package Manager) installed on your system.

If you are setting this up on a Linux environment, you can typically install these via your system's package manager:

```bash
sudo apt update
sudo apt install nodejs npm
```

Security Best Practice: If you prefer to use the latest Node version via the NodeSource PPA, it is highly recommended to curl and read their setup script to verify the source code before piping it to bash.

## Core Technologies Used
When you install this project, it relies on a few core, open-source libraries:
- Vite: The lightning-fast build tool and development server. 
- React Router (v6): Handles the navigation and JSON-driven dynamic routing. 
- Tailwind CSS (v4): Powers the styling and dynamic variable-based theming. 
- React Markdown: Safely renders custom markdown pages into HTML.

## 🚀 Installation
1. Open your terminal and navigate to your playground-vite project directory.
2. Install the dependencies: 
```bash
   npm install
```
*(Note: You can review the `package.json` file beforehand to audit the exact dependency versions being pulled into your project.)*
3. Start the development server:
```bash
    npm run dev
```
4. Open your browser and navigate to the local URL provided in your terminal (usually http://localhost:5173).

## 🎨 Getting Started: Customizing Your Site

You don't need to touch any .jsx files to make this site your own. All customization happens in the "Safe Zone" located in the src/content/ folder.
Here is the best order to tackle them:
1. Update Your Identity
Open src/content/site-meta.json. This is where you set the core text for your site. Update the siteTitle, your authorName, and your social links. These changes will automatically ripple across the navigation bar and footer.
2. Set Your Theme
Open src/content/theme.json to define your global aesthetic. Replace the default hex codes with your preferred calming, light, or pastel palette.

    The background color fills the page.

    The surface color is used for cards and widgets (it has a built-in glass/blur effect!).

    The primary and secondary colors are used for accents, links, and badges.

3. Arrange Your Homepage

Open src/content/home-layout.json (for the main column) and sidebar-layout.json (for the right column).

    To hide a widget, simply change "visible": true to "visible": false.

    To reorder widgets, cut and paste the blocks so they are in your preferred top-to-bottom order.

4. Write Custom Pages

Want to add an "About Me" or a "Setup" page?

    Open src/content/pages.json and add a new entry. Set "showInNav": true if you want it to appear in the top header.

    Create a markdown file (e.g., about.md) inside the src/content/pages/ directory.

    Write your content! The router will automatically generate the page and style your markdown to match your custom theme.

🏗️ Building for Production

When you are ready to publish your site to the web (like on Neocities, Vercel, or GitHub Pages), simply run:
Bash

npm run build

This will bundle all of your React code, Markdown, and JSON into highly optimized static HTML, CSS, and JavaScript files inside a new dist/ folder. You can upload the contents of that dist/ folder directly to your web host!

## What you need to run this
- node JS, npm
- vite
- a text editor
- you need to know how to open your terminal/cmd
- to get this on the internet - a way to host this, like Neocities.

## How to test your changes locally on your own computer
`` npm run dev ``

## How to compile the files to upload to Neocities
`` npm run build ``

## File Structure
your-template-name/
├── public/                 # Favicons and static assets
├── src/
│   ├── content/            # 🟢 THE SAFE ZONE (For Non-Coders)
│   │   ├── posts/          # Markdown files go here
│   │   ├── games.json      # Game list data
│   │   ├── videos.json     # Video bookmark data
│   │   └── site-meta.json  # Global site configuration!
│   │
│   ├── components/         # 🔵 THE CODE ZONE (For Coders)
│   ├── layouts/
│   ├── pages/
│   ├── App.jsx             
│   └── index.css           # Tailwind v4 variables (Theming)
│
├── README.md               # Quickstart & Deployment guide
└── WRITING-GUIDE.md        # How to add content for beginners

## How to make changes?
There are more guides in different folders in this project. To learn how to make basic changes (adding new posts etc) please check the 'content' folder. To learn how to make more advanced changes (adding new widgets, customising them) please check the 'components folder'