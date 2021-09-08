import express from 'express';
import axios from 'axios';

const staticRouter = express();

staticRouter.get('*', async ({ params: { '0': route } }, res) => {

  try {
    const { data: staticAsset } = await axios(`http://static.fullstackhrivnak.com${route}`);
    res.send(staticAsset);
  } catch (err) {
    console.log(err.message);
    res.send(err);
  }
});

export default staticRouter;