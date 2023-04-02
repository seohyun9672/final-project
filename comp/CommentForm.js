import { useState } from "react";
import axios from "axios";

export default function CommentForm({ channelId, setComments }) {
  const [text, setText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`/api/channels/${channelId}/comments`, {
        text,
      });
      setComments((prevComments) => [...prevComments, res.data]);
      setText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Comments</h2>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Write a comment..."
      />
      <button type="submit" disabled={!text}>
        Post
      </button>
    </form>
  );
}