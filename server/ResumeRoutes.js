const express = require('express');
const resume = express.Router();
const axios = require('axios');
const { getResume, patchResume, patchResumeX, patchActiveResume, postResume } = require('../db/resume_controllers.js');

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

// resume.patch('/resumeXP', async ({ query: patchParams }, res) => {
//   await patchResumeX(patchParams);
//   res.send('ok');
// });

resume.patch('/resumeXA', async ({ query: { resume_Name } }, res) => {
  const activated = await patchActiveResume(resume_Name);
  res.json(activated);
})
module.exports = resume;