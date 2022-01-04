import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../helpers/apiHandlerHelper';
import data from "../data.json"

export default apiHandler({
  get: getPortfolioData,
});

async function getPortfolioData(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json({
      message: 'success',
      portfolioData: data.portfolioData,
    });
  } catch (error) {
    console.log('Error: ' + error);
    res.status(400).json({
      message: "Couldn't get portfolio projects",
      portfolioData: [],
    });
  }
}
