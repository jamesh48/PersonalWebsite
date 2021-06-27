const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.static(path.resolve('client/public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('client/public/index.html'))
})
const port = 4300;
app.listen(port, () => {
  console.log(`Personal Website listening on port ${port}` )
})