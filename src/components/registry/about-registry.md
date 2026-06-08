## What's going on in here?
This directory handles everything for rendering widget components. Here, I'll explain what each function does.

### WidgetRegistry
This map dictates which components can be rendered via JSON layout files

### WidgetRenderer
WidgetRenderer looks up all of the widgets you want to render in a particular section through a JSON file, maps that to
the entry in the Widget registry then renders the component on the page. It also wraps it in the error handling logic.

### WidgetErrorBoundary
This wraps around each widget rendered on the page, and in case of an error will render an error card with the specific
details of the error so that errors in a widget will not cause the whole page to error.

### WidgetErrorCard
This displays a nicely formatted error card in the case that a widget errors due to issues in its code or not being
defined in the registry.