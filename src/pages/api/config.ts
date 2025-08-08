import type { NextApiRequest, NextApiResponse } from 'next';
import { runtimeConfig } from '@/config/runtime';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(runtimeConfig);
}
