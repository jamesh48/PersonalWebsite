import React from 'react';


export default ({style: {marqueeButtonContainer}}) => {
  return (
    <div className={marqueeButtonContainer}>
      <button>About Me</button>
      <button>Portfolio</button>
      <button>Resume</button>
    </div>
  )
}