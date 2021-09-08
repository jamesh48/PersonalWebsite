import axios from 'axios';
import regeneratorRuntime from 'regenerator-runtime';

export default {
  getAllPortfolioItems: async () => {
    try {
      const { data: portfolioItems } = await axios.get('/portfolio');
      return portfolioItems;
    } catch(err) {
      console.log(err);
    }
  },
  postPortfolio: async (inputs) => {
    try {
      inputs = JSON.stringify(inputs);
      const { data: patched } = await axios.patch('/portfolio', null, {
        params: { inputs }
      });
      return patched;
    } catch(err) {
      console.log(err);
    }
  }
}