require('dotenv').config({ path: require('path').resolve('.env') });
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  dialect: 'postgres',
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})()

const model = name => database.models[name];

const ResumeDetails = require(`../models/resume.js`)(sequelize, Sequelize.DataTypes);
const BlogPosts = require(`../models/blog_posts.js`)(sequelize, Sequelize.DataTypes);

module.exports = (database) = {
  sequelize: sequelize,
  models: { ResumeDetails, BlogPosts},
  model,
};