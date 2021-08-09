const express = require('express');
const minesweeper = express.Router();
const axios = require('axios');

minesweeper.get('/minesweeper-proxy', async (req, res) => {
  console.log('minesweeper-proxy')
  try {
    const { data: bundle } = await axios('http://localhost:3500/bundle.js');
    res.send(bundle);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

minesweeper.get('/topTimes', async ({ query: { skillLevel, username } }, res) => {
  try {
    const { data: results } = await axios('http://localhost:3500/topTimes', { params: { skillLevel, username } });
    res.send(results);
  } catch (err) {
    res.send(err);
  }
});

minesweeper.get('/validateUser', async ({ query: { userName, userPass } }, res) => {
  const { data: results } = await axios('http://localhost:3500/validateUser', { params: { userName, userPass } });
  res.send(results);
})

minesweeper.post('/topTimes', async ({ query: { skillLevel, timerTime, solidUserName } }, res) => {
  await axios.post('http://localhost:3500/topTimes', null, { params: { skillLevel, timerTime, solidUserName } })
  console.log(skillLevel, timerTime, solidUserName);
  res.send('ok')
});

minesweeper.post('/createUser', async ({ query: { userName, userPass } }, res) => {
  try {
    const { data: posted } = await axios.post('http://localhost:3500/createUser', null, { params: { userName, userPass } });
    res.send(posted);
  } catch (err) {
    res.send(err);
  }
});

module.exports = minesweeper;