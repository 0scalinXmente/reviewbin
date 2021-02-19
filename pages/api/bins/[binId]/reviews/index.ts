import {
  createReview,
  getReviewsFromBin,
} from './../../../../../src/api/reviews/reviewsController'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      await createReview(req, res)
      break
    case 'GET':
      await getReviewsFromBin(req, res)
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
