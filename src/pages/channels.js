import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import axios from 'axios';
import Head from 'next/head';
import styles from "../styles/Channels.module.css";
import Card from "../../comp/Card";
import CommentForm from '../../comp/CommentForm';

export default function Posts() {
  const [channel, setChannel] = useState(null);
  const router = useRouter();
  const { channelId } = router.query;

  useEffect(() => {
    async function fetchChannelData() {
      try {
        const res = await axios.get(`/api/channels/${channelId}`);
        setChannel(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    if (channelId) {
      fetchChannelData();
    }
  }, [channelId]);

  if (!channel) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{channel.title}</title>
        <meta name="author" content="Anna Jeong" />
        <meta property="og:title" content="Recipe Page" />
        <meta name="description" content="Recipe Detail" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/imgs/favicon.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <Card
            key={channel.id}
            title={channel.title}
            src={channel.img}
            servings={channel.servingSize}
            time={channel.totalTime}
            rating={channel.rating}
            ingredients={channel.ingredients}
            instructions={channel.instructions}
          />
            <CommentForm />
        </div>
      </main>
    </>
  );
}
