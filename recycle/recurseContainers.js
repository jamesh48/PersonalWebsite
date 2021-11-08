const recurseContainers = ({ resumeDetails, mobileBrowser, hoverDepth, hoverBreadth, handleHover, handleMobileResumeClick, depth, prevIndex }) => {

  return resumeDetails?.map((currentItem, currentIndex, currentArr) => {

    let currentContainerArr = [];

    currentContainerArr.push(
      <PublicDisplayContainer
        key={currentIndex}
        depth={depth}
        breadth={currentIndex}
        displayItem={currentItem.title}
      />
    );

    const breadthArr = typeof hoverBreadth !== 'number' ? hoverBreadth?.split('_') : [hoverBreadth];

    let highlightDetails = [];
    let recursed = [];

    if (
      currentItem.detail &&
      breadthArr?.length &&
      ((hoverDepth === depth && currentIndex === Number(breadthArr[breadthArr.length - 1])) ||
        (hoverDepth > depth && currentIndex === Number(breadthArr[depth])))
    ) {

      highlightDetails = currentItem['highlightDetail'] ? highlightContainers(currentItem['highlightDetail'], currentItem['highlightDetail'][0]) : null


      const nextProps = {
        resumeDetails: currentItem.detail,
        depth: depth + 1,
        hoverDepth: hoverDepth,
        hoverBreadth: hoverBreadth,
        handleHover: handleHover,
        handleMobileResumeClick: handleMobileResumeClick,
        prevIndex: !currentArr[currentIndex + 1] || currentIndex === 0 ? currentIndex : null,
        mobileBrowser: mobileBrowser
      };

      recursed = recurseContainers(nextProps);
    };

    return [
      <div key={currentIndex} className='resumeParentContainer'>

        <div
          data-depth={depth}

          onTouchEnd={() => {
            if (mobileBrowser) {
              handleMobileResumeClick()
            }
          }}
          onMouseOver={_ => (mobileBrowser === false && depth !== null) ? handleHover() : null}
          onMouseLeave={() => {
            if (mobileBrowser) return;
            let test = typeof hoverBreadth === 'string' ? hoverBreadth.split('_') : hoverBreadth;

            if (
              (
                // If hovering downwards from one section to the next...
                (depth === 1
                  && hoverDepth >= 2)
                && !currentArr[Number(test[1]) + 1]
                && test.length === 3
              )
              // ||
              // // // This condition provides for the occasional case where the next section isn't triggered automatically by hovering downwards...
              // (
              //   depth === 0 && hoverDepth === 1 && currentArr[Number(hoverBreadth.split('_')[0]) + 1]
              // )
            ) {
              return handleHover('nextSection');
            };

            // This condition triggers the previous section if hovering upwards...
            // const isOpening = typeof hoverBreadth === 'string' ? (Number(hoverBreadth.split('_')[0]) !== 0) : false;
            // if (depth === 1 && hoverDepth === 1 && currentIndex === 0) {
            //   console.log(prevIndex, JSON.stringify(breadthArr))
            // }
            if (depth === 1 && hoverDepth === 1 && currentIndex === 0) return handleHover('prevSection');
          }}
          className={handleFadingClassNames(depth, hoverDepth, hoverBreadth, currentIndex, mobileBrowser)}
        >
          <div
            className={handleDepthClassNames(depth, mobileBrowser)}
          >
            {currentContainerArr}
          </div>

          {
            depth < 2 ?
              <div className='publicColumnContainer'>
                {recursed}
              </div> : null
          }
          {highlightDetails}
        </div>
      </div >
    ];
  });
}

const highlightContainers = (...args) => args[0].length ? <HighlightContainer highlights={args} /> : null;
