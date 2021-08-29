import path from 'path';
import express from 'express';

// const express = require('express');
const resume = express.Router();
// const axios = require('axios');
import axios from 'axios';
import resumePaths from '../../db/resume_controllers.js';
const { getResume, patchResume, patchResumeX, patchActiveResume, postResume } = resumePaths;

// const { getResume, patchResume, patchResumeX, patchActiveResume, postResume } = require('../db/resume_controllers.js');

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