import React from 'react';


export default ({style: {marqueeButtonContainer}}) => {
  return (
    <div className={marqueeButtonContainer}>
      <button>About Me</button>
      <button>Resume</button>
      <button>Portfolio</button>
    </div>
  )
}