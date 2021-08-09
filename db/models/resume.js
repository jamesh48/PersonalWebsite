module.exports = (sequelize, DataTypes) => {
  const ResumeDetails = sequelize.define(`resume_details`, {
    active: {
      type: DataTypes.BOOLEAN,
    },
    resume_Name: {
      type: DataTypes.STRING,
    },
    resume_Title: {
      type: DataTypes.STRING,
    },
    resume_Details: {
      type: DataTypes.JSONB,
    },
    createdAt: {
      type: DataTypes.STRING,
    },
    updatedAt: {
      type: DataTypes.STRING,
    }
  }, {
    timestamps: false
  });

  return ResumeDetails;
};