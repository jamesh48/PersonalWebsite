import express from 'express';
const portfolio = express.Router();
import { patchPortfolio, getAllPortfolioItems } from 'Database/controllers/portfolio_controllers.js';

portfolio.get('/portfolio', async (req, res) => {
  const portfolioItems = await getAllPortfolioItems();
  res.send(portfolioItems);
});

portfolio.patch('*', async ({ query: { inputs: patchParams } }, res) => {
  const patched = await patchPortfolio(patchParams);
  res.json(patched);
});

export default portfolio;

