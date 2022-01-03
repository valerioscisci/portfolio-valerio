import env from '../../config/env';

const getPortfolioDataHelper = async () => {
  const response = await fetch(`${env.API_BASE_URL}portfolio/get-projects`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  return data;
};

export default getPortfolioDataHelper;
