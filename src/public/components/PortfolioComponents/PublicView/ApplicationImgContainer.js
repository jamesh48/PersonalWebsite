import React, { useState, useEffect, useCallback, useReducer } from 'react';
import NestedGitHubLink from './NestedGithubLink.js';
import { handleContainerData } from './publicViewPortfolioUtils.js';
import { useGlobalContext } from 'GlobalStore';
import { usePortfolioContext } from 'PortfolioStore';
import { useNestedPortfolioContext } from 'NestedPortfolioStore';

export default ({ rowIndex, columnIndex }) => {
  const [{ mobileBrowser, smallWindow }] = useGlobalContext();
  const [{ outerContainerData }] = usePortfolioContext();
  const [{ hovered: [hoveredColumn, hoveredRow], nestedContainerData, nestedIndicator }, nestedPortfolioDispatch] = useNestedPortfolioContext();

  const { github, imgUrl, cssStyles: { backgroundColor } } = outerContainerData[rowIndex][columnIndex];

  useEffect(() => {
    if (rowIndex === hoveredColumn && columnIndex === hoveredRow) {
      nestedPortfolioDispatch({ type: 'TOGGLE NESTED INDICATOR', payload: true });
    } else {
      nestedPortfolioDispatch({ type: 'TOGGLE NESTED INDICATOR', payload: false });
    }
  }, [hoveredColumn, hoveredRow]);

  useEffect(() => {
    handleContainerData(
      github,
      mobileBrowser,
      smallWindow,
      'inner',
      nestedPortfolioDispatch
    );
  }, [smallWindow, mobileBrowser]);


  return (
    <div
      className='applicationImgContainer'
      onMouseLeave={
        nestedIndicator ? () => {
          nestedPortfolioDispatch(
            { type: 'SET HOVERED NULL' }
          )
        } : null}
      onMouseOver={!nestedIndicator ? () => {
        nestedPortfolioDispatch({
          type: 'SET HOVERED',
          payload: [rowIndex, columnIndex]
        })
      } : null}
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundColor: backgroundColor
      }}
    >

      {
        nestedIndicator ? nestedContainerData?.map((appRow, nestedRowIndex) => {
          return (
            <div className='nestedGithubRow' key={nestedRowIndex}>
              {
                appRow.map((nestedGithub, nestedColumnIndex) => {
                  return (
                    <NestedGitHubLink
                      key={nestedColumnIndex}
                      nestedRowIndex={nestedRowIndex}
                      nestedColumnIndex={nestedColumnIndex}
                      outerRowIndex={rowIndex}
                      outerColumnIndex={columnIndex}
                    />
                  );
                })
              }
            </div>
          )
        }) : null

      }

    </div>
  )
}