import React, { useState, useEffect, useLayoutEffect, useReducer } from 'react';
import './marqueeContainer.scss'
const { cFLink } = process.env;


export default ({ mobileBrowser, smallWindow, smileCallback }) => {

  const imageReducer = (state, action) => {
    switch (action.type) {
      case 'TRIGGER_TRUE':
        return { ...state, loaded: true };
      case 'NEW_IMG':
        return action.payload;
      default:
        throw new Error();
    }
  }

  const [image, dispatchImage] = useReducer(imageReducer, { loaded: false, url: '' });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (image.loaded === true) {
      setIsLoaded(true);
      // https://reactgo.com/settimeout-in-react-hooks/
      const timeout = setTimeout(() => {
        smileCallback();
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [image]);

  useEffect(() => {
    let img = new Image();
    img.onload = () => { dispatchImage({ type: 'TRIGGER_TRUE' }) };
    img.src = `${cFLink}/main/main-images/linkedin.jpg`;

    dispatchImage({ type: 'NEW_IMG', payload: { loaded: false, url: `${cFLink}/main/main-images/linkedin.jpg` } });
  }, [mobileBrowser]);


  return isLoaded ? (
    <div className={(mobileBrowser || smallWindow) ? `marqueeContainer marqueeContainer--Mobile portfolioFader` : `marqueeContainer portfolioFader`}>
      <div className='aboutMeMarqueeDetails'>
        <h4 className='aboutMeMarqueeTitle'>James Hrivnak</h4>
        <div>
          <span className='marqueeContents'>
            <div className='marqueeParagraphs'>
              <p className='aboutMeMarqueeDescription'>
                I have just finished working on several software engineering applications- my favorite technologies are front end technologies like React and its testing frameworks, but I particularly enjoy working on optimizing backend Relational Databases like mySQL and Postgres. For example, I recently worked on horizontally scaling an Amazon Web Services microservice to take in a large RPS which mainly required optimizing database queries. I really enjoy coding- particularly working on teams while also working solo.
              </p>
              {mobileBrowser || smallWindow ? <div className='smileContainer' style={{ backgroundImage: `url(${image.url})` }}></div> : null}
              <p className={'aboutMeMarqueeDescription'}>
                I am kind, compassionate, empathetic and a good listener. I have a background in secular Buddhism, and have worked on compassionate and mindful teams in eldercare for the past two years. I value self care but I also like going in hard. I’ve trained for and ran a marathon, and also was a competitive swimmer in college and now. I also have lived in two foreign countries and have visited 32 others.
              </p>
            </div>
            {(mobileBrowser === false && smallWindow === false) ? <div className='smileContainer' style={{ backgroundImage: `url(${image.url})` }}></div> : null}
          </span>
        </div>
      </div>
    </div>
  ) : null
}


