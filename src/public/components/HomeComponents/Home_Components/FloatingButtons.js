import React, { useState, useEffect } from 'react';


export default ({ indicator }) => {
  const [triggers, setTriggers] = useState([]);

  useEffect(() => {
    let triggerContainers = document.querySelectorAll('.container')
    let triggerArr = [];
    triggerContainers.forEach(({ id, dataset: { name } }, index) => {
      const y = document.getElementById(id);
      triggerArr.push([y, name]);
    });
    setTriggers(triggerArr);
  }, []);

  return (
    <div id='floating-fader'>

      <div className={indicator ? `floatingButtonContainer lastMarqueeButtonContainer` : `floatingButtonContainer`}>

        {
          triggers.map(([location, name]) => {
            return (
              <button onClick={() => {
                location.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                  inline: 'center'
                });
              }}>{name}</button>
            );
          })
        }

      </div>
      <hr className='marqueeButtonsHR' />

    </div>

  )
};