import React from "react";

const MCPortrait = ({ smileImage, paragraphOne, paragraphTwo }) => {

  return (
    <div
      className={`marquee-container marquee-container--Portrait portfolioFader`}
    >
      <div className="about-me-marquee-details">
        <h4 className="about-me-marquee-title">James Hrivnak</h4>
        <div className="marquee-content-container">
          <span className="marquee-contents">
            <div className="marquee-paragraphs">
              <p className="about-me-marquee-description">{paragraphOne}</p>
              <div
                className="smile-container"
                style={{ backgroundImage: `url(${smileImage.url})` }}
              ></div>
              <p className="about-me-marquee-description">{paragraphTwo}</p>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MCPortrait;
