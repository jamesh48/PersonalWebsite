const { cFLink, DEV_ENV } = process.env;
export default {
  htmlStart: (data, minesweeperGame) => {
    let startingSection = `<!DOCTYPE HTML>
        <html style="background-color: #1f2124">
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
            '${cFLink}/mines/build/public/index.css'
          ];

          const devLinkArr =[
            '/static/appRouter.css',
            '/static/footer.css',
            '${cFLink}/mines/build/public/index.css',
            '/static/minesweeper.css',
          ];

            (${DEV_ENV} ? devLinkArr : prodLinkArr).forEach((devLink) => {
              const [head] = document.getElementsByTagName('HEAD');
              let link = document.createElement('link');
              link.rel = 'stylesheet';
              link.type = 'text/css';
              link.href = devLink;
              head.appendChild(link);
            });
          </script>


      <body>



      <div id="root">`;

      if (data.minesweeperGame) {
        startingSection = startingSection.concat(`<div><div id='minesweeper-root'>${minesweeperGame}</div></div>`)
      }

    return startingSection;
  },
  htmlMid: `</div>

    </body>
  <footer id='footerroot'>`,

  htmlEnd: (minesweeperIndicator) => {
    const devScriptArr = minesweeperIndicator
      ? `[
        '/static/appRouter.js',
        '${cFLink}/mines/build/public/public-bundle.js',
        '/static/footer.js'
      ]`
      : `[
      '/static/appRouter.js',
      '/static/footer.js'
      ]`

    const prodScriptArr = minesweeperIndicator ? `[
        '${cFLink}/main/build/public/appRouter-bundle.js',
        '${cFLink}/mines/build/public/public-bundle.js',
        '${cFLink}/main/build/public/footer-bundle.js',
      ]` :
      `[
        '${cFLink}/main/build/public/appRouter-bundle.js',
        '${cFLink}/main/build/public/footer-bundle.js',
      ]`

    return `</footer>

    <script>

      (${DEV_ENV} ? ${devScriptArr} : ${prodScriptArr}).forEach((scriptSrc) => {
        const [body] = document.getElementsByTagName('BODY');
        let script = document.createElement('script');
        script.src = scriptSrc;
        body.appendChild(script);
      });
    </script>
  </html>`;
  },
};
