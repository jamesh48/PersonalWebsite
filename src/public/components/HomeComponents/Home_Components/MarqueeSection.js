import React from 'react';

export default ({ mobileBrowser }) => {
  return (
    <div className={mobileBrowser ? `marqueeContainer marqueeContainer--Mobile` : 'marqueeContainer'}>
      <div className={'aboutMeMarqueeDetails'}>
        <h4 className={'aboutMeMarqueeTitle'}>James Hrivnak</h4>
        <div>
          <span className='marqueeContents'>
            <div className='marqueeParagraphs'>
              <p className={'aboutMeMarqueeDescription'}>
                I have just finished working on several software engineering applications- my favorite technologies are front end technologies like React and its testing frameworks, but I particularly enjoy working on optimizing backend Relational Databases like mySQL and Postgres. For example, I recently worked on horizontally scaling an Amazon Web Services microservice to take in a large RPS which mainly required optimizing database queries. I really enjoy coding- particularly working on teams while also working solo.
              </p>
              {mobileBrowser ? <div className='smileContainer'></div> : null}
              <p className={'aboutMeMarqueeDescription'}>
                I am kind, compassionate, empathetic and a good listener. I have a background in secular Buddhism, and have worked on compassionate and mindful teams in eldercare for the past two years. I value self care but I also like going in hard. I’ve trained for and ran a marathon, and also was a competitive swimmer in college and now. I also have lived in two foreign countries and have visited 32 others.
              </p>
            </div>
            {!mobileBrowser ? <div className={'smileContainer'}></div> : null}
          </span>
        </div>
      </div>
    </div>
  )
}


