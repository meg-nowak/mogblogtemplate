## What's going on in here?
In this directory, we define custom React hooks.
Read more about React hooks [here on w3schools](https://www.w3schools.com/react/react_hooks.asp) if you'd like a 
comprehensive beginner-friendly guide.

Basically, a hook lets your component function have access to React features. React comes built-in with 
hooks like `useState` and `useEffect` that let you add behaviours based on things the users does on the screen. 
We use custom hooks when we have a component that needs to do some complex handling of inputs and updates going on in the page.

## Adding custom hooks
### When should you create a custom hook?
As a general rule of thumb, consider spinning up a new custom hook if your code meets any of these criteria:
1. **The "Copy-Paste" Test:** You find yourself writing the exact same `useState` and `useEffect` block in more than 
   one component (e.g., fetching data, tracking window size, handling form fields).
2. **The 100-Line Component Rule:** A component's file is getting massive because half of it is math, event 
   listeners, or data sorting. Extracting that "thinking" code into a hook leaves your component clean and purely 
   focused on layout/styling.

### Best Practices & Tips
* **The `use` Prefix Rule:** React strictly requires custom hooks to start with the lowercase word `use` (e.g., 
  `useDraggable`, `useAuth`). This triggers React's internal code linters to make sure state rules aren't being broken.
* **Keep them UI-Free:** A hook should never return JSX. It should only return raw data, states, and functions 
  (`position`, `isDragging`, `handleMouseDown`). Let the component worry about the HTML and Tailwind classes.
* **Always Clean Up After Yourself:** If your hook uses `window.addEventListener`, `setInterval`, or open data 
  connections inside a `useEffect`, always return a cleanup function to remove them. Don't leave zombie listeners running in the user's browser!

### Project-Specific Patterns to Follow
1. **The Dev-Environment Gate:** If you are building a hook intended *only* for local development tools (like our debugger), remember you can use Vite's `import.meta.env.DEV` check inside or around it to ensure it completely vanishes during production builds.
2. **Immutable Data Inputs:** In this project, hooks like `useFilteredPagination` often read directly from raw static JSON configurations (like `custom-pages.json`). Treat these inputs as read-only; let the hook create fresh arrays/objects (`[...items]`) rather than modifying the source files directly.
3. **Documentation:** Document what your hook does! Take a look at the examples below, and make sure you document 
   what each input your hook takes is supposed to do.


## Existing Hooks
Take a look at the hooks defined in the project already! Below are explanations for what each hook does and how to 
use it in your own components.

### useDraggable ✊
This hook was introduced to handle logic for draggable components, for example the DevDataInspector. It listens out 
for when you click on the draggable component, and while you're dragging it it will calculate where the draggable 
element should be moved to on the page. If you're wanting to create your own draggable components, it can be done 
like so:
```javascript
import { useDraggable } from '../../hooks/useDraggable'; // Import the hook

export default function MyDraggableComponent({}){
    
    // Consume our reusable behavior!
    const { position, isDragging, handleMouseDown } = useDraggable({ x: 120, y: 120 });

    // Return our component
    return (
        <div
            className="fixed z-[100]" // Set position to fixed, and make sure this component renders on top of
            style={{ top: `${position.y}px`, left: `${position.x}px` }} // Set the position dynamically
        >
            {/* DRAGGABLE HANDLE */}
            <div
                className="cursor-move select-none" // Change the cursor to a moving symbol
                onMouseDown={handleMouseDown} // This connects it to the hook to handle dragging
            >
                <h3> {isDragging ? '✊' : '✋'} </h3>
            </div>
            {/* Other component content */}
        </div>
    );
}
```

### useFilteredPagination
This hook handles filtering and pagination for the FilterableGallery component. It listens out for updates (when 
you select or deselect filterable tags, or when you select to change the page) and then filters what items to 
display accordingly. If you want to use this in your own component, it might look something like this:
```javascript
import { useFilteredPagination } from '../../hooks/useFilteredPagination'; // Import the hook

// Pass in some items to render, and a renderItem function (This might be a component like GameCard or MicroblogPost)
// In its current form, you need to make sure that the items themselves have tags defined on them.
// Items should be a json object of some form.
export default function MyFilterablePaginatedComponent({items = [], renderItem}){ 

    const ITEMS_PER_PAGE = 4 // Set the number of items to display per page.
    
    // Set up your hook. For more information on what all these variables do, see the function definition
    const {
        activeTags,
        allTags,
        visibleItems,
        currentPage,
        totalPages,
        toggleTag,
        clearFilters,
        goToNextPage,
        goToPrevPage
    } = useFilteredPagination(items, ITEMS_PER_PAGE);
    
    // Return your component
    return(
        <>
            {/* 1. Tag Filter Bar */}
            <div className="flex flex-wrap gap-2">
                    {/* Create a button for each unique tag - see allTags, activeTags and toggleTag usage */}
                    {allTags.map(tag => {
                        const isActive = activeTags.includes(tag);
                        return (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                            >
                                #{tag}
                            </button>
                        );
                    })}
    
                    {/* Clear filters button - see how it uses the clearFilters function */}
                    {activeTags.length > 0 && (
                        <button
                            onClick={clearFilters}
                        >
                            Clear filters
                        </button>
                    )}
            </div>
            {/* 2. Displaying your items - only the ones that should be visible on the current filter & page 
            selection */}
            <div>
                {visibleItems.map((item, index) => renderItem(item, index))}
            </div>

            {/* 3. Pagination Controls */}
            <div>
                {/* use goToPrevPage to go to the previous page, and disable if currentPage is 1 */}
                <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className={"disabled:opacity-0"}    // Make this button invisible if the page is the first one
                >
                    &larr; Previous
                </button>

                <span>
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={"disabled:opacity-0" }
                >
                    Next &rarr;
                </button>
            </div>
        </>
    );
}
```
If you don't want to use both of these but just one, it will still work if you don't implement all the functionality.
For example, if you just want to use pagination without tagging, you can just get rid of the tag filter bar.
