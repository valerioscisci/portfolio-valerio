import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../helpers/apiHandlerHelper';
import { promises } from 'fs';

export default apiHandler({
  get: getPortfolioData,
});

async function getPortfolioData(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = JSON.parse(await promises.readFile('./db/data.json', 'utf8'));

    res.status(200).json({
      message: 'success',
      portfolioData: data.portfolioData,
    });
  } catch (error) {
    console.log('Error: ' + error);
    res.status(400).json({
      message: "Couldn't get user proposals",
      portfolioData: [],
    });
  }
}
