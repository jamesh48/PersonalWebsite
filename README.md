# PersonalWebsite

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

* Resume View
  - Made from scratch.
  - Employs a recursive strategy to fade in and fade out containers that are being hovered over
  - Although not publically visible there is a UI for the resume that allows me to change its values on screen and not in code, as such absolutely no resume data is hard-coded, and is instead stored in a postgreSQL database.
    - The UI also allows for having multiple resumes stored, and I can choose which resume I want to be shown on the home page, if for example I wanted to show off a back-end skills resume or a front-end skills resume in particular.

* Minesweeper
  - The Minesweeper application is one that I created and is proxied in from https://beatminesweeper.app
  - https://github.com/jamesh48/rpt26-mini-apps-2/tree/master/challenge_4