import express from 'express';
import axios from 'axios';
import path from 'path';
import React from 'react';
import cors from 'cors';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter as Router } from "react-router-dom";
import AppRouter from 'Public/components/AppRouter.js';
import Minesweeper from 'Public/components/MinesweeperComponents/Minesweeper_Proxy.js';
import Footer from 'Public/components/FooterComponents/Footer.js';
import templates from './templates.js';
import { getResume } from 'Database/resume_controllers.js';
import portfolioJSON from 'PortfolioJSON';
import footerJSON from 'FooterJSON';

const { htmlStart, htmlMid, htmlEnd } = templates;
const app = express();
import resumeRouter from './ResumeRoutes.js';
import minesweeperRouter from './minesweeperRoutes.js';

app.use(cors());

// --> serves the Dist/Public Folder
app.use("/static", express.static(path.resolve(__dirname, "../public")));

app.use(/(resume)?/, resumeRouter);
app.use(/(minesweeper)?/, minesweeperRouter);

app.get("/", async (req, res) => {
  const activeResume = await getResume();

  const appStream = ReactDOMServer.renderToNodeStream(
    <Router >
      <AppRouter />
    </Router>
  );
  const footerStream = ReactDOMServer.renderToNodeStream(<Footer />);
  res.write(htmlStart({ portfolioJSON: portfolioJSON, footerJSON: footerJSON, resumeData: activeResume }));
  appStream.pipe(res, { end: false });
  appStream.on("end", () => {
    res.write(htmlMid);
    footerStream.pipe(res, { end: false });
    footerStream.on('end', () => {
      res.write(htmlEnd)
      res.end();
    });
  });
});

app.get("/fullstack*", (req, res) => {
  const context = {};
  const appStream = ReactDOMServer.renderToNodeStream(
    <Router location={req.url} context={context}>
      <AppRouter />
    </Router>
  );

  const footerStream = ReactDOMServer.renderToNodeStream(
    <Footer />
  );
  res.write(htmlStart({ portfolioJSON: portfolioJSON, footerJSON: footerJSON }));
  appStream.pipe(res, { end: false });
  appStream.on("end", () => {
    res.write(htmlMid);
    footerStream.pipe(res, { end: false });
    footerStream.on("end", () => {
      res.write(htmlEnd);
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
