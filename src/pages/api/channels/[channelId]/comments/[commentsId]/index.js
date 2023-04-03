import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { channelId, commentId } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const comments = await prisma.comment.findMany({
          where: { channelId: parseInt(channelId) },
        });
        res.status(200).json(comments);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to fetch comments." });
      }
      break;
    case "POST":
      try {
        const { text } = req.body;
        const comment = await prisma.comment.create({
          data: { text, channelId: parseInt(channelId) },
        });
        res.status(200).json(comment);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to create comment." });
      }
      break;
      case "PUT":
        try {
          const { text } = req.body;
          const comment = await prisma.comment.update({
            where: { id: parseInt(commentId) },
            data: { text },
          });
          res.status(200).json(comment);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Unable to update comment." });
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
          res.status(500).json({ error: "Unable to delete comment." });
        }
        break;
      default:
        res.status(405).end();
    
  }
}
