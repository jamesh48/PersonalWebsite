import React from 'react';
import homeStyles from './home.scss';
import globalStyles from '../../main-styles/global.scss';
import MarqueeContainer from './Home_Components/MarqueeSection.jsx';
import MarqueeButtons from './Home_Components/MarqueeButtons.jsx';
import Portfolio from './Home_Components/Portfolio.jsx';
import Resume from '../ResumeComponents/Resume.jsx';


export default ({ globalStyles, globalStyles: { container }, admin }) => {
  return (
    <>
      <div className={container}>
        <MarqueeContainer style={homeStyles} />
        <MarqueeButtons style={homeStyles} />
      </div>

      <div className={container}>
        <Resume admin={admin} globalStyles={globalStyles} />
      </div>

      <div className={container}>
        <Portfolio style={homeStyles} />
      </div>
    </>
  )
}