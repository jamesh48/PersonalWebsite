const sequelize = require('../config/config.js');
const Promise = require('bluebird');
module.exports = {
  addPortfolioItem: () => {

  },

  getAllPortfolioItems: async () => {
    const { PortfolioItems } = sequelize.models;
    const items = await PortfolioItems.findAll({});
    return items;
  },

  patchPortfolio: async (updatingPatchParams) => {
    const { PortfolioItems } = sequelize.models;

    updatingPatchParams = JSON.parse(updatingPatchParams);
    updatingPatchParams = updatingPatchParams.data;

    const returningArr = Promise.map(updatingPatchParams, async (param, index) => {
      const { title, imgUrl, cssStyles } = param;

      let existingPortfolioItem = await PortfolioItems.findOne(
        { where: { id: (Number(index) + 1) } }
      );

      if (!existingPortfolioItem) {
        const newItem = await PortfolioItems.create({ title: title, imgUrl: imgUrl, cssStyles: cssStyles }, { returning: true });
        return newItem;
      } else {
        existingPortfolioItem.set({ "title": title, "imgUrl": imgUrl, cssStyles: cssStyles });
        const { dataValues: patched } = await existingPortfolioItem.save();
        return patched;
      }
    });

    return returningArr;
  }
};