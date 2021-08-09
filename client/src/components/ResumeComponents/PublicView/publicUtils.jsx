import React, { useState, useEffect } from 'react';
import PublicDisplayContainer from './PublicDisplayContainer.jsx';
import style from '../resume.scss';


const { publicContainerRow, publicParentContainerRow, publicChildContainerRow, publicFinalContainerRow, publicColumnContainer, publicColumnContainerTitle, publicColumnContainerSection, publicColumnContainerDetail, niceContainer, minorContainer, minorContainerTitle, minorHighlights, minorItem, fader, faderOuter, publicContainerRowX } = style;

const handleFadingClassNames = (depth, hoverDepth, hoverBreadth, currentIndex) => {
  let test;

  if (hoverDepth === null) {
    return publicContainerRow + ' ' + publicContainerRowX;
  }

  if (hoverBreadth || hoverBreadth === 0) {
    test = typeof hoverBreadth === 'number' ? hoverBreadth : hoverBreadth.split('_');
  }

  if (
    (hoverDepth >= depth)
    &&
    (
      (typeof test === 'number' && depth === 0 && currentIndex !== test)
      ||
      (Array.isArray(test) && depth === 0 && currentIndex !== Number(test[0]))
      || (Array.isArray(test) && depth === 1 && currentIndex !== Number(test[1]))
    )

  ) {

    let className = (depth === 0 || depth === 1) ? `${publicContainerRow} ${faderOuter}` : faderOuter;
    if (depth === 0) {
      className += ' ' + publicParentContainerRow;
    }

    if (depth === 1) {
      className += ' ' + publicChildContainerRow
    }

    if (depth === 3) {
      className += ' ' + publicFinalContainerRow;
      className += ' ' + faderOuter;
    }
    return className;
  } else {
    let className = (depth === 0 || depth === 1) ? `${publicContainerRow} ${fader}` : fader;

    if (depth === 0) {
      className += ' ' + publicParentContainerRow;
    }

    if (depth === 1) {
      className += ' ' + publicChildContainerRow
    }

    if (depth === 3) {
      className += ' ' + publicFinalContainerRow;
      className += ' ' + fader;
    }
    return className;
  }
}

const highlightContainers = (highlightDetail, highlightTitle) => {
  return highlightDetail.length ?
    (
      <div className={minorContainer}>
        <h5 className={minorContainerTitle}>{highlightTitle.title}</h5>

        <div className={minorHighlights}>
          {highlightDetail.map((item) => {
            return (<span className={minorItem}>{item.title}</span>)
          }).slice(1)}
        </div>
      </div>
    ) : null
}

const recurseContainers = (inputArr, depth, hoverDepth, hoverBreadth, handleHover, prevIndex) => {
  return inputArr.map((currentItem, currentIndex, currentArr) => {
    let currentContainerArr = [];

    currentContainerArr.push(
      <PublicDisplayContainer
        handleHover={handleHover}
        hoverDepth={hoverDepth}
        key={currentIndex}
        displayItem={currentItem.title}
        depth={depth}
        breadth={currentIndex}
        style={style}
      />
    );

    let highlightDetails = [];
    let recursed;

    let breadthArr;
    if (typeof hoverBreadth !== 'number') {
      breadthArr = hoverBreadth?.split('_');
    } else {
      breadthArr = [hoverBreadth];
    }

    if (
      currentItem.detail &&
      ((hoverDepth === depth && currentIndex === Number(breadthArr[breadthArr.length - 1])) ||
      (hoverDepth > depth && currentIndex === Number(breadthArr[depth])))
    ) {
      if (currentItem['highlightDetail']) {
        highlightDetails = highlightContainers(currentItem['highlightDetail'], currentItem['highlightDetail'][0]);
      };

      // If its the last item of the
      recursed = recurseContainers(currentItem.detail, depth + 1, hoverDepth, hoverBreadth, handleHover, !currentArr[currentIndex + 1] || currentIndex === 0 ? currentIndex : null);
    }

    return [
      <div className={niceContainer}>

        <div
          data-depth={depth}
          onMouseOver={() => {
            handleHover(event);
          }}

          onMouseLeave={() => {
            if (
              // Exiting from any Title entry exits
              depth === 0 && hoverDepth === 0 ||
              // Exiting upwards from the top-most section exits
              (depth === 1 && hoverDepth === 1 && (prevIndex === 0 && currentIndex === 0)) ||
              // Exiting downwards from the bottom-most details exits
              ((depth === 1 && hoverDepth === 2) &&
              (prevIndex && !currentArr[Number(hoverBreadth.split('_')[1]) + 1])
              )
              ) {
              handleHover(event, 'exit')
              return;
            }


            if (depth === 1 && hoverDepth === 2 && !currentArr[Number(hoverBreadth.split('_')[1]) + 1]) {
              handleHover(event, 'nextSection');
              return;
            }

            if (depth === 1 && hoverDepth === 1 && currentIndex === 0) {
              handleHover(event, 'prevSection');
              return;
            }

          }}

          className={handleFadingClassNames(depth, hoverDepth, hoverBreadth, currentIndex)}
        >
          <div
            className={depth === 0 ? publicColumnContainerTitle : depth === 1 ? publicColumnContainerSection : depth === 2 ? publicColumnContainerDetail : publicColumnContainer} data-depthman={depth}
          >
            {currentContainerArr}
          </div>

          {depth < 2 ?
            <div className={publicColumnContainer}>
              {recursed}
            </div> : null
          }
          {highlightDetails}

        </div>
      </div>
    ];
  });
}

