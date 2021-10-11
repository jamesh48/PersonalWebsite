import express from 'express';
const minesweeper = express.Router();
import axios from 'axios';

minesweeper.all(/minesweeper-.*/, async ({ originalUrl, method }, res) => {
  try {
    console.log('local minesweeper proxy')
    const { data: result } = await axios[method.toLowerCase()](`http://localhost:4000${originalUrl}`);
    res.send(result);
  } catch (err) {
    console.log(err.message);
    res.send(err)
  };
});

export default minesweeper;