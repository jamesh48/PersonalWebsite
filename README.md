## PersonalWebsite

Latest Updates on the Personal Website journey include work on Mobile View User Experience- I made it so that the text is larger and the UI more simple on the phone. In general columns seem to be the way to go~ Also the image of me has been a curious rabbit hole, i'll get it to work on my computer but then it will be skewed on my phone, so I got it to work on phone, ipad, and computer but then it was severely skewed on my large monitor- in the end I settled for SCSS media queries which would have likely been the simpilest solution from the start.

***

I've also begun to make a UI for Admin View for portfolio, have improved the UI for the Admin View of Resume and will eventually make an Admin View for the Marquee Container Paragraphs- All with server and Database integrations, Although no one else will see these features except for me, at least my site will be completely (not) hardcoded!

***

I'm also learning about how to make my App more performant with using the React.memo and useCallback APIs, in general- not everything has to be rerendered on an unrelated state change but at the same time, this kind of optimization isn't always necessary. This was a huge discovery and fix with the minesweeper app as the clock setInterval runs and sets state every 10ms- so the whole board was rerendering every 10ms!  I was able to employ a custom useInterval hook to move away from setInterval, and combine with React.memo/useCallback to stop this behavior.

### Technologies used
* Front-end
  - React, React Hooks, SASS/SCSS
  - Webpack
* Server
  - Express
* Database
  - PostgreSQL/Sequelize, Resume and Portfolio data is stored as nested JSONB
* Deployment
  - Github
  - PM2, NGINX
  - Google Domain for Hosting
  - Amazon Web Services (AWS)
    * EC2 Microservice
    * s3 and Cloudfront CDN for serving static content- images and bundles.
* Dev
  - Webpack (SSR)
  - Grunt - Uglify & cssmin for compacting code, aws s3 upload, cloudfront invalidate for aws, and github intergrations as well. Still looking for away to integrate pm2 deploy script.

### Features

* Server-Side Rendering
  - General Logic- complete.
    * React.hydrate now takes in data from Resume, Portfolio Data and Footer Data, as well as the minesweeper app and renders immediately on page load.
    * I'm 90% finished with integrating my portfolio data with the database, but for now its hard coded. Once thats done I'll be able to hydrate with that particular data from the database.

* Resume View
  - Made from scratch.
  - Employs a recursive strategy to fade in and fade out containers that are being hovered over
  - Although not publically visible there is a UI for the resume that allows me to change its values on screen and not in code, as such absolutely no resume data is hard-coded, and is instead stored in a postgreSQL database.
    - The UI also allows for having multiple resumes stored, and I can choose which resume I want to be shown on the home page, if for example I wanted to show off a back-end skills resume or a front-end skills resume in particular.

* Minesweeper
  - The Minesweeper application is one that I created and is proxied in from https://beatminesweeper.app
  - https://github.com/jamesh48/rpt26-mini-apps-2/tree/master/challenge_4