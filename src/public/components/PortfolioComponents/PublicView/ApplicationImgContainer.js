import React from "react";
import NestedGitHubLink from "./NestedGithubLink.js";
import { handleContainerData } from "./publicViewPortfolioUtils.js";
import { useGlobalContext } from "GlobalStore";
import { useNestedPortfolioContext } from "NestedPortfolioStore";

const ApplicationImgContainer = ({ rowIndex, columnIndex, appData }) => {
  const [{ mobileBrowser, smallWindow, portrait }] = useGlobalContext();
  const [
    {
      hovered: [hoveredColumn, hoveredRow],
      nestedContainerData,
      nestedIndicator,
    },
    nestedPortfolioDispatch,
  ] = useNestedPortfolioContext();

  const {
    github,
    imgUrl,
    cssStyles: { backgroundColor },
  } = appData

  React.useEffect(() => {
    if (rowIndex === hoveredColumn && columnIndex === hoveredRow) {
      nestedPortfolioDispatch({
        type: "TOGGLE NESTED INDICATOR",
        payload: true,
      });
    } else {
      nestedPortfolioDispatch({
        type: "TOGGLE NESTED INDICATOR",
        payload: false,
      });
    }
  }, [hoveredColumn, hoveredRow]);

  React.useEffect(() => {
    handleContainerData(
      github,
      mobileBrowser,
      smallWindow,
      "inner",
      nestedPortfolioDispatch,
    );
  }, [smallWindow, mobileBrowser]);

  let test = portrait ? nestedContainerData[0] : nestedContainerData[1];


  return (
    <div
      className="applicationImgContainer"
      onMouseLeave={
        nestedIndicator
          ? () => {
              nestedPortfolioDispatch({ type: "SET HOVERED NULL" });
            }
          : null
      }
      onMouseOver={
        !nestedIndicator
          ? () => {
              nestedPortfolioDispatch({
                type: "SET HOVERED",
                payload: [rowIndex, columnIndex],
              });
            }
          : null
      }
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundColor: backgroundColor,
      }}
    >
      {nestedIndicator
        ? test?.map((appRow, nestedRowIndex) => {
            return (
              <div className="nestedGithubRow" key={nestedRowIndex}>
                {appRow.map((nestedGithub, nestedColumnIndex) => {
                  return (
                    <NestedGitHubLink
                      key={nestedColumnIndex}
                      nestedRowIndex={nestedRowIndex}
                      nestedColumnIndex={nestedColumnIndex}
                      outerRowIndex={rowIndex}
                      outerColumnIndex={columnIndex}
                      outerData={appData}
                      nestedGithub={nestedGithub}
                    />
                  );
                })}
              </div>
            );
          })
        : null}
    </div>
  );
};

export default ApplicationImgContainer;
