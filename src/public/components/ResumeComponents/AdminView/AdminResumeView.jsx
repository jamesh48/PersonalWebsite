import React, { useState, useEffect, useRef, Fragment } from 'react';
import exports from './domHandlers.jsx';
const { ResumeNameUL, AdminEditContainer, AdminDisplayContainer } = exports;

class Node {
  constructor(highlightDetail, condition, value, detail) {
    this.highlightDetail = highlightDetail,
      this.shown = condition,
      this.value = value,
      this.detail = detail
  }
}

export default ({ patchResumeCallback, patchActiveResumeCallback, postResumeCallback, resume, resumeNames,

  // style: { flexResumeContainer, flexResumeRow, solo, resumeNameUL, adminChildSection, adminResumeChildContainer, adminResumeChildSectionContainer, adminResumeChildDetailContainer, resumeClickers, resumeSectionHeader, resumeChildLabel, adminHighlightsRow, hollywoodHighlights }

}) => {
  const [editInputs, setEditInputs] = useState([]);
  const currentInputEl = useRef(null);

  // This sets state when a new or updated resume is pulled down
  useEffect(() => {
    setEditInputs((prevEditInputs) => {
      if (resume) {
        // No Resume Details Yet, Start Blank
        if (!resume.resume_Details) {
          prevEditInputs = [(new Node('', 'editing', '', []))];
          return prevEditInputs;
        } else {
          // Start Over blank
          prevEditInputs = [];
          // Then Populate...

          // Show Title
          prevEditInputs = resume.resume_Details.map(({ title: titleName, detail: titleDetails }, titleIndex) => {
            // Show Section
            return new Node('', true, titleName, titleDetails.map((section) => {
              //Show Detail
              return new Node(

                section.highlightDetail?.map((highlight, index, sectionHighlightArr) => {
                  return new Node(null, true, highlight?.title, [])
                }),

                true,
                section.title,
                section.detail.map((detail) => {
                  // Show Minor
                  return new Node('', true, detail?.title, detail?.detail.map((minor) => {
                    return new Node('', true, minor.title, []);
                  }));
                }))
            }))
          });
        }
      }
      return prevEditInputs;
    });
  }, [resume])

  const handleChange = ({ target: { parentNode: formNode, value, dataset: { parentdepth, parentbreadth, depth, breadth, temp } } }) => {
    const changeUpdate = new Node([], 'editing', value, []);
    if (depth === '4' || depth === '5') {
      setEditInputs((prevEditInputs) => {
        let breadthArr = parentbreadth.split('_')

        prevEditInputs[breadthArr[0]].detail[breadthArr[1]].highlightDetail[Number(breadth)] = changeUpdate;

        return [...prevEditInputs];
      })
      return;
    }

    setEditInputs((prevEditInputs) => {

      let breadthArr = [];
      // Depth === 0 (Title)
      if (typeof parentbreadth !== 'string') {

        if (!prevEditInputs[breadth]) {
          prevEditInputs[breadth] = changeUpdate;
        } else {
          prevEditInputs[breadth].shown = 'editing';
          prevEditInputs[breadth].value = value;
        }
      } else {
        // Depth > 0.
        breadthArr = parentbreadth.split('_');
        // Section
        if (breadthArr.length === 1) {
          if (!prevEditInputs[breadthArr[0]].detail[breadth]) {
            prevEditInputs[breadthArr[0]].detail[breadth] = changeUpdate;
          } else {
            prevEditInputs[breadthArr[0]].detail[breadth].shown = 'editing';
            prevEditInputs[breadthArr[0]].detail[breadth].value = value;
          }
          // Detail
        } else if (breadthArr.length === 2) {

          if (!prevEditInputs[breadthArr[0]].detail[breadthArr[1]].detail[breadth]) {
            prevEditInputs[breadthArr[0]].detail[breadthArr[1]].detail[breadth] = changeUpdate;
          } else {
            prevEditInputs[breadthArr[0]].detail[breadthArr[1]].detail[breadth].value = value;
            prevEditInputs[breadthArr[0]].detail[breadthArr[1]].detail[breadth].shown = 'editing';
          }
          // Minor
        } else {
          prevEditInputs[breadthArr[0]].detail[breadthArr[1]].detail[breadthArr[2]].detail[breadth] = changeUpdate;
        }
      }
      return [...prevEditInputs];

    });

  }

  const handleSubmit = ({ target: { parentNode: formNode, dataset: { parentbreadth, parentdepth, depth, breadth, name } } }) => {
    event.preventDefault();

    const patch = editInputs.map((input) => {
      return {
        "title": input.value,
        "detail": input.detail.map((section) => {
          return {
            "title": section.value,
            "highlightDetail": section?.highlightDetail?.map((highlightDetail) => {
              return highlightDetail.value !== '' ? {
                "title": highlightDetail.value
              } : null
            }).filter((x) => { return x && x.title }),
            "detail": section.detail.map((detail) => {
              return {
                "title": detail.value,
                "detail": [],
                // "detail": detail.detail.map((minor) => {
                //   return {
                //     "title": minor.value,
                //     "detail": []
                //   }
                // }).filter((x) => { return x && x.title })
              }
            })
          }
        }).filter((x) => { return x && x.title })
      };
    });
    return patchResumeCallback(patch);
  };

  const handleClick = ({ target: { parentNode: { dataset: { breadth, depth, parentbreadth } } } }) => {
    setEditInputs((prevEditInputs) => {
      if (depth === '0') {
        prevEditInputs[breadth].shown = 'editing';
        return [...prevEditInputs];
      }

      const breadthArr =  typeof parentbreadth === 'string' ? parentbreadth.split('_') : null;

      if (depth === '1') {
        prevEditInputs[parentbreadth].detail[breadth].shown = 'editing';
      }

      if (depth === '2') {
        prevEditInputs[breadthArr[0]].detail[breadthArr[1]].detail[breadth].shown = 'editing';
      }

      if (depth === '3') {
        prevEditInputs[breadthArr[0]].detail[breadthArr[1]].detail[breadthArr[2]].detail[breadth].shown = 'editing';
      }
      if (depth === '4') {
        prevEditInputs[breadthArr[0]].detail[breadthArr[1]].highlightDetail[breadth].shown = 'editing';
      }
      if (depth === '5') {
        prevEditInputs[breadthArr[0]].detail[breadthArr[1]].highlightDetail[Number(breadth) + 1].shown = 'editing'
      }
      return [...prevEditInputs];
    })
  }


  const handleDisplayed = (inputArr) => {
    let temp = inputArr.slice(0);

    let createDepthData = (resultArr, temp) => {
      for (let i = 0; i < temp.length; i++) {
        let currentObj = {};
        if (temp[i]?.shown === true || temp[i].shown === 'editing') {
          currentObj.value = temp[i].value;
          currentObj.shown = temp[i].shown;
          currentObj.breadth = i;

          if (temp[i].highlightDetail?.length) {
            currentObj.highlightDetail = [];
            for (let x = 0; x < temp[i].highlightDetail.length; x++) {
              currentObj.highlightDetail.push(
                {
                  value: temp[i].highlightDetail[x].value,
                  shown: temp[i].highlightDetail[x].shown
                }
              )
            }
          }
          resultArr.push(currentObj);
          if (temp[i].detail?.length > 0) {
            currentObj.detail = createDepthData([], temp[i].detail);
          }
        }
      }
      return resultArr;
    }

    let provisional = createDepthData([], temp);

    const recurseContainers = (currentContainerData, depth, prevBreadth) => {
      let carePackage = [];
      return currentContainerData.length ? currentContainerData.map((currentItem, currentIndex, inputArr) => {
        let currentContainerArr = [];
        let next;
        // Push in the Displayed Item
        if (currentItem.shown === true) {
          currentContainerArr.push(
            <AdminDisplayContainer
              depth={depth}
              breadth={currentIndex}
              parentBreadth={prevBreadth}
              handleClick={handleClick}
              displayItem={currentItem.value}
            />
          )
        } else if (currentItem.shown === 'editing') {
          currentContainerArr.push(
            <AdminEditContainer
              temp={currentItem.value}
              depth={depth}
              parentBreadth={prevBreadth}
              breadth={currentItem.breadth}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          )
        }


        // If its the last item in the column, add an edit container (breadth)
        if (!inputArr[currentIndex + 1] && currentItem.shown !== 'editing') {
          let parentBreadth;

          if (depth === 0) {
            parentBreadth = null;
            next = currentItem.breadth;
          } else if (depth === 1) {
            parentBreadth = prevBreadth
            next = parentBreadth + '_' + currentItem.breadth
          } else {
            parentBreadth = prevBreadth;
            next = parentBreadth + '_' + currentItem.breadth;
          }


          if (depth === 1) {
            carePackage.push(
              <AdminEditContainer
                depth={depth}
                parentBreadth={parentBreadth}
                breadth={currentItem.breadth + 1}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            )
          } else {
            currentContainerArr.push(
              <AdminEditContainer
                depth={depth}
                parentBreadth={parentBreadth}
                breadth={currentItem.breadth + 1}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            )
          }
        }


        let recursed = [];

        // If there are no children add an edit input in the depth + 1 field
        if (!currentItem.detail || !currentItem.detail.length) {
          if (depth < 2) {
            const parentBreadth = (depth + 1 === 1) ? currentItem.breadth : `${prevBreadth}_${currentItem.breadth}`;

            if (currentItem.shown !== 'editing') {
              recursed.push(
                <AdminEditContainer
                  parentBreadth={parentBreadth}
                  depth={depth + 1}
                  breadth={0}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                />
              );
            }
          }
        } else {
          // if there are children, recurse
          next = typeof prevBreadth === 'number' || typeof prevBreadth === 'string' ? (prevBreadth + '_' + currentItem.breadth) : currentItem.breadth;
          recursed = recurseContainers(currentItem.detail, depth + 1, next);
        }

        return (
          <>
            <div className={depth !== 0 ? 'columnRow' : `${'columnRow'} ${'parentColumnRow'}`}>

              <div className={`${'columnContainer'} ${depth === 0 ? 'columnContainerTitle' : depth === 1 ? 'columnContainerSection' : depth === 2 ? 'columnContainerDetail' : null}`}>
                {currentContainerArr}
              </div>
              {recursed.length > 0 ?
                <div className={`${'columnContainer'}`}>
                  {recursed}
                </div> : null
              }
            </div>


            {/* This adds highlights rows after each section */}
            {depth === 1 ?
              <div className={'hollywoodHighlights'}>
                {currentItem?.highlightDetail && currentItem.highlightDetail[0]?.shown === true ?
                  (
                    <AdminDisplayContainer
                      depth={4}
                      breadth={0}
                      parentBreadth={prevBreadth + '_' + currentItem.breadth}
                      handleClick={handleClick}
                      displayItem={currentItem.highlightDetail[0].value}
                    />
                  )
                  : inputArr[currentIndex + 1] || inputArr[currentIndex].shown === true ?
                    // :
                    (
                      <AdminEditContainer
                        depth={4}
                        parentBreadth={prevBreadth + '_' + currentItem.breadth}
                        breadth={0}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                      />
                    )
                    : null
                }
                <div className={`adminHighlightsRow`}>
                  {
                    currentItem.highlightDetail?.length > 1 ?
                      currentItem.highlightDetail?.slice(1).map((highlights, highlightIndex, highlightArr) => {
                        return (
                          <>

                            {
                              highlights.shown === true && !highlightArr[highlightIndex + 1] ?
                                // There is a highlight but it is the last highlight
                                [<AdminDisplayContainer
                                  depth={5}
                                  breadth={highlightIndex}
                                  parentBreadth={prevBreadth + '_' + currentItem.breadth}
                                  handleClick={handleClick}
                                  displayItem={highlights.value}
                                />,
                                <AdminEditContainer
                                  depth={5}
                                  parentBreadth={prevBreadth + '_' + currentItem.breadth}
                                  breadth={highlightIndex + 2}
                                  handleChange={handleChange}
                                  handleSubmit={handleSubmit}
                                />
                                ] :
                                // There is a highlight, that is not the last highlight
                                highlights.shown === true ?
                                  <AdminDisplayContainer
                                    depth={5}
                                    breadth={highlightIndex}
                                    parentBreadth={prevBreadth + '_' + currentItem.breadth}
                                    handleClick={handleClick}
                                    displayItem={highlights.value}
                                  />
                                  :
                                  // There is a highlight set to editing
                                  highlights.shown === 'editing'
                                    ?
                                    <AdminEditContainer
                                      depth={5}
                                      temp={highlights.value}
                                      parentBreadth={prevBreadth + '_' + currentItem.breadth}
                                      breadth={highlightIndex + 1}
                                      handleChange={handleChange}
                                      handleSubmit={handleSubmit}
                                    />
                                    :

                                    <AdminEditContainer
                                      depth={5}
                                      temp={highlights.value}
                                      parentBreadth={prevBreadth + '_' + currentItem.breadth}
                                      breadth={highlightIndex + 1}
                                      handleChange={handleChange}
                                      handleSubmit={handleSubmit}
                                    />
                            }
                          </>
                        );
                      })
                      : currentItem.highlightDetail?.length === 1 && currentItem.highlightDetail[0].shown === true ?
                        <AdminEditContainer
                          depth={5}
                          // temp={highlights.value}
                          parentBreadth={prevBreadth + '_' + currentItem.breadth}
                          breadth={1}
                          handleChange={handleChange}
                          handleSubmit={handleSubmit}
                        />
                        : currentItem.highlightDetail?.length === 0 ?
                          <AdminEditContainer
                            depth={4}
                            // temp={highlights.value}
                            parentBreadth={prevBreadth + '_' + currentItem.breadth}
                            breadth={1}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                          />
                          : null
                  }
                </div>
              </div>
              : null
            }
          </>
        )
        // This adds a highlight row under the + 1 breadth edit
      }).concat(carePackage)

        // .concat(depth === 2  ?
        //   <div className={adminHighlightsRow}>
        //     {[...inputArr[inputArr.length - 1].highlightDetail].map((x, highlightIndex) => {

        //       if (highlightIndex === 0) {
        //         (
        //           <AdminEditContainer
        //             depth={4}
        //             breadth={highlightIndex}
        //             parentBreadth={prevBreadth + '_' + (inputArr.length - 1)}
        //             style={style}
        //             handleChange={handleChange}
        //             handleSubmit={handleSubmit}
        //           />
        //         )
        //       } else {
        //         return (
        //           <AdminEditContainer
        //             depth={5}
        //             parentBreadth={prevBreadth + '_' + (inputArr.length - 1)}
        //             breadth={highlightIndex}
        //             style={style}
        //             handleChange={handleChange}
        //             handleSubmit={handleSubmit}
        //           />
        //         )
        //       }
        //     })}
        //   </div>
        //   : null)
        : (
          // Displays if there is no info
          <AdminEditContainer
            depth={0}
            breadth={0}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        );
      return resultContainers
    }

    let displayContainers = recurseContainers(provisional, 0, null);

    return displayContainers;
  }

  return (
    <div>
      <ResumeNameUL resume={resume} postResumeCallback={postResumeCallback} patchActiveResumeCallback={patchActiveResumeCallback} resumeNames={resumeNames} />
      <div className={'flexResumeContainer'}>
        {handleDisplayed(editInputs)}
      </div>
    </div>
  );
};