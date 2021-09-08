import React from 'react';
import AdminPortfolioInput from './AdminPortfolioInput.js';

export default ({ handleSubmit, portfolioData }) => {
  return portfolioData?.map((portfolioItemProps, index) => {
    return (
      <AdminPortfolioInput
        key={index}
        dataindex={index}
        handleSubmit={handleSubmit}
        portfolioItemProps={portfolioItemProps}
      />
    )
  }) || null;
}
