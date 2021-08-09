import React, { useState, useEffect } from 'react';

export default ({ mouseLocation }) => {
  const [x, y] = mouseLocation;
  // const [reset, setReset] = useState(false);
  // const [mousePostionX, setMousePositionX] = useState();
  // const [mousePositionY, setMousePositionY] = useState();
  // useEffect(() => {

  // }, []);

  let px, py;
  px = py = 0;


    //   // sets the image cursor to new relative position
    // let cursor = document.getElementById('cursor');
    // cursor.style.left = (mouseLocation[0] + x) + "px";
    // cursor.style.top = (mouseLocation[1] + y) + "px";

  return (
    <img
      id='cursor'
      style={{left: x + 'px', top: y + 'px'}}
      src="https://media.geeksforgeeks.org/wp-content/uploads/20200319212118/cursor2.png"
      width="15"
      height="20">
    </img>
  )
}