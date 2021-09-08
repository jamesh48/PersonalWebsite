import React, { useState, useEffect } from 'react';
import ExistingPortfolioContainers from './ExistingPortfolioContainers.js';
import portfolioJSON from '../../../../../Data/PortfolioData.json';

import utils from './Utils.js';
const { getAllPortfolioItems, postPortfolio } = utils;
import './adminPortfolio.scss';

export default ({ }) => {
  const [inputs, setInputs] = useState({ submitted: true, data: portfolioJSON });
  const [newPortfolioItem, setNewPortfolioItem] = useState(false);

  useEffect(async () => {
    const portfolioData = await getAllPortfolioItems();
    setInputs((ex) => {
      ex.submitted = false;
      ex.data = portfolioData;
      return { ...ex };
    });
  }, []);

  useEffect(async () => {
    if (inputs.submitted) {
      const patched = await postPortfolio(inputs);
      setInputs({ submitted: false, data: patched });
    }
  }, [inputs])

  const handleSubmit = (data) => {
    event.preventDefault();
    const spliceIndex = data.index;
    delete data.index;
    setInputs((prevInputs) => {
      prevInputs.data.splice(spliceIndex, 1, data);
      prevInputs.submitted = true;
      return { ...prevInputs };
    });
  };

  const changeNewInputView = () => setNewPortfolioItem((_) => !_);

  return (
    <div className='adminPortfolioContainer'>
      <ExistingPortfolioContainers handleSubmit={handleSubmit} portfolioData={inputs.data} />
      {
        !newPortfolioItem ?
          <button onClick={changeNewInputView}>New Portfolio Item</button> : null
      }
    </div>
  )
};