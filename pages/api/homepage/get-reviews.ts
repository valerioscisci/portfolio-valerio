import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../helpers/apiHandlerHelper';
import { promises } from 'fs';

export default apiHandler({
  get: getReviews,
});

async function getReviews(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = JSON.parse(await promises.readFile('db/data.json', 'utf8'));

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
