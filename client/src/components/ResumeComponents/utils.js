import axios from 'axios';

export default {
  getResume: async (callback, activeResume) => {
    const { data } = await axios('/resumeX');
    return data;
    // callback(resume, resumeNames);

  },

  postResume: async (resume_Name) => {
    const { data: results } = await axios.post('/resumeX', null, { params: { resume_Name } });
    return results;
  },

  patchActiveResume: async (resume_Name) => {
    const { data: [active] } = await axios.patch('/resumeXA', null, { params: { resume_Name } })
    return active;

  },

  patchResume: async (patchers) => {
    patchers = JSON.stringify(patchers);

    const { data: patched } = await axios.patch('/resumeX', null, {
      params: { patchers }
    });
    return patched;
  },


}