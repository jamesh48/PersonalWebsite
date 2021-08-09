import React from 'react';
import globalStyles from '../../main-styles/global.scss';
const {container} = globalStyles;
export default ({ style: { blogTitle } }) => {
  return (
    <h4 className={blogTitle}>Sequelize</h4>
  )
}