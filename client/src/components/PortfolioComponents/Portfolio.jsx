import React from 'react';
import style from './portfolio.scss';
const { portfolioContainer } = style;
export default ({ globalStyles: { container } }) => {
  return (
    <div className={container} id='portfolio-root'>
      <h4>Portfolio</h4>
    </div>);
}