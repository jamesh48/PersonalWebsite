import React from 'react';

export default ({ displayItem, depth, breadth, hoverDepth, handleHover, style }) => {
  const { stageZero, stageOne, stageTwo, stageThree } = style;
  const handleClassName = (hD) => {
    if (hoverDepth === 0) {
      return stageZero;
    }

    if (hoverDepth === 1) {
      return stageOne;
    }

    if (hoverDepth === 2) {
      return stageTwo;
    }

    if (hoverDepth === 3) {
      return stageThree;
    };
  };

  return (
    <h6 className={handleClassName(hoverDepth)} data-depth={depth} data-breadth={breadth}>{displayItem}</h6>
  )
}