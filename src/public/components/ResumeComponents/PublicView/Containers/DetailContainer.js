import React from 'react';
import PublicDisplayContainer from '../PublicDisplayContainer';
import { useResumeContext } from 'ResumeStore';
import hFCN from '../handleFadingClassNames';


const DetailContainer = ({ detail, detailIndex, hoveredIndex, prevTitle, ind }) => {

  const [{ hoverParams: [hoverDepth, hoverBreadth], mobileBrowser }] = useResumeContext();

  return (
    <div className='resumeParentContainer'>
      <div className={ind ? '' : hFCN({
        existing: '',
        itrDepth: 2,
        hoverBreadth,
        hoverDepth,
        hoveredIndex,
        mobileBrowser,
        prevTitle,
      })}>
        <div className='publicColumnContainerDetail'>
          <PublicDisplayContainer
            key={detailIndex}
            displayItem={detail?.title || ''}
            breadth={hoveredIndex}
            depth={1}
          />
        </div>
      </div>
    </div>
  )
}

export default DetailContainer;
