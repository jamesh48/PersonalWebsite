import React, { useEffect } from "react";
import Promise from "bluebird";
import { useGlobalContext } from "GlobalStore";
import { useMarqueeContext } from "MarqueeStore";
import "./marqueeContainer.scss";
const { cFLink } = process.env;

import MCPortrait from "./MarqueeContainers/MCPortrait";
import MCLandscape from "./MarqueeContainers/MCLandscape";

export const MarqueeContainer = ({ smileCallback }) => {
  const [{ smileImage }, marqueeDispatch] = useMarqueeContext();
  const [{ portrait, smallWindow, mobileBrowser }] = useGlobalContext();

  const handleSmileImage = async (smileImage) => {
    smileImage = await new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve({ ...smileImage });
      img.onerror = () => {
        reject(new Error(`The ${smileImage.title} image failed to load`));
      };
      img.src = smileImage.url;
    });
    marqueeDispatch({
      type: "SET SMILE IMAGE",
      payload: { ...smileImage, loaded: true },
    });
  };

  useEffect(() => {
    if (smileImage.loaded === true) {
      // https://reactgo.com/settimeout-in-react-hooks/
      const timeout = setTimeout(() => {
        smileCallback();
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [smileImage]);

  useEffect(() => {
    handleSmileImage({ url: `${cFLink}/main/main-images/linkedin.jpg` });
  }, [portrait]);

  const paragraphOne = `I have just finished working on several software engineering applications- my favorite technologies are front end technologies like React and its testing frameworks, but I particularly enjoy working on optimizing backend Relational Databases like mySQL and Postgres. For example, I recently worked on horizontally scaling an Amazon Web Services microservice to take in a large RPS which mainly required optimizing database queries. I really enjoy coding- particularly working on teams while also working solo.`;

  const paragraphTwo = `I am kind, compassionate, empathetic and a good listener. I have a background in secular Buddhism, and have worked on compassionate and mindful teams in eldercare for the past two years. I value self care but I also like going in hard. I’ve trained for and have run a marathon, and I was also a competitive swimmer in college and now. I also have lived in two foreign countries and have visited 32 others.`;

  // Load Portrait mode if its a mobileBrowser and is in portrait orientation
  // OR--
  // Load Portrait mode if its a browser and a small window
  return smileImage.loaded && ((mobileBrowser && portrait) || (!mobileBrowser && smallWindow)) ? (
    <MCPortrait
      smileImage={smileImage}
      paragraphOne={paragraphOne}
      paragraphTwo={paragraphTwo}
    />
  ) : smileImage.loaded ? (
    <MCLandscape
      smileImage={smileImage}
      paragraphOne={paragraphOne}
      paragraphTwo={paragraphTwo}
    />
  ) : (
    <p>Loading Marquee Container....</p>
  );
};
