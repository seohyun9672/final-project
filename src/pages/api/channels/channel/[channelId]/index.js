import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { channelId } = req.query;

  switch (req.method) {
    case "GET":
      // Get a single channel by ID
      const channel = await prisma.channel.findUnique({
        where: { id: parseInt(channelId) },
      });
      if (!channel) {
        res.status(404).json({ message: "Channel not found" });
        break;
      }
      res.status(200).json(channel);
      break;
    case "PUT":
      // Update a channel by ID
      const updatedProperties = req.body;
      const updatedChannel = await prisma.channel.update({
        where: { id: parseInt(channelId) },
        data: updatedProperties,
      });
      res.status(200).json(updatedChannel);
      break;
    case "DELETE":
      // Delete a channel by ID
      const deletedChannel = await prisma.channel.delete({
        where: { id: parseInt(channelId) },
      });
      res.status(200).json(deletedChannel);
      break;
    default:
      res.status(405).end();
  }
}