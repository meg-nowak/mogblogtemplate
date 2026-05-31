# Customizing Your Homepage

Welcome to your digital garden! You can completely rearrange, hide, or customize the widgets on your homepage without ever touching a line of code.

All of your homepage layout settings live in one file: `src/content/home-layout.json`.

## How it works

Open `home-layout.json` and you will see a list of "blocks" that look like this:

```json
{
  "id": "reading-tracker",
  "type": "bookTracker",
  "visible": true
}
```

## Reordering Widgets

To change the order of the items on your homepage, simply cut and paste the blocks inside the JSON file. The top-to-bottom order in the file is exactly how they will appear on your website!

## Hiding Widgets

Don't want to show your reading list right now? Don't delete the block! Just change "visible": true to "visible": false.
```json
{
"id": "reading-tracker",
"type": "bookTracker",
"visible": false
}
```

Note: Make sure you don't use capital letters for true or false.

## Widget Properties (Advanced)

Some widgets have extra settings you can tweak using a "props" object.

For example, the bookTracker can optionally display a link to your full library page. You can turn this on or off here:

```json
{
"id": "reading-tracker",
"type": "bookTracker",
"props": {
"showLibraryLink": true
},
"visible": true
}
```

## Available Widgets

Here is the current list of type names you can use in your layout file:
- `"bio"`: Displays your name and a brief introduction (customizable in site-meta.json).
- `"bookTracker"`: Displays your currently reading, up next, and recently read books.
- `"videoGallery"`: Displays your curated video collection.

(More widgets coming soon!)

## The Sidebar

Your homepage is split into two columns: a wide "Main" column on the left, and a narrow "Sidebar" on the right.

Just like `home-layout.json` controls the left side, you have a second file called `sidebar-layout.json` that controls the right side!

```json
[
  {
    "id": "currently-playing",
    "type": "gameTracker",
    "props": {
      "title": "Currently Playing",
      "limit": 4
    },
    "visible": true
  }
]
```

You can use the exact same tricks here. If you don't want a sidebar at all, just change "visible": true to "visible": false on your widgets, and they will vanish gracefully.

Available Sidebar Widgets:
- "gameTracker": Displays a compact list of your current video games.
  - Props: You can change the "title" text, and set a "limit" for how many games you want to show at once.


