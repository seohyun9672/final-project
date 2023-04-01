import { getAllChannels, createChannel } from "@/database";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      // Get all channels
      try {
        const channels = await getAllChannels();
        res.status(200).json(channels);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving channels" });
      }
      break;
    case "POST":
      // Create a new channel
      try {
        const { title } = req.body;
        const newChannel = await createChannel(title);
        res.status(201).json(newChannel);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating channel" });
      }
      break;
    default:
      res.status(405).end();
  }
}