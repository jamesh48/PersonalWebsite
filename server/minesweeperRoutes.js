const express = require('express');
const minesweeper = express.Router();
const axios = require('axios');

minesweeper.get('/minesweeper-proxy', async (req, res) => {
  console.log('minesweeper-proxy')
  try {
    const { data: bundle } = await axios('https://beatminesweeper.app/bundle.js');
    res.send(bundle);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

minesweeper.get('/topTimes', async ({ query: { skillLevel, username } }, res) => {
  try {
    const { data: results } = await axios('https://beatminesweeper.app/topTimes', { params: { skillLevel, username } });
    res.send(results);
  } catch (err) {
    res.send(err);
  }
});

minesweeper.get('/validateUser', async ({query: {userName, userPass}}, res) => {
  const test = await axios.get('https://beatminesweeper.app/validateUser', {params: {userName, userPass}});
  res.send(test);
});

minesweeper.post('/topTimes', async ({ query: { skillLevel, timerTime, solidUserName } }, res) => {
  await axios.post('https://beatminesweeeper.app/topTimes', null, {params: {skillLevel, timerTime, solidUserName}})
  res.send('ok')
})

minesweeper.post('/createUser', async ({ query: { userName, userPass } }, res) => {
  const posted = await axios.post('https://beatminesweeper.app/createUser', null, { params: { userName, userPass } });
  res.send(posted);
})



module.exports = minesweeper;