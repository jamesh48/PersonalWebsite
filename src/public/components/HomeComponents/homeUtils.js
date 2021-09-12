export default {
  handleHover: (indicator, hoverBreadth, dispatchHoverParams) => {
    if (indicator === 'exit') return dispatchHoverParams({ type: 'FULL', payload: [null, null] })

    if (indicator === 'prevSection') {
      // Depth = 1
      let newHoverParams = [].concat(1);
      const update = Number(hoverBreadth.split('_')[0]) - 1;
      return dispatchHoverParams({ type: 'FULL', payload: newHoverParams.concat(`${update}_0`) })
    }

    if (indicator === 'nextSection') {
      // Depth = 1
      let newHoverParams = [].concat(1);
      const update = Number(hoverBreadth.split('_')[0]) + 1;
      return dispatchHoverParams({ type: 'FULL', payload: newHoverParams.concat(hoverBreadth ? `${update}_0` : null) })
    }



    let { target: { dataset: { depth, breadth, name } } } = event;

    // Setting hoverDepth------------------->
    let newHoverParams = [].concat(Number(depth));

    // setting hoverBreadth----------------->
    // hoverBreadth column-one
    if (depth === '0') return dispatchHoverParams({ type: 'FULL', payload: newHoverParams.concat(Number(breadth)) });

    // hoverBreadth-> column-two
    if (depth === '1') {

      if (typeof hoverBreadth === 'number') return dispatchHoverParams({ type: 'FULL', payload: newHoverParams.concat(`${hoverBreadth}_${breadth}`) });

      const ex = hoverBreadth.split('_');

      let test = ex.length === 3 ? Object.assign([], ex, { 1: breadth }).slice(0, 2) : Object.assign([], ex, { 1: breadth });
      return dispatchHoverParams({ type: 'FULL', payload: newHoverParams.concat(test.join('_')) });
    };

    // hoverBreadth-> column-three
    if (depth === '2') {
      if (typeof hoverBreadth === 'number') return dispatchHoverParams({ type: 'FULL', payload: newHoverParams.concat(`${hoverBreadth}_${breadth}`) });

      const prevHoverBreadthArr = hoverBreadth.split('_');
      if (prevHoverBreadthArr.length === 2) return dispatchHoverParams({ type: 'FULL', payload: newHoverParams.concat(`${hoverBreadth}_${breadth}`) });

      const change = Object.assign([], hoverBreadth.split('_'), { depth: breadth });
      return dispatchHoverParams({ type: 'FULL', payload: newHoverParams.concat(change.join('_')) });
    };

    if (depth === '3') {
      const prevHoverBreadthArr = hoverBreadth.split('_');
      if (prevHoverBreadthArr.length === 2) return dispatchHoverParams({ type: 'FULL', payload: newHoverParams.concat(`${hoverBreadth}_${breadth}`) });

      const change = Object.assign([], hoverBreadth.split('_'), { depth: breadth });

      return dispatchHoverParams({ type: 'FULL', payload: newHoverParams.concat(change.join('_')) });
    };

    return dispatchHoverParams({ type: 'FULL', payload: [1, hoverBreadth] })
  }
}