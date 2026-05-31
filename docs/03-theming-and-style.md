# 03: Theming & Style

This site uses a two-part styling system: **CSS Variables** for the actual colors, and **Tailwind CSS** to apply those colors to your components.

This approach ensures that if you ever want to change your entire site's color scheme, you only have to edit one single file.

## 🎨 Changing Your Color Palette

All of the core colors are defined as variables in your main stylesheet.

Open `src/index.css`. At the top of the file, you will see a `:root` block. This dictates the default colors for the entire site. To change your theme, simply update these hex codes or RGB values.

Here is an example of a calming, light-pastel aesthetic:

```css
/* src/index.css */
:root {
  /* Soft, airy background colors */
  --color-surface: #fdfbf7;      /* Warm off-white */
  --color-surface-alt: #f4f1ea;  /* Slightly darker for cards */
  
  /* The main accent colors */
  --color-primary: #a3b899;      /* Muted sage green */
  --color-secondary: #d4c4b7;    /* Warm beige/sand */
  
  /* Text and borders */
  --color-text: #4a4a4a;         /* Soft charcoal (easier on eyes than pure black) */
  --color-text-muted: #8b8b8b;
  --color-border: #e6e2d8;
}
```

## 🏗️ How Tailwind Uses These Colors

You do not need to write custom CSS for your components. Instead, we have configured Tailwind to read those exact variables.

If you open `tailwind.config.js`, you will see how they are mapped:
```JavaScript
// tailwind.config.js
module.exports = {
    theme: {
        extend: {
            colors: {
                theme: {
                    surface: 'var(--color-surface)',
                    primary: 'var(--color-primary)',
                    secondary: 'var(--color-secondary)',
                    text: 'var(--color-text)',
                    border: 'var(--color-border)'
                }
            }
        }
    }
}
```
Because of this mapping, you can use these colors anywhere in your React components using standard Tailwind utility classes!

Want text to be the sage green? Use text-theme-primary.

 Want a card background to be the warm off-white? Use bg-theme-surface.

## ✍️ Changing the Typography (Fonts)

To change the fonts across the entire site, you'll need to update two files.

### Step 1: Import the Font
Find a font you like on Google Fonts. Open index.html (in the root of your project) and paste the import link into the <head> section:
```HTML
<link href="[https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap](https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap)" rel="stylesheet">
```
### Step 2: Update Tailwind
Open `tailwind.config.js` and update the fontFamily section to use your new font.
```JavaScript
// tailwind.config.js
module.exports = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Sets Inter as the default site font
                serif: ['Merriweather', 'serif'] // Optional: For reading heavy blocks
            }
        }
    }
}
```

Looking at the styling architecture, here are a few things that could be smoothed out down the road:

1. **The Double-Edit:**
   * **The Issue:** Having to define the color in `index.css` and *also* map it in `tailwind.config.js` is a bit redundant. If you want to add a brand new color tier (like `--color-tertiary`), you have to remember to edit both files or Tailwind won't recognize it.
   * **Future Fix:** Use a Tailwind plugin (like `tw-colors`) that automatically converts a JSON object of colors into both the CSS variables and the Tailwind configuration in a single step.

2. **No Built-in Dark Mode Toggle:**
   * **The Issue:** Right now, the theme is hardcoded to whatever is in the `:root` block. If someone visits your site at 2 AM, they get the same colors.
   * **Future Fix:** Add a `.dark` class to `index.css` that redefines those exact same variables with deeper colors (e.g., `--color-surface: #1a1a1a`). Tailwind can easily hook into this to allow for a quick light/dark toggle button in your `RootLayout`.