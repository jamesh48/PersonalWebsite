module.exports = (sequelize, DataTypes) => {
  const PortfolioItems = sequelize.define(`portfolio_items`, {
    title: {
      type: DataTypes.STRING,
    },
    imgUrl: {
      type: DataTypes.STRING,
    },
    cssStyles: {
      type: DataTypes.JSONB,
    },
    github: {
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
  return PortfolioItems;
};