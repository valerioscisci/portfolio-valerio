import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../helpers/apiHandlerHelper';
import data from '../data.json';

export default apiHandler({
  get: getReviews,
});

async function getReviews(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json({
      message: 'success',
      reviews: data.reviews,
    });
  } catch (error) {
    console.log('Error: ' + error);
    res.status(400).json({
      message: "Couldn't get reviews",
      reviews: [],
    });
  }
}
