import { NextApiRequest, NextApiResponse } from "next";

let subscriptions: any[] = [];

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const subscription = req.body;
    subscriptions.push(subscription);
    res.status(201).json({});
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