export default ({ resumeDetails }) => {
  const [hoverDepth, setHoverDepth] = useState(null);
  const [hoverBreadth, setHoverBreadth] = useState(null);

  const handleHover = (event, exit) => {
    if (exit === 'exit') {
      console.log('exit')
      setHoverDepth(null);
      setHoverBreadth(null);
      // setHoverDepth((existingHoverDepth) => {
      //   if (existingHoverDepth === 0) {
      //     return 0;
      //   } else if (existingHoverDepth === 1) {
      //     return 0;
      //   } else if (existingHoverDepth === 2) {
      //     return 1;
      //   } else if (existingHoverDepth === 3) {
      //     return 2;
      //   }
      //   return event.target.dataset.depthman
      // });

      return;
    }

    if (exit === 'prevSection') {
      setHoverDepth(1);
      setHoverBreadth((prevHoverBreadth) => {
        let update = Number(prevHoverBreadth.split('_')[0]) - 1;
        return `${update}_0`;
      });
    }

    if (exit === 'nextSection') {
      setHoverDepth(1);
      setHoverBreadth((prevHoverBreadth) => {
        let update = Number(prevHoverBreadth.split('_')[0]) + 1;
        return `${update}_0`
      })

      return;
    }

    const { target: { dataset: { depth, breadth, name } } } = event;

    if (depth) {
      setHoverDepth(Number(depth));
    }

    // hoverBreadth
    //Column One
    if (depth === '0') {
      setHoverBreadth(Number(breadth));
    }

    // Column Two
    if (depth === '1') {
      setHoverBreadth((prevHoverBreadth) => {
        if (typeof prevHoverBreadth === 'number') {
          return prevHoverBreadth + '_' + breadth;
        } else {
          let change = prevHoverBreadth.split('_');
          if (change.length === 3) {
            change.pop();
          } else {
            change.splice(1, 1, breadth)
          }

          return change.join('_');
        }
      })
    }

    if (depth === '2') {
      setHoverBreadth((prevHoverBreadth) => {
        let test = prevHoverBreadth.split('_');
        if (test.length === 2) {
          return prevHoverBreadth + '_' + breadth;
        } else {
          let change = prevHoverBreadth.split('_');
          change.splice(depth, 1, breadth);
          return change.join('_');
        }

      })
    }
    return Number(depth);
  }

  // let test = () => {
  //   let result = recurseContainers(resumeDetails, 0, hoverDepth, hoverBreadth, handleHover, 0);
  //   console.log(result.main)
  //   return result.main;
  // }
  return (
    <div>
      {recurseContainers(resumeDetails, 0, hoverDepth, hoverBreadth, handleHover, 0)}
    </div>
  )
}