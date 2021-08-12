
const sequelize = require('./config/config.js')
module.exports = {
  getResume: async () => {
    const { ResumeDetails } = sequelize.models;
    const resume = await ResumeDetails.findAll({
      where: { active: true },
      limit: 1
    });

    let resumeNames = await ResumeDetails.findAll({
      attributes: [
        'resume_Name'
      ],
      raw: true,
      order: ['id']
    });
    resumeNames = resumeNames.map((resume) => resume.resume_Name);

    return [resume, resumeNames];
  },

  postResume: async (resume_Name) => {
    try {
      const { ResumeDetails } = sequelize.models;

      // First Set Active To False
      await ResumeDetails.update(
        { active: false },
        {
          where: { active: true },
        }
      );

      // Create Resume Entry Along With setting Resume to Active
      const { dataValues: created } = await ResumeDetails.create({ resume_Name: resume_Name, active: true }, { returning: true });

      return created;
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  patchActiveResume: async (resume_Name) => {
    try {
      const { ResumeDetails } = sequelize.models;

      // First set active to false;
      await ResumeDetails.update(
        { active: false },
        { where: { active: true } }
      );

      // Then Update the new active;
      const [x, updated] = await ResumeDetails.update(
        { active: true },
        {
          where: { resume_Name: resume_Name },
          returning: true
        }
      );
      return updated;
    } catch (err) {
      throw err;
    }
  },

  patchResume: async ({ patchers }) => {
    try {
    patchers = JSON.parse(patchers);
      console.log(patchers)
    // // Updating General
    // try {
    const { ResumeDetails } = sequelize.models;
    //   await ResumeDetails.update(
    //     patchParams,
    //     { where: { active: true } }
    //   )
    // } catch (err) {
    //   throw err;
    // }

    // // Updating Technical Skills
    // new_Technical_Skills = JSON.parse(new_Technical_Skills); // {key: []} //

      let existing_Resume = await ResumeDetails.findOne(
        { where: { active: true } }
      )
      const { resume_Details } = existing_Resume;
      if (resume_Details === null) {
        existing_Resume.set({ "resume_Details": patchers })
        const { dataValues: patched } = await existing_Resume.save();
        return patched;
      } else {
        let existing = resume_Details;
        existing_Resume.set({ "resume_Details": patchers });
        const { dataValues: patched } = await existing_Resume.save();
        return patched;
      }
    } catch (err) {
      console.log(err)
      throw err;
    }
    //   Object.keys(new_Technical_Skills).forEach((skill) => {
    //     // Skill Set is no yet Defined
    //     if (!technical_Skills[skill]) {
    //       existing_Resume.set({ "technical_Skills": { ...technical_Skills, ...new_Technical_Skills } });
    //       // Skill set has contents, or is an empty array;
    //     } else {
    //       let existingArr = existing_Resume['technical_Skills'][skill];
    //       let incoming = new_Technical_Skills[skill];
    //       let updating = [...existingArr, ...incoming];
    //       new_Technical_Skills[skill] = updating;
    //       existing_Resume.set({ "technical_Skills": { ...technical_Skills, ...new_Technical_Skills } })
    //     }
    //   })

    //   await existing_Resume.save();
    //   return 'ok';
    // } catch (err) {
    //   console.log(err)
    //   return err;
    // }
  },

  // patchResume: async (patchParams) => {

  //   try {
  //     const { ResumeDetails } = sequelize.models;
  //     await ResumeDetails.update(
  //       patchParams,
  //       { where: { active: true } }
  //     )
  //     return 'ok';
  //   } catch (err) {
  //     throw err;
  //   }
  // },


}