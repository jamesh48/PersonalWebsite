# Todo List 8/28/21

[ X ] Researched Code Splitting in Webpack
    - Researched Webpack splitChunks API
    - Looked at React code Splitting which lead to loadable
    - Researched Loadable, cloned an example package
    - Nothing actionable, yet.

[ X ] Make the default location of the mouse the correct location
    - Best I could do was append the cursor div to the document on initial mouse move, and track location from there- Much better than the mouse starting in a static position.

[ X ] Started Optimization of Image Loading from s3
    - Moved s3 bucket location from Ohio to N. California and connected with Amazon AWS Cloudfront and changed image URLs accordingly.
    - Reduced size on main image of me from 1.5GB to 50kb, made it progressive
    - Hosted minesweeper images on AWS Cloudfron as well

[ X ] Migrate Existing Server routes for Minesweeper and Resume to SSR Server
    - Changed minesweeper API routes to use 'minesweeper-' prefix for easier routing.
    - Unsure if minesweeper is being SSR'd since its being proxied in but implemented the code that would make it seem like it at least.

[ X ] Improved Marquee Section- Image and Paragraphs
[ X ] Delete unneeded folders and files
[ X ] Commit, push and Deploy

...Next
[ ] Research if better to load react from a cdn or node_modules
[ ] Continue learning about code splitting
