export default {
  htmlStart: (data) => {
    return (
      `<!DOCTYPE HTML>
      <html>
        <head>
          <meta charset="utf-8">
          <title>James Hrivnak</title>
          <!-- <link rel='stylesheet' href='https://d1y3bjxf7c78hf.cloudfront.net/main/build/public/appRouter.min.css'/> -->
          <link rel='stylesheet' href='https://d1y3bjxf7c78hf.cloudfront.net/main/build/public/footer.min.css'/>
          <link rel='stylesheet' href='https://d1y3bjxf7c78hf.cloudfront.net/main/build/public/minesweeper.min.css'/>
          <link rel='stylesheet' href='https://d1y3bjxf7c78hf.cloudfront.net/mines/build/public/index.min.css'/>

          <!-- Server Side Rendering of Page Data -->
          <script>window.__INITIAL__DATA__=${JSON.stringify(data)}</script>

          <!-- For Dev Mode -->
          <link rel='stylesheet' href='/static/appRouter.css'/>
          <meta http-equiv="pragma" content="no-cache" />
        </head>

      <body>
        <script>
        window.addEventListener("mousemove", function (e) {
          if(!document.getElementById('cursor')) {
            const newCursor = document.createElement('div');
            newCursor.id = 'cursor';
            document.querySelector('body').appendChild(newCursor);
          };
          let scrollYOffset = window.scrollY;
          // Gets the x,y position of the mouse cursor
          x = e.clientX;
          y = e.clientY;

          // sets the image cursor to new relative position
          let cursor = document.getElementById('cursor');
          cursor.style.left = x + 'px';
          cursor.style.top = (scrollYOffset + y) + "px";
        });
      </script>
      <div id="root">
      `
    );
  },
  htmlMid: `
      </div>

    </body>
  <footer id='footerroot'>
    `,


  htmlEnd: `
  </footer>
  <!-- <script src='https://d1y3bjxf7c78hf.cloudfront.net/main/build/public/appRouter-bundle.js'></script> -->
  <script src='https://d1y3bjxf7c78hf.cloudfront.net/main/build/public/minesweeper-bundle.js'/></script>
  <script src='https://d1y3bjxf7c78hf.cloudfront.net/mines/build/public/public-bundle.js'></script>
  <script src='https://d1y3bjxf7c78hf.cloudfront.net/main/build/public/footer-bundle.js'></script>

  <!-- For Dev... -->
  <script src='/static/appRouter.js'/></script>

</html>
`,
};






