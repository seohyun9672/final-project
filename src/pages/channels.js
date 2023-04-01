
import { PrismaClient } from '@prisma/client';
import { useState, useEffect } from 'react'

// const prisma = new PrismaClient();

export default function Home(props) {
  const [channels, setChannels] = useState(props.channels);

  useEffect(() => {
    setChannels(props.channels);
  }, [props.channels]);

  return (
    <div>
      <h1>Home</h1>
      {Array.isArray(channels) && channels.map((channel) => (
        <div key={channel.id}>
          <h2>{channel.title}</h2>
        </div>
      ))}
    </div>
  )
}