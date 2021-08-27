export default () => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];

  return toMatch.some((toMatchItem) => {
    // Second condition works for ipads that display intel mac...
    return navigator.userAgent.match(toMatchItem) || (navigator.userAgent.indexOf('Macintosh') > -1 && 'ontouchend' in document);
  });
}