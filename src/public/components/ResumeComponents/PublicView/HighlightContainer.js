import React from 'react';

export default ({ highlights: [highlightDetail, highlightTitle] }) => {
  return (
    <div className='minorContainer'>
      <h5 className='minorContainerTitle'>{highlightTitle.title}</h5>
      <div className='minorHighlights' data-depth={3}>
        {
          highlightDetail.map(({ title }, index) => {
            return (<span key={index} data-depth={3} data-breadth={index} className='minorItem'>{title}</span>)
          }).slice(1)
        }
      </div>
    </div>
  );
}