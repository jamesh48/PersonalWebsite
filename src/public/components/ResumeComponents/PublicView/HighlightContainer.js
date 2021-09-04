import React from 'react';

export default ({ highlights: [highlightDetail, highlightTitle] }) => {
  return (
    <div className='minorContainer'>
      <h5 className='minorContainerTitle'>{highlightTitle.title}</h5>
      <div className='minorHighlights'>
        {
          highlightDetail.map(({ title }, index) => {
            return (<span key={index} className='minorItem'>{title}</span>)
          }).slice(1)
        }
      </div>
    </div>
  );
}