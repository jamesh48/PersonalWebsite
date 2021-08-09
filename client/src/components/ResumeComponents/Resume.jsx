import React, { useState, useRef, useEffect } from 'react';
import utils from './utils.js';
const { getResume, patchResume, patchActiveResume, postResume } = utils;
import AdminResume from './AdminView/AdminResumeView.jsx';
import PublicResume from './PublicView/PublicResumeView.jsx';
import Mouse from './PublicView/mouseMove.jsx';
import Education from './children/Education.jsx';
import WorkExperience from './children/WorkExperience.jsx';
import style from './resume.scss';

export default ({ globalStyles: { container }, admin }) => {
  const [resume, setResume] = useState(null);
  const [resumeNames, setResumeNames] = useState([]);
  const mounted = useRef(true);

  // Use Effect For Getting Resume
  useEffect(async () => {
    mounted.current = true;
    if (resumeNames.length > 0) {
      return;
    }

    const [[returningResume], returningResumeNames] = await getResume();
    if (mounted.current) {
      setResume(returningResume);
      setResumeNames(returningResumeNames);
    }

    return () => mounted.current = false;
  }, []);

  const postResumeCallback = async (resumeParams) => {
    const newResume = await postResume(resumeParams);
    setResume(newResume);
    setResumeNames((prevResumeNames) => {
      return [...prevResumeNames, newResume.resume_Name];
    })
  }

  const patchResumeCallback = async (patchParameters) => {
    const patched = await patchResume(patchParameters);
    setResume(patched);
  }

  const patchActiveResumeCallback = async (resume_Name) => {
    const activated = await patchActiveResume(resume_Name);
    setResume(activated);
  }

  const handleView = () => {
    if (!admin) {
      return resume?.resume_Name ? (
        // Public View
        <PublicResume style={style} resume={resume} />
      ) : null;
    } else {
      return (
        <AdminResume style={style} resumeNames={resumeNames} resume={resume} patchResumeCallback={patchResumeCallback} patchActiveResumeCallback={patchActiveResumeCallback} postResumeCallback={postResumeCallback} />
      )
    }
  }
  return (
    <div id='resume-root'>
      {handleView()}
    </div>
  )
}