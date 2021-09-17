import React from 'react';
import {useDispatch} from 'react-redux';

export default {
  handleHover: (indicator, hoverBreadth) => {
    const dispatchHoverParams = useDispatch();

    if (indicator === 'exit') return dispatchHoverParams({ type: 'FULL', payload: [null, null] })

    let { target: { dataset: { depth, breadth, name } } } = event;

    // The first condition prevents details from disappearing momentarily when the user hovers downards over the border between the section title and the details
    // The second condition ensures that when the user goes to a new title, that the UI shows it, as there is no data-depth of publicColumnContainer between section and details but there is a data-depth in the empty space.
    if (event.target.className === 'publicColumnContainer' && !event.target.dataset.depth) return;

    // Setting hoverDepth------------------->
    let newHoverParams = [].concat(Number(depth));

    // setting hoverBreadth----------------->
    if (depth === '0') return dispatchHoverParams({ type: 'FULL', payload: newHoverParams.concat(Number(breadth)) });

    if (depth === '1' || event.target.className === 'publicColumnContainer') {
      return dispatchHoverParams({ type: 'FULL', payload: newHoverParams.concat(breadth) });
    };
  }
}