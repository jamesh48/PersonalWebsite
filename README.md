## PersonalWebsite

### Latest Commit/Push 8/28/21

[ X ] Researched Code Splitting in Webpack
    - Researched Webpack splitChunks API
    - Looked at React code Splitting which lead to loadable
    - Researched Loadable, cloned an example package
    - Nothing actionable, yet.

[ X ] Make the default location of the mouse the correct location
    - Best I could do was append the cursor div to the document on initial mouse move, and track location from there- Much better than the mouse starting in a static position at top: 0, left: 0.

[ X ] Started Optimization of Image Loading from s3
    - Moved s3 bucket location from Ohio to N. California and connected with Amazon AWS Cloudfront and changed image URLs accordingly. Image urls as environment variables.
    - Reduced size on main image of me from 1.5GB to 50kb, made it progressive, but still seems to load slow...
    - Hosted minesweeper images on AWS Cloudfront as well

[ X ] Migrate Existing Server routes for Minesweeper and Resume to SSR Server
    - Changed minesweeper API routes to use 'minesweeper-' prefix for easier routing.

[ X ] Improved Marquee Section- Image and Paragraphs
    - text-rendering: gemetric-percision on the paragraph text, played around with trying to get second paragraph of text to wrap around the image of me, settled for pretty good.

[ X ] Deleted unneeded folders and files
[ X ] Commit, push and Deploy- Goodnight!

...Next
[ ] Research if better to load react from a cdn or node_modules
[ ] Continue learning about code splitting



### Technologies used
* Front-end
  - React, React Hooks, SASS/SCSS
  - Webpack
* Server
  - Express
* Database
  - PostgreSQL/Sequelize, data is stored as nested JSONB
* Deployment
  - Github
  - PM2, Amazon AWS (ec2 & s3), NGINX

### Features

* Server-Side Rendering
  - General Logic- in Progress
  - Code-Splitting- In Progress

* Resume View
  - Made from scratch.
  - Employs a recursive strategy to fade in and fade out containers that are being hovered over
  - Although not publically visible there is a UI for the resume that allows me to change its values on screen and not in code, as such absolutely no resume data is hard-coded, and is instead stored in a postgreSQL database.
    - The UI also allows for having multiple resumes stored, and I can choose which resume I want to be shown on the home page, if for example I wanted to show off a back-end skills resume or a front-end skills resume in particular.

* Minesweeper
  - The Minesweeper application is one that I created and is proxied in from https://beatminesweeper.app
  - https://github.com/jamesh48/rpt26-mini-apps-2/tree/master/challenge_4