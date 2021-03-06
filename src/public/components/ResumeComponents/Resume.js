import React, { useState, useRef, useEffect } from 'react';
import utils from './utils.js';
import { ResumeStoreProvider } from './ResumeStore/resumeStore.js';
import { useGlobalContext } from 'GlobalStore';
const { getResume, patchResume, patchActiveResume, postResume } = utils;
import AdminResume from './AdminView/AdminResumeView.js';
import PublicResume from './PublicView/PublicResumeView.js';
import './resume.scss';
import './mobile-resume.scss';

const Resume = (props) => {
  const [{ admin }] = useGlobalContext();
  const [resume, setResume] = useState([]);
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

  return !admin && resume?.resume_Name ? (
    // Public View
    <ResumeStoreProvider>
      <PublicResume {...props} resume={resume} />
    </ResumeStoreProvider>
  ) : admin ? (
    <AdminResume
      resumeNames={resumeNames}
      resumeX={resume}
      patchResumeCallback={patchResumeCallback}
      patchActiveResumeCallback={patchActiveResumeCallback}
      postResumeCallback={postResumeCallback}
      resumeData={props.resumeData}
    />
  ) : null
};

export default Resume;