const axios = require('axios');
module.exports = {
  getTopTimes: async (skillLevel, username) => {
    try {
      if (!skillLevel) {
        skillLevel = 'beginner';
      }
      const { data: topResults } = await axios('https://beatminesweeper.app/minesweeper-topTimes', { params: { skillLevel, username } });

      return topResults;
    } catch(err) {
      console.log(err.message)
      return err.message;
    }
  }
}