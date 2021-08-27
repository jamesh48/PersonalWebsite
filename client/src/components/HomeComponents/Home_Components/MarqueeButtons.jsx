import React, { useState, useEffect } from 'react';


export default ({ indicator, container, style: { marqueeButtonContainer, lastMarqueeButtonContainer } }) => {
  const [triggers, setTriggers] = useState([]);

  useEffect(() => {
    let test = document.querySelectorAll('.' + container)
    let triggerArr = [];
    test.forEach((node, index) => {
      let y = document.getElementById(node.id);
      triggerArr.push(y);
    })
    setTriggers(triggerArr);

  }, [])



  return (
    <div className={indicator ? `${marqueeButtonContainer} ${lastMarqueeButtonContainer}` : marqueeButtonContainer}>
      <button onClick={() => {
        triggers[0].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }}>About Me</button>
      <button onClick={() => {
        triggers[1].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }}>Resume</button>
      <button onClick={() => {
        triggers[2].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }}>Portfolio</button>
    </div>
  )
}