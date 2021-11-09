const { cFLink } = process.env;
import express from "express";
import axios from "axios";
import path from "path";
import React from "react";
import cors from "cors";
import ReactDOMServer from "react-dom/server";
import { StaticRouter as Router } from "react-router-dom";
import AppRouter from "Public/components/AppRouterComponents/AppRouter.js";
import Footer from "Public/components/FooterComponents/Footer.js";
import templates from "Server/templates.js";
import { getResume } from "Database/resume_controllers.js";
// import { getAllPortfolioItems } from "Database/controllers/portfolio_controllers.js";
import portfolioJSON from "PortfolioJSON";
import footerJSON from "FooterJSON";
import { GlobalStoreProvider } from "GlobalStore";
import { requestRecommendations } from "./recommendations.js";

const { htmlStart, htmlMid, htmlEnd } = templates;
const app = express();

// import staticRouter from "./staticRoutes.js";
import resumeRouter from "./resumeRoutes.js";
import portfolioRouter from "./portfolioRoutes.js";
import minesweeperRouter from "Minesweeper/minesweeperRoutes.js";

import { sendEmail } from "./sendGridConfig.js";

app.use(cors());

app.use("*", (req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

// --> serves the Dist/Public Folder
app.use("/static", express.static(path.resolve(__dirname, "../public")));
app.use(/(resume)?/, resumeRouter);
app.use(/(minesweeper)?/, minesweeperRouter);
app.use(/(portfolio)?/, portfolioRouter);

app.post("/api/sendEmail", (req, res) => {
  const name = req.query.fullName;
  const _subject = `New Message from FSH.com - [${name}]`;

  const incomingMessage = req.query.message;

  // Follow up Contact Details
  const linkedIn = req.query.linkedin.trim("")
    ? req.query.linkedin
    : "not provided";
  const email = req.query.email.trim("") ? req.query.email : "not provided";
  const phoneNumber = req.query.phoneNumber.trim("")
    ? req.query.phoneNumber
    : "not provided";
  const _message = incomingMessage.concat(
    `

    phone: ${phoneNumber}
    email: ${email},
    linkedIn: ${linkedIn}
    `
  );

  sendEmail(_subject, _message, (indicator) => {
    res.send(indicator);
  });
});

app.get("/api/recommendations", async (req, res) => {
  try {
    const recommendations = await requestRecommendations();
    res.json(recommendations);
  } catch (err) {
    res.send("Recommendations request didn't work");
  }
});

app.get("*", async (req, res) => {
  const context = {};
  let activeResume;

  // Home Page
  if (req.url === "/") {
    context.activeResume = await getResume();
  }

  // Minesweeper
  if (req.url.indexOf("minesweeper") > -1) {
    console.log("requesting minesweeper...");
    try {
      const { data } = await axios(
        `${cFLink}/mines/build/public/public-bundle.js`
        // `https://www.beatminesweeper.app`
      );
      context.minesweeperGame = data;
    } catch (err) {
      // context.minesweeperGame = err.message
    }
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

  res.write(
    htmlStart(
      {
        portfolioJSON: portfolioJSON,
        footerJSON: footerJSON,
        resumeData: activeResume,
        minesweeperGame: context.minesweeperGame,
      }
    )
  );

  const minesweeperIndicator = !!(req.url.indexOf("minesweeper") > -1);

  // appStream.pipe(res, { end: false });
  // appStream.on("end", () => {
    // res.write(htmlMid(context.minesweeperGame));
    footerStream.pipe(res, { end: false });
    footerStream.on("end", () => {
      if (minesweeperIndicator) {
        res.write(htmlEnd(minesweeperIndicator));
      } else {
        res.write(htmlEnd());
      }

      if (context.url) {
        res.writeHead(301, { Location: context.url });
        res.end();
      } else {
        res.end();
      }
    });
  });
// });

const port = 3000;

app.listen(port, () => {
  console.log(`Personal Website is listening on port-> ${port}`);
});
