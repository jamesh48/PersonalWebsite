const { cFLink, DEV_ENV } = process.env;
export default {
  htmlStart: (data) => {
    const startingSection =
      `<!DOCTYPE HTML>
        <html>
          <head>
          <meta charset="utf-8">
          <title>James Hrivnak</title>
          <link rel="icon" type="image/png" href='${cFLink}/main/main-images/ges-favicon.png'/>

          <!-- Server Side Rendering of Page Data -->
          <script>window.__INITIAL__DATA__=${JSON.stringify(data)}</script>
        </head>

          <script>

          const prodLinkArr = [
            '${cFLink}/main/build/public/appRouter.min.css',
            '${cFLink}/main/build/public/footer.min.css',
            '${cFLink}/main/build/public/minesweeper.min.css',
            '${cFLink}/mines/build/public/index.min.css'
          ];

          const devLinkArr =[
            '/static/appRouter.css',
            '/static/footer.css',
            '${cFLink}/mines/build/public/index.min.css',
            '/static/minesweeper.css',
          ];

            (${DEV_ENV} ? devLinkArr : prodLinkArr).forEach((devLink) => {
              const [head] = document.getElementsByTagName('HEAD');
              let link = document.createElement('link');
              link.rel = 'stylesheet';
              link.type - 'text/css';
              link.href = devLink;
              head.appendChild(link);
            });
          </script>


      <body>

      <div id="root">`;
    return startingSection;
  },
  htmlMid:
    `</div>

    </body>
  <footer id='footerroot'>`,

  htmlEnd:
    `</footer>

    <script>
      const devScriptArr = [
        '/static/appRouter.js',
        'https://static.fullstackhrivnak.com/mines/build/public/public-bundle.js',
        '/static/footer.js'
      ];

      const prodScriptArr = [
        '${cFLink}/main/build/public/appRouter-bundle.js',
        '${cFLink}/main/build/public/footer-bundle.js',
        '${cFLink}/main/build/public/minesweeper-bundle.js',
        '${cFLink}/mines/build/public/public-bundle.js'
      ];

      (${DEV_ENV} ? devScriptArr : prodScriptArr).forEach((scriptSrc) => {
        const [body] = document.getElementsByTagName('BODY');
        let script = document.createElement('script');
        script.src = scriptSrc;
        body.appendChild(script);
      });
    </script>
  </html>
`,
};

// Live
{/* <script src='https://d1y3bjxf7c78hf.cloudfront.net/main/build/public/appRouter-bundle.js'></script> */ }
// <!-- For Dev... -->
{/* <script src='/static/appRouter.js'/></script> */ }