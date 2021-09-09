export default {
  handleHover: (indicator, hoverBreadth) => {
    if (indicator === 'exit') return [null, null];

    if (indicator === 'prevSection') {
      // Depth = 1
      let newHoverParams = [].concat(1);
      const update = Number(hoverBreadth.split('_')[0]) - 1;
      return newHoverParams.concat(`${update}_0`);
    }

    if (indicator === 'nextSection') {
      // Depth = 1
      let newHoverParams = [].concat(1);
      const update = Number(hoverBreadth.split('_')[0]) + 1;
      return newHoverParams.concat(hoverBreadth ? `${update}_0` : null)
    }



    let { target: { dataset: { depth, breadth, name } } } = event;

    // Setting hoverDepth------------------->
    let newHoverParams = [].concat(Number(depth));

    // setting hoverBreadth----------------->
    // hoverBreadth column-one
    if (depth === '0') return newHoverParams.concat(Number(breadth));

    // hoverBreadth-> column-two
    if (depth === '1') {

      if (typeof hoverBreadth === 'number') return newHoverParams.concat(`${hoverBreadth}_${breadth}`)

      const ex = hoverBreadth.split('_');

      let test = ex.length === 3 ? Object.assign([], ex, { 1: breadth }).slice(0, 2) : Object.assign([], ex, { 1: breadth });
      return newHoverParams.concat(test.join('_'));
    };

    // hoverBreadth-> column-three
    if (depth === '2') {
      if (typeof hoverBreadth === 'number') return newHoverParams.concat(`${hoverBreadth}_${breadth}`)

      const prevHoverBreadthArr = hoverBreadth.split('_');
      if (prevHoverBreadthArr.length === 2) return newHoverParams.concat(`${hoverBreadth}_${breadth}`);

      const change = Object.assign([], hoverBreadth.split('_'), { depth: breadth });
      return newHoverParams.concat(change.join('_'));
    };

    if (depth === '3') {
      const prevHoverBreadthArr = hoverBreadth.split('_');
      if (prevHoverBreadthArr.length === 2) return newHoverParams.concat(`${hoverBreadth}_${breadth}`);

      const change = Object.assign([], hoverBreadth.split('_'), { depth: breadth });

      return newHoverParams.concat(change.join('_'));
    };


    return [1, hoverBreadth]
  },


  handleBrowserHover: () => {

  }

}