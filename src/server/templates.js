import path from 'path';
import env from 'dotenv';
env.config({ path: path.resolve('.env') });
const { CLOUDFRONTLINK: cFLink } = process.env;

export default {
  htmlStart: (data, handleMouseMove) => {
    const startingSection = //html
      `
      <!DOCTYPE HTML>
        <html>
          <head>
          <meta charset="utf-8">
          <title>James Hrivnak</title>
          <!-- <link rel='stylesheet' href='${cFLink}/main/build/public/appRouter.min.css'/> -->
          <link rel="icon" type="image/png" href='${cFLink}/main/main-images/ges-favicon-3.png'/>
          <link rel='stylesheet' href='${cFLink}/main/build/public/footer.min.css'/>
          <link rel='stylesheet' href='${cFLink}/main/build/public/minesweeper.min.css'/>
          <link rel='stylesheet' href='${cFLink}/mines/build/public/index.min.css'/>

          <!-- Server Side Rendering of Page Data -->
          <script>window.__INITIAL__DATA__=${JSON.stringify(data)}</script>

          <!-- For Dev Mode -->
          <link rel='stylesheet' href='/static/appRouter.css'/>
          <meta http-equiv="pragma" content="no-cache" />
        </head>

      <body>

      <div id="root">
      `;
    return startingSection;
  },
  htmlMid: /* html */
    `
      </div>

    </body>
  <footer id='footerroot'>
    `,

  htmlEnd: /* html */
    `
  </footer>
    <script src='/static/appRouter.js'></script>
    <!-- <script src='${cFLink}/main/build/public/appRouter-bundle.js'></script> -->

    <script src='${cFLink}/mines/build/public/public-bundle.js'></script>

    <!-- <script src='${cFLink}/main/build/public/minesweeper-bundle.js'/></script> -->

    <script src='${cFLink}/main/build/public/footer-bundle.js'></script>
  </html>
`,
};

// Live
{/* <script src='https://d1y3bjxf7c78hf.cloudfront.net/main/build/public/appRouter-bundle.js'></script> */ }
// <!-- For Dev... -->
{/* <script src='/static/appRouter.js'/></script> */ }