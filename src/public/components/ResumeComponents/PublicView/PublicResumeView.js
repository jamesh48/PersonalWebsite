import React  from 'react';
import PublicContainers from './ResumeUIContainer';
import { useGlobalContext } from 'GlobalStore';

const PublicResumeView = (props) => {
  const [{ portrait, smallWindow, mobileBrowser  }] = useGlobalContext();

  return (
    <div className={((portrait && mobileBrowser) || (smallWindow && !mobileBrowser)) ? `resumeContainer resumeContainer--Mobile` : `resumeContainer`}>
      <h4 className='resumeContainerTitle'>Resume {/*resume.resume_Name*/}</h4>
      <PublicContainers {...props} />
    </div>
  )
};

export default PublicResumeView;