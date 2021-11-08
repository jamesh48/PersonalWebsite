import React, { useState, useEffect } from "react";
import { FooterItemContainer } from "./FooterItemContainer.js";
import AppUtils from "../AppRouterComponents/AppUtils.js";
import { useGlobalContext } from "GlobalStore";
const { mobileBrowserFunction } = AppUtils;
import "./footerStyles.scss";

export default function Footer({ footerJSON }) {
  const [images, setImages] = useState([{ url: "", loaded: false, link: "" }]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [{ mobileBrowser }, globalDispatch] = useGlobalContext();

  //Set Mobile Browser
  useEffect(() => {
    const mobileBrowserTest = mobileBrowserFunction();
    globalDispatch({
      type: "TOGGLE MOBILE BROWSER",
      payload: !!mobileBrowserTest,
    });
  }, []);

  const incrementImageLoad = (i) => {
    setImages((x) => {
      x[i].loaded = true;
      return [...x];
    });
  };

  useEffect(() => {
    if (images.every((image) => image.loaded)) {
      setIsLoaded(true);
    }
  }, [images]);

  useEffect(() => {
    setImages(
      footerJSON.map(({ imageUrl, iconLink }, loadedIndex) => {
        let img = new Image();
        img.onload = () => incrementImageLoad(loadedIndex);
        img.src = imageUrl;

        return {
          iconLink: iconLink,
          url: imageUrl,
          loaded: false,
        };
      })
    );
  }, []);

  useEffect(() => {}, []);

  return isLoaded ? (
    <div
      id="footerContainer"
      className={
        mobileBrowser
          ? `footer-container footer-container--Mobile`
          : `footer-container`
      }
    >
      <div id="footer-items-container">
        {images.map((iconData, iconIndex) => {
          return <FooterItemContainer key={iconIndex} iconData={iconData} />;
        })}
      </div>
    </div>
  ) : null;
}
