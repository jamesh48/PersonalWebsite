import React from 'react';

export default ({ style: { marqueeContainer, aboutMeMarqueeDetails, aboutMeMarqueeDescription, aboutMeMarqueeTitle, smileContainer } }) => {
  return (
    <div className={marqueeContainer}>
      <div className={aboutMeMarqueeDetails}>
        <h4 className={aboutMeMarqueeTitle}>James Hrivnak</h4>
        <p className={aboutMeMarqueeDescription}>
          I am a full-stack engineer, specializing in Node, React, Express, and PostgreSQL. I thoroughly enjoy problem-solving; and learning new things through struggle. I have taken my unique problem-solving and leadership skills from years of running high-intensity fine dining restaurants and applied them with great success to the software development landscape.
        </p>
      </div>

      <div className={smileContainer}>
        {/* Holds Image, see css for info */}
      </div>
    </div>
  )
}