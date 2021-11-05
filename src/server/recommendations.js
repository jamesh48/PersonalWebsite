const { nubelaAPIToken, nubelaRoute } = process.env;

var axios = require("axios");

export const requestRecommendations = async () => {
  const config = {
    method: "GET",
    url: nubelaRoute,
    headers: {
      Authorization: `Bearer ${nubelaAPIToken}`,
    },
  };

  console.log(config)
  try {
    const { data: response } = await axios(config);
    return response.recommendations;
  } catch (err) {
    console.log(err)
    throw new Error();
  }
};
