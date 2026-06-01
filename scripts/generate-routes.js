// scripts/generate-routes.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Set up directory pathways for an ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.join(__dirname, '../src/content/pages');
const OUTPUT_FILE = path.join(__dirname, '../src/siteconfig/custom-pages.json');

function generateRoutes() {
    console.log('🔄 Automation Engine: Scanning content folders for new custom pages...');

    try {
        // Ensure the source directory exists
        if (!fs.existsSync(PAGES_DIR)) {
            console.log(`📁 Directory not found: Creating ${PAGES_DIR}`);
            fs.mkdirSync(PAGES_DIR, { recursive: true });
        }

        // Read all files in the directory
        const files = fs.readdirSync(PAGES_DIR);

        // Filter out non-JSON files and parse their structures
        const customPages = files
            .filter(file => file.endsWith('.json'))
            .map(file => {
                const slug = path.basename(file, '.json');
                const filePath = path.join(PAGES_DIR, file);
                const fileContent = fs.readFileSync(filePath, 'utf-8');

                let title = slug.charAt(0).toUpperCase() + slug.slice(1);
                let showInNavbar = true; // Default to true if not specified

                try {
                    const parsed = JSON.parse(fileContent);
                    if (parsed.title) title = parsed.title;
                    // Capture the explicit navbar flag from the individual page JSON!
                    if (parsed.showInNavbar !== undefined) {
                        showInNavbar = parsed.showInNavbar;
                    }
                } catch (e) {
                    // Fallback for empty or drafting files
                }

                return { title, slug, showInNavbar };
            });

        // Write the resulting structure safely back to siteconfig
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(customPages, null, 2), 'utf-8');
        console.log(`✅ Success: Automatically registered ${customPages.length} pages in custom-pages.json!`);

    } catch (error) {
        console.error('❌ Automation failed to generate page layout configurations:', error);
    }
}

generateRoutes();