import React, { useState, useEffect } from 'react';


export default ({ indicator, container }) => {
  const [triggers, setTriggers] = useState([]);

  useEffect(() => {
    let triggerContainers = document.querySelectorAll('.' + container)
    let triggerArr = [];
    console.log(triggerContainers);
    triggerContainers.forEach(({ id, dataset: { name } }, index) => {
      const y = document.getElementById(id);
      triggerArr.push([y, name]);
    });
    setTriggers(triggerArr);
  }, []);



  return (
    <div className={indicator ? `${'marqueeButtonContainer'} ${'lastMarqueeButtonContainer'}` : 'marqueeButtonContainer'}>

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
  );
};