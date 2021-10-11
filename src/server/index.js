import express from 'express';
import axios from 'axios';
import path from 'path';
import React from 'react';
import cors from 'cors';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter as Router } from "react-router-dom";
import AppRouter from 'Public/components/AppRouterComponents/AppRouter.js';
import Minesweeper from 'Public/components/MinesweeperComponents/Minesweeper_Proxy.js';
import Footer from 'Public/components/FooterComponents/Footer.js';
import templates from 'Server/templates.js';
import { getResume } from 'Database/resume_controllers.js';
import { getTopTimes } from 'Minesweeper/minesweeperControllers.js';
import { getAllPortfolioItems } from 'Database/controllers/portfolio_controllers.js';
import portfolioJSON from 'PortfolioJSON';
import footerJSON from 'FooterJSON';
import { GlobalStoreProvider } from 'GlobalStore';

const { htmlStart, htmlMid, htmlEnd } = templates;
const app = express();

import staticRouter from './staticRoutes.js';
import resumeRouter from './resumeRoutes.js';
import portfolioRouter from './portfolioRoutes.js';
import minesweeperRouter from 'Minesweeper/minesweeperRoutes.js';

app.use(cors());

app.use('*', (req, res, next) => {
  console.log(req.method, req.originalUrl)
  next();
});


// --> serves the Dist/Public Folder
app.use("/static", express.static(path.resolve(__dirname, "../public")));

app.use(/(resume)?/, resumeRouter);
app.use(/(minesweeper)?/, minesweeperRouter);
app.use(/(portfolio)?/, portfolioRouter);

app.get("*", async (req, res) => {
  const context = {};
  let activeResume, minesweeperTopTimes, minesweeperGame;

  // Home Page
  if (req.url === '/') {
    context.activeResume = await getResume()
  }

  // Minesweeper
  if (req.url.indexOf('minesweeper') > -1) {
    // context.minesweeperTopTimes = req.url.indexOf('minesweeper') > -1 ? await getTopTimes() : null;
    // const {data} = await axios(`https://static.fullstackhrivnak.com/mines/build/public/index.js`);
    const {data} = await axios(`https://beatminesweeper.app/static/index.js`)
    context.minesweeperGame = data;
  }



  // const portfolioJSON = req.url === '/' ? await getAllPortfolioItems() : null;
  const appStream = ReactDOMServer.renderToNodeStream(
    <GlobalStoreProvider>
      <Router location={req.url} context={context}>
        <AppRouter />
      </Router>
    </GlobalStoreProvider>
  );

  const footerStream = ReactDOMServer.renderToNodeStream(
    <GlobalStoreProvider>
      <Footer />
    </GlobalStoreProvider>
  );

  res.write(htmlStart({
    portfolioJSON: portfolioJSON,
    footerJSON: footerJSON,
    // topTimes: minesweeperTopTimes,
    resumeData: activeResume,
    game: minesweeperGame
  }));

  appStream.pipe(res, { end: false });
  appStream.on("end", () => {
    res.write(htmlMid);
    footerStream.pipe(res, { end: false });
    footerStream.on('end', () => {
      res.write(htmlEnd)

      if (context.url) {
        res.writeHead(301, { Location: context.url });
        res.end();
      } else {
        res.end();
      };
    });
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Personal Website is listening on port-> ${port}`)
});
