const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.resolve('client/public')));

const port = 4300;
app.listen(port, () => {
  console.log(`Personal Website listening on port ${port}` )
})