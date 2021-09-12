const { cFLink, DEV_ENV } = process.env;
export default {
  htmlStart: (data) => {
    // console.log(DEV_ENV)

    const startingSection = //html
      `<!DOCTYPE HTML>
        <html>
          <head>
          <meta charset="utf-8">
          <title>James Hrivnak</title>
          <link rel="icon" type="image/png" href='${cFLink}/main/main-images/ges-favicon.png'/>
          <!-- <link rel='stylesheet' href='${cFLink}/main/build/public/appRouter.min.css'/> -->
          <!-- <link rel='stylesheet' href='${cFLink}/main/build/public/footer.min.css'/> -->
          <link rel='stylesheet' href='${cFLink}/main/build/public/minesweeper.min.css'/>
          <link rel='stylesheet' href='${cFLink}/mines/build/public/index.min.css'/>

          <!-- Server Side Rendering of Page Data -->
          <script>window.__INITIAL__DATA__=${JSON.stringify(data)}</script>

          <!-- <meta http-equiv="pragma" content="no-cache" /> -->
        </head>

          <script>
          if (${DEV_ENV}) {
            let linkArr =['/static/appRouter.css', '/static/footer.css', '/static/minesweeper.css'];
            linkArr.forEach((devLink) => {
              const [head] = document.getElementsByTagName('HEAD');
              let link = document.createElement('link');
              link.rel = 'stylesheet';
              link.type - 'text/css';
              link.href = devLink;
              head.appendChild(link);
            })
          }
          </script>


      <body>

      <div id="root">`;
    return startingSection;
  },
  htmlMid: /* html */
    `</div>

    </body>
  <footer id='footerroot'>`,

  htmlEnd: /* html */
    `</footer>
     <script src='/static/appRouter.js'></script>
     <!-- <script src='${cFLink}/main/build/public/appRouter-bundle.js'></script> -->

    <script src='${cFLink}/mines/build/public/public-bundle.js'></script>

    <!-- <script src='${cFLink}/main/build/public/minesweeper-bundle.js'/></script> -->

    <script src='/static/footer.js'></script>
    <!-- <script src='${cFLink}/main/build/public/footer-bundle.js'></script> -->
  </html>
`,
};

// Live
{/* <script src='https://d1y3bjxf7c78hf.cloudfront.net/main/build/public/appRouter-bundle.js'></script> */ }
// <!-- For Dev... -->
{/* <script src='/static/appRouter.js'/></script> */ }