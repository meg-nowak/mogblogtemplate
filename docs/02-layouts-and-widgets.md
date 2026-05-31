# 02: Layouts & Widgets

This site uses a flexible, block-based layout system. You can completely rearrange your homepage without writing any React code, but you also have the full power of React when you want to build something entirely new.

## 🧩 Customizing the Homepage Grid

Your homepage is divided into a Main column and a Sidebar column. These are controlled by two files in `src/siteconfig/`:
* `home-layout.json` (Main content)
* `sidebar-layout.json` (Sidebar content)

To add, remove, or configure a widget, simply edit its block in the JSON array.

```json
{
  "id": "home-books",
  "type": "bookTracker",
  "visible": true,
  "props": {
    "rows": 3,
    "cols": 2
  }
}
```

- `type`: This must match exactly with a widget registered in the WidgetRegistry.

- `visible`: Set to false to instantly hide a block without deleting the code.

- `props`: Any settings you want to pass to the component (like rows, cols, or title).

To reorder your widgets, just move their JSON blocks up or down in the file!

## 🛠️ Adding a New Widget

Want to build a new feature, like a Spotify "Now Playing" card or a Weather widget? It takes three steps:
### 1.Build the Component

Create your standard React component in src/components/ (e.g., WeatherWidget.jsx). Make sure it accepts props if you want to configure it via JSON.
### 2. Register It

Open src/components/registry/WidgetRegistry.jsx. This acts as the "manifest" for your site. Import your new component and add it to the map:
```JavaScript
import WeatherWidget from '../WeatherWidget';

export const WidgetRegistry = {
bio: AuthorBio,
bookTracker: BookTracker,
weather: WeatherWidget // <-- Your new widget!
};
```
### 3. Add to your Layout
Open home-layout.json and add a new block using your registered type:
```JSON
{
    "id": "local-weather",
    "type": "weather",
    "visible": true,
    "props": {
        "city": "Auckland"
    }
}
```

## 🏗️ Adding New Page Layouts

Right now, the site uses RootLayout.jsx to wrap every page with a navigation bar and a footer.

If you want to create a page with a completely different structure (for example, a distraction-free reading mode with no navigation bar), you create a new Layout shell.

Create src/layouts/BlankLayout.jsx.

Use the React Router <Outlet /> component wherever you want the page content to inject:

```JavaScript
import { Outlet } from 'react-router-dom';
export default function BlankLayout() {
    return (
        <div className="bg-black text-white min-h-screen p-10">
            <Outlet/>
        </div>
    );
}
```

Update src/App.jsx to wrap specific routes in your new layout instead of the RootLayout.

### 🔍 Architectural Observations (The "Clunky" Bits)

Documenting the layout engine highlights a few areas where the system is currently a bit rigid:

1. **Blind Props (No Type Safety in JSON):**
    * **The Issue:** When a user configures a widget in `home-layout.json`, they have to guess or memorize what goes inside the `props` object. If they type `"row": 3` instead of `"rows": 3`, it fails silently.
    * **Future Fix:** Implementing a lightweight schema or using TypeScript interfaces for the widgets. Alternatively, a built-in "development mode" overlay that flags missing or incorrect props directly on the screen.

2. **The `WidgetRegistry` Bottleneck:**
    * **The Issue:** Every single widget must be imported into `WidgetRegistry.jsx`. As the site grows, this file will import *everything*, meaning the user's browser has to download the code for the `GameTracker` even if the current page only uses the `BookTracker`.
    * **Future Fix:** Use React's `lazy()` and `Suspense` inside the registry. This would dynamically load widget code only when the JSON explicitly asks for it, keeping the initial page load lightning fast.

3. **Rigid Page Grid:**
    * **The Issue:** `Home.jsx` hardcodes a specific CSS grid (`lg:col-span-2` for main, `span-1` for sidebar). If you wanted a "hero widget" that spans the entire width of the page *above* the two columns, the current array map doesn't support it.
    * **Future Fix:** Give the JSON layout more spatial awareness. Instead of flat arrays, the layout config could define the grid areas themselves, or widgets could pass a `fullWidth: true` flag that breaks them out of the standard column flow.