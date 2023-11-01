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

  const paragraphOne = `I have worked as an AWS Devops Engineer for the past two years. I am skilled in various services that AWS offers including EKS, ECS, ActiveMQ, Lambda/Serverless, CDK, and DynamoDB, among many others. My experience in this role has also equipped me with expertise in CI/CD pipelines, Docker, and Kubernetes. From a application development perspective, I also have a wealth of Fullstack Experience using Node, React, and Typescript.`;

  const paragraphTwo = `I am a highly motivated and detail-oriented professional, always striving for excellence in my work. I am adept at problem-solving and have a strong ability to analyze complex requirements and translate them into practical and efficient solutions. Additionally, my leadership experience in coordinating deployments and guiding frontend and backend developers further highlights my ability to work collaboratively and effectively in a team environment.`;

  // Load Portrait mode if its a mobileBrowser and is in portrait orientation
  // OR--
  // Load Portrait mode if its a browser and a small window
  return smileImage.loaded && ((mobileBrowser && portrait) || (!mobileBrowser && smallWindow)) ? (
    <MCPortrait smileImage={smileImage} paragraphOne={paragraphOne} paragraphTwo={paragraphTwo} />
  ) : smileImage.loaded ? (
    <MCLandscape smileImage={smileImage} paragraphOne={paragraphOne} paragraphTwo={paragraphTwo} />
  ) : (
    <p>Loading Marquee Container....</p>
  );
};
