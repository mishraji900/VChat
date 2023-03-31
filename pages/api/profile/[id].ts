import type { NextApiRequest, NextApiResponse } from 'next';

import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery, searchPostsQuery } from './../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const userId = req.query.userId as string | string[];

    const query = singleUserQuery(userId);
    const userVideosQuery = userCreatedPostsQuery(userId);
    const userLikedVideosQuery = userLikedPostsQuery(userId);
    const videosQuery = searchPostsQuery(userId);

    const user = await client.fetch(query);
    const userVideos = await client.fetch(userVideosQuery);
    const userLikedVideos = await client.fetch(userLikedVideosQuery);
    const videos = await client.fetch(videosQuery);

    const data = { user: user[0], userVideos, userLikedVideos, videos };

    res.status(200).json(data);
  }
}
