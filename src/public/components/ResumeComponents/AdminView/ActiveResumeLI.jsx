import React, { useState } from 'react';


export default ({ index, resumeName, resumeCallback, patchActiveResumeCallback, resume }) => {
  const handleClick = ({ target: { value } }) => {
    if (value === 'Post New Resume') {
      const resume_Name = window.prompt('Enter New Resume Name');
      // Check if Cancel was clicked and prevent user from creating a resume with same name as the button :p
      if (resume_Name && resume_Name !== 'Post New Resume') {
        resumeCallback(resume_Name)
      }
    } else {
      // Patch Active Resume
      // Prevents Click Handler from sending patch request when highlighted link is clicked
      if (value !== resume.resume_Name) {
        resumeCallback(value)
      }
    }
  };

  const handleResumeLI = () => {
    return (
      <li>
        <input
          type='button'
          className={resumeName === resume?.resume_Name ? `resumeListLI activeResumeListLI` : `resumeListLI`}
          value={resumeName}
          onClick={handleClick}
        >
        </input>
      </li >
    )
  };

  return handleResumeLI();
};