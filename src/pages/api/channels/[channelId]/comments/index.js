import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { channelId } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const comments = await prisma.comment.findMany({
          where: { channelId: parseInt(channelId) },
        });
        res.status(200).json(comments);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to fetch comments for channel.' });
      }
      break;
    case "POST":
      const { text } = req.body;
      try {
        const comment = await prisma.comment.create({
          data: {
            text,
            channel: { connect: { id: parseInt(channelId) } },
          },
        });
        res.status(201).json(comment);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to create comment.' });
      }
      break;
    case "DELETE":
      try {
        const comment = await prisma.comment.delete({
          where: { id: parseInt(commentId) },
        });
        res.status(200).json(comment);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to delete comment.' });
      }
      break;
    case "PATCH":
      try {
        const { text } = req.body;
        const comment = await prisma.comment.update({
          where: { id: parseInt(commentId) },
          data: { text },
        });
        res.status(200).json(comment);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to update comment.' });
      }
      break;
    default:
      res.status(405).end();
  }
}