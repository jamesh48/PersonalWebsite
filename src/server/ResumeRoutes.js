import path from 'path';
import express from 'express';
const resume = express.Router();
import axios from 'axios';

import { getResume, patchResume, patchResumeX, patchActiveResume, postResume } from 'Database/resume_controllers.js';

resume.get('/resumeX', async (req, res) => {
  const resumeData = await getResume();
  res.json(resumeData);
});

resume.post('/resumeX', async ({ query: { resume_Name } }, res) => {
  const createdResume = await postResume(resume_Name);
  res.json(createdResume);
})

resume.patch('/resumeX', async ({ query: patchParams }, res) => {
  const patched = await patchResume(patchParams);
  res.json(patched);
});

resume.patch('/resumeXA', async ({ query: { resume_Name } }, res) => {
  const activated = await patchActiveResume(resume_Name);
  res.json(activated);
})

export default resume;