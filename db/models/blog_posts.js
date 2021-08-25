module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define(`user_logins`, {
    blogTitle: {
      type: DataTypes.STRING,
    },
    blogText: {
      type: DataTypes.STRING,
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
  return BlogPosts;
};