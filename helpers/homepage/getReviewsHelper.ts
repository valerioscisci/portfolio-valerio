import env from '../../config/env';

const getReviewsHelper = async () => {
  const response = await fetch(`${env.API_BASE_URL}homepage/get-reviews`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  return data;
};

export default getReviewsHelper;
