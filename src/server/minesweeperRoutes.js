import express from 'express';
const minesweeper = express.Router();
import axios from 'axios';

minesweeper.get('/minesweeper-proxy', async (req, res) => {
  try {
    const { data: bundle } = await axios('https://d1y3bjxf7c78hf.cloudfront.net/mines/build/public/public-bundle.js');
    res.send(bundle);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

minesweeper.get('/minesweeper-topTimes', async ({ query: { skillLevel, username } }, res) => {
  try {
    const { data: results } = await axios('https://beatminesweeper.app/minesweeper-topTimes', { params: { skillLevel, username } });
    res.send(results);
  } catch (err) {
    res.send(err);
  }
});

minesweeper.get('/minesweeper-validateUser', async ({ query: { userName, userPass } }, res) => {
  const { data: validatedUser } = await axios.get('https://beatminesweeper.app/minesweeper-validateUser', { params: { userName, userPass } });
  res.send(validatedUser);
});

minesweeper.post('/minesweeper-topTimes', async ({ query: { skillLevel, timerTime, solidUserName } }, res) => {
  await axios.post('https://beatminesweeeper.app/minesweeper-topTimes', null, { params: { skillLevel, timerTime, solidUserName } })
  res.send('ok')
})

minesweeper.post('/minesweeper-createUser', async ({ query: { userName, userPass } }, res) => {
  const { data: posted } = await axios.post('https://beatminesweeper.app/minesweeper-createUser', null, { params: { userName, userPass } });
  res.send(posted);
})



export default minesweeper;