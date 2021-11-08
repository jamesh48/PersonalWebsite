import React from "react";

const MCLandscape = ({ smileImage, paragraphOne, paragraphTwo }) => {
  return (
    <div className={`marquee-container portfolioFader`}>
      <div className="about-me-marquee-details">
        <h4 className="about-me-marquee-title">James Hrivnak</h4>
        <div className="marquee-content-container">
          <span className="marquee-contents">
            <div className="marquee-paragraphs">
              <p className="about-me-marquee-description">{paragraphOne}</p>
              <p className="about-me-marquee-description">{paragraphTwo}</p>
            </div>
            <div
              className="smile-container"
              style={{ backgroundImage: `url(${smileImage.url})` }}
            ></div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MCLandscape;
