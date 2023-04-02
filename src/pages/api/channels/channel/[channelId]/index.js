import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { channelId } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const channel = await prisma.channel.findUnique({
          where: { id: channelId },
        });
        res.status(200).json(channel);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to fetch channel' });
      }
      break;
    case "PUT":
      // Update a channel by id
      res
        .status(200)
        .json({
          message: `PUT request to /api/channels/${channelId} not implemented yet`,
        });
      break;
    case "DELETE":
      // Delete a channel by id
      res
        .status(200)
        .json({
          message: `DELETE request to /api/channels/${channelId} not implemented yet`,
        });
      break;
    default:
      res.status(405).end();
  }
}