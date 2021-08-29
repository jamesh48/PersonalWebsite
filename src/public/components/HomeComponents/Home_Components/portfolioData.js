require('dotenv').config({path: require('path').resolve('.env')});

module.exports = [
  {
    "title": 'Fjakeraven.com',
    "imgUrl": `${process.env.CLOUDFRONTLINK}/fec.png`,
    "cssStyles": {
      backgroundColor: 'ivory',
      color: 'black'
    },
    "github": [
      { title: 'Fjakeraven Proxy Server', link: 'https://github.com/rpt26-fec-tianwen/james-proxy-server' },
      { title: 'Product Details Service', link: 'https://github.com/rpt26-fec-tianwen/james-service-1' }
    ]
  },
  {
    "title": 'steammop.app',
    "cssStyles": {
      backgroundColor: 'black',
      color: 'ivory',
    },
    "imgUrl": `${process.env.CLOUDFRONTLINK}/backendArchitecture.jpeg`,
    "github": [
      {
        title: 'Steammop.app Proxy Server',
        link: 'https://github.com/rpt26-sdc-prototype/tim-proxy'
      },
      {
        title: 'Steammop.app Reviews Service',
        link: 'https://github.com/rpt26-sdc-prototype/tim-review-service'
      },
      {
        title: 'Steammop.app Reviews Database',
        link: 'https://github.com/rpt26-sdc-prototype/sdc-reviews-db'
      },
      {
        title: 'Steammop.app App Server',
        link: 'https://github.com/rpt26-sdc-prototype/app-server-1'
      },
    ],
  },
  {
    "title": 'Strava Results Generator',
    "cssStyles": {
      backgroundColor: 'ivory',
      color: 'black'
    },
    "imgUrl": `${process.env.CLOUDFRONTLINK}/Strava_Results_Generator.png`,
    "github": [
      { title: 'github', link: 'https://github.com/jamesh48/Strava-Report-Generator' },
    ],
  },
  {
    "title": 'fullstackhrivnak.com',
    "cssStyles": {
      backgroundColor: 'ivory',
      color: 'black'
    },
    "imgUrl": '',
    "github": [
      {
        title: 'This website! (github)',
        link: 'https://github.com/jamesh48/PersonalWebsite'
      }
    ]
  }
]