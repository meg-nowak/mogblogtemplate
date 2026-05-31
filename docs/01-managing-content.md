# 01: Managing Content & Pages

Welcome to the content guide! Because this site doesn't use a database, all of your writing, reviews, and pages live directly in the codebase as JSON files.

This guide will show you how to update your library, write posts, and create brand new pages for your site.

## 📁 Where does everything go?
Before we start, it helps to know where your assets live:
* **Text & Data:** `src/content/` (Your JSON files)
* **Images:** `public/images/` (Any images placed in the `public` folder can be referenced with a simple `/images/filename.jpg` path).

---

## 📚 The Library (`books.json`)

Your digital library is controlled by a single file: `src/content/books.json`. It contains a list (an array) of book objects.

To add a new book to your `BookTracker`, simply copy an existing block, paste it at the top of the list, and change the details.

```json
{
  "id": "book-3",
  "title": "The Dispossessed",
  "author": "Ursula K. Le Guin",
  "coverUrl": "/images/dispossessed.jpg",
  "status": "Reading",
  "genres": ["Sci-Fi", "Philosophy"],
  "review": "My thoughts on this book go here..."
}
```

**Important:** Ensure your id is completely unique! This is what the site uses to generate the URL (e.g., /book/book-3).

## 📄 Adding Custom Pages (e.g., `/about`, `/uses`)

Adding a brand new, fully-styled page to your site is a two-step process. You do not need to write any React code.

### Step 1: Register the Route

Open `src/siteconfig/custom-pages.json`. This file tells the router and the navigation bar that your page exists. Add a new entry to the list:
```JSON
{
"title": "My Setup",
"slug": "uses"
}
```

### Step 2: Create the Content File

Now, go to `src/content/pages/` and create a new file named exactly after your slug. In this case: `uses.json`.

Fill it with your page data. The layout engine will automatically map over the sections array to build your page:
```JSON
{
"title": "What I Use",
"heroImage": "/images/desk-setup.jpg",
"intro": "A list of the hardware and software I use daily.",
"sections": [
        {
            "heading": "Hardware",
            "body": "I run Linux Mint on a custom-built desktop..."
        },
        {
            "heading": "Software",
            "body": "For coding, I use WebStorm and Vite..."
        }
    ]
}
```

Save the file, and your new page is instantly live!