import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Card from "../../comp/Card";
import RecipeForm from "../../comp/RecipeForm";

export default function Home() {
  const [channels, setChannels] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/channels");
        setChannels(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleAddChannel = async (channel) => {
    try {
      const res = await axios.post("/api/channels", channel);
      setChannels([...channels, res.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Find Recipes</title>
        <meta name="author" content="Anna Jeong" />
        <meta property="og:title" content="Home Page" />
        <meta name="description" content="Find Recipes App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/imgs/favicon.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.flexbox}>
            <h1>Find Recipes You Like</h1>
          </div>
          <div className={styles.catCont}>
            {channels.map((channel) => {
              return (
                <Card
                  key={channel.id}
                  title={channel.title}
                  src={channel.img}
                  servings={channel.servingSize}
                  time={channel.totalTime}
                  rating={channel.rating}
                  ingredients={channel.ingredients}
                  instructions={channel.instructions}
                  handleClick={() => {
                    router.push({
                      pathname: '/channels',
                      query: { channelId: channel.id },
                    });
                  }}
                />
              );
            })}
          </div>
          <RecipeForm onAdd={handleAddChannel} />
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    //redirect to login page
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
