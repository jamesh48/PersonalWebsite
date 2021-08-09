const path = require('path');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const minesweeperRouter = require('./minesweeperRoutes.js');;
const localMinesweeper = require('./localMinesweeper.js');
const resumeRouter = require('./ResumeRoutes.js');

const app = express();

app.use(cors());

app.use(express.static(path.resolve('client/public')));


// app.use(minesweeperRouter);
app.use(localMinesweeper);

app.use(resumeRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('client/public/index.html'))
})
const port = 4300;
app.listen(port, () => {
  console.log(`Personal Website listening on port ${port}`)
})