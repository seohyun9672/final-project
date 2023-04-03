import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import styles from "../styles/Channels.module.css";
import Card from "../../comp/Card";
import CommentForm from "../../comp/CommentForm";

export default function Comment() {
  const [channel, setChannel] = useState(null);
  const router = useRouter();
  const { channelId } = router.query;
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [commentId, setCommentId] = useState(null);

  useEffect(() => {
    async function fetchChannelData() {
      try {
        const res = await axios.get(`/api/channels/${channelId}`);
        setChannel(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchComments() {
      try {
        const res = await axios.get(`/api/channels/${channelId}/comments`);
        setComments(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    if (channelId) {
      fetchChannelData();
      fetchComments();
    }
  }, [channelId]);


  const handleEditComment = async (commentId, newText) => {
    try {
      const res = await axios.patch(`/api/channels/${channelId}/comments/${commentId}`, {
        text: newText
      });
      setComments(comments.map((comment) => comment.id === commentId ? res.data : comment));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    console.log("Deleting comment with ID:", commentId);
    try {
      await axios.delete(`/api/channels/${channelId}/comments/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`/api/channels/${channelId}/comments`, {
        text,
        commentId,
      });
      setComments((prevComments) => [...prevComments, res.data]);
      setText("");
      setCommentId(null);
    } catch (error) {
      console.error(error);
    }
  };

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
          {comments.length === 0 ? (
            <div>No comments yet. Be the first to comment!</div>
          ) : (
            <div>
              {comments.map((comment) => (
                <div key={comment.id} className={styles.comment}>
                  <small>{comment.createdAt}</small>
                  <p>{comment.text}</p>
                  <div>
                    <button
                      className="button-primary"
                      onClick={() => handleEditComment(comment.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="button-primary"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <h2>Comments</h2>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Write a comment..."
            />
            <button className="button-primary" type="submit">
              Leave a comment
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
