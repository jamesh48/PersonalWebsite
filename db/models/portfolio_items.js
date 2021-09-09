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

// [
//   {
//     "title": "Fjakeraven.com",
//     "imgUrl": "https://d1y3bjxf7c78hf.cloudfront.net/main/main-images/fec.jpg",
//     "cssStyles": {
//       "backgroundColor": "ivory",
//       "color": "black"
//     },
//     "github": [
//       {
//         "title": "Fjakeraven Proxy Server",
//         "link": "https://github.com/rpt26-fec-tianwen/james-proxy-server"
//       },
//       {
//         "title": "Product Details Service",
//         "link": "https://github.com/rpt26-fec-tianwen/james-service-1"
//       }
//     ]
//   },
//   {
//     "title": "steammop.app",
//     "cssStyles": {
//       "backgroundColor": "black",
//       "color": "ivory"
//     },
//     "imgUrl": "https://d1y3bjxf7c78hf.cloudfront.net/main/main-images/backendArchitecture.jpeg",
//     "github": [
//       {
//         "title": "Steammop.app Proxy Server",
//         "link": "https://github.com/rpt26-sdc-prototype/tim-proxy"
//       },
//       {
//         "title": "Steammop.app Reviews Service",
//         "link": "https://github.com/rpt26-sdc-prototype/tim-review-service"
//       },
//       {
//         "title": "Steammop.app Reviews Database",
//         "link": "https://github.com/rpt26-sdc-prototype/sdc-reviews-db"
//       },
//       {
//         "title": "Steammop.app App Server",
//         "link": "https://github.com/rpt26-sdc-prototype/app-server-1"
//       }
//     ]
//   },
//   {
//     "title": "Strava Results Generator",
//     "cssStyles": {
//       "backgroundColor": "ivory",
//       "color": "black"
//     },
//     "imgUrl": "https://d1y3bjxf7c78hf.cloudfront.net/main/main-images/Strava_Results_Generator.jpg",
//     "github": [
//       {
//         "title": "github",
//         "link": "https://github.com/jamesh48/Strava-Report-Generator"
//       }
//     ]
//   },
//   {
//     "title": "fullstackhrivnak.com",
//     "cssStyles": {
//       "backgroundColor": "ivory",
//       "color": "black"
//     },
//     "imgUrl": "https://d1y3bjxf7c78hf.cloudfront.net/main/main-images/GES.jpg",
//     "github": [
//       {
//         "title": "This website! (github)",
//         "link": "https://github.com/jamesh48/PersonalWebsite"
//       }
//     ]
//   }
// ]