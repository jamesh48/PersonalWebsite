import express from 'express';
const minesweeper = express.Router();
import axios from 'axios';

minesweeper.all(/minesweeper-.*/, async ({ originalUrl, method }, res) => {
  try {
    const { data: result } = await axios[method.toLowerCase()](`https://www.beatminesweeper.app${originalUrl}`);
    res.send(result);
  } catch (err) {
    console.log(err.message);
    res.send(err)
  };
});

export default minesweeper;