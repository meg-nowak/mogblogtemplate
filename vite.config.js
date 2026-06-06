import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
    // --- OUR CUSTOM LOCAL CMS PLUGIN ---
    {
      name: 'local-cms-api',
      configureServer(server) {
        // We tell the server to listen for requests sent to /api/save-webring
        server.middlewares.use('/api/save-webring', (req, res, next) => {

          // We only care about POST requests (sending data)
          if (req.method === 'POST') {
            let body = '';

            // Node.js receives data in chunks, so we stitch them together
            req.on('data', chunk => {
              body += chunk.toString();
            });

            // When all the data has arrived...
            req.on('end', () => {
              try {
                // 1. Convert the received string back into a JavaScript array
                const newData = JSON.parse(body);

                // 2. Find the exact path to your JSON file on your hard drive
                const filePath = path.resolve(__dirname, 'src/content/data/webring.json');

                // 3. Write the file! (The 'null, 2' keeps the JSON beautifully indented)
                fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));

                // 4. Tell the browser it was a success
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, message: 'Webring updated!' }));

              } catch (err) {
                // If something goes wrong, don't crash the server, just send an error
                res.statusCode = 500;
                res.end(JSON.stringify({ success: false, error: err.message }));
              }
            });
          } else {
            // If it's not a POST request, ignore it and pass it to the next Vite process
            next();
          }
        });
      }}],
  base: './',
})
