// const handleMouseMove = () => {
//   if (!document.getElementById("cursor")) {
//     const newCursor = document.createElement("div");
//     newCursor.id = "cursor";
//     newCursor.style.backgroundImage =
//       "url(https://static.fullstackhrivnak.com/main/main-images/cursor.png)";
//     document.querySelector("body").appendChild(newCursor);
//   }

//   const scrollYOffset = window.scrollY;
//   // Gets the x,y position of the mouse cursor
//   const x = event.clientX;
//   const y = event.clientY;

//   // sets the image cursor to new relative position
//   let cursor = document.getElementById("cursor");
//   cursor.style.left = x + "px";
//   cursor.style.top = scrollYOffset + y + "px";
// };

// const debounce = (fn, ms) => {
//   let timer;
//   return () => {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       timer = null;
//       fn.apply(this, arguments);
//     }, ms);
//   };
// };
// const mobileBrowserFunction = () => {
//   const toMatch = [
//     /Android/i,
//     /webOS/i,
//     /iPhone/i,
//     /iPad/i,
//     /iPod/i,
//     /BlackBerry/i,
//     /Windows Phone/i,
//   ];
//   return toMatch.some((toMatchItem) => {
//     // Second condition works for ipads that display intel mac...
//     return (
//       navigator.userAgent.match(toMatchItem) ||
//       (navigator.userAgent.indexOf("Macintosh") > -1 &&
//         "ontouchend" in document)
//     );
//   });
// };

// export {mobileBrowserFunction, handleMouseMove, debounce}
