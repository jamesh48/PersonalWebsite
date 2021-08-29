import React from 'react';
import axios from 'axios';

import './blog.scss';
import BlogSearch from './BlogSearch.jsx';
import BlogTitle from './BlogTitle.jsx';
import BlogText from './BlogText.jsx';

// const { blogContainer } = blogStyles;

export default ({ globalStyles: { container } }) => {
  return (
    <div className={`${container} ${blogContainer}`}>
      <BlogSearch style={blogStyles} />
      <BlogTitle style={blogStyles} />
      <BlogText style={blogStyles} />
    </div>
  )
}