import React from 'react';

export default ({style: {blogTextContainer, blogText}}) => {
  return (
    <div className={blogTextContainer}>
      <p className={blogText}>How to sequelize</p>
    </div>
  )
}