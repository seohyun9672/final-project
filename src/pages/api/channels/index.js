import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const channels = await prisma.channel.findMany({
          select: {
            id: true,
            title: true,
            img: true
          },
        });
        res.status(200).json(channels);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
      break;
    
    //create new channels
    case 'POST':
      const channelData = req.body;
      try {
        const newChannel = await prisma.channel.create({
          data: channelData,
        });
        res.status(201).json(newChannel);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
      break;
    default:
      res.status(405).end();
  }
}