import React from 'react';

export default ({ style: { blogSearchContainer } }) => {
  return (
    <div className={blogSearchContainer}>
      <input type='text' placeholder='search'></input>
    </div>
  )
}