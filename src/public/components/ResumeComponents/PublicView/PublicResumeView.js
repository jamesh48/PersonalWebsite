import React  from 'react';
import PublicContainers from './ResumeUIContainer';
import { useGlobalContext } from 'GlobalStore';

const PublicResumeView = (props) => {
  const [{ portrait  }] = useGlobalContext();

  return (
    <div className={portrait ? `resumeContainer resumeContainer--Mobile` : `resumeContainer`}>
      <h4 className='resumeContainerTitle'>Resume {/*resume.resume_Name*/}</h4>
      <PublicContainers {...props} />
    </div>
  )
};

export default PublicResumeView;