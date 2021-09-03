export default {
  htmlStart:
    `<!DOCTYPE HTML>
    <html>
      <head>
        <meta charset="utf-8">
        <title>James Hrivnak</title>
        <link rel='stylesheet' href='/static/appRouter.css'/>
        <link rel='stylesheet' href='/static/footer.css'/>
        <link rel='stylesheet' href='https://d1y3bjxf7c78hf.cloudfront.net/build/public/index.min.css'/>

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
    `,
  htmlMid: `
      </div>

    </body>
  <footer id='footerroot'>
    `,


  htmlEnd: `
  </footer>

  <script src="/static/appRouter.js"></script>
  <script src="/static/footer.js"></script>
  <script src='https://d1y3bjxf7c78hf.cloudfront.net/build/public/public-bundle.js'></script>
</html>
`,
};









{/* <script src="/static/home.js"></script> */ }

