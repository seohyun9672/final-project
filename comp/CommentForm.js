import { useState } from "react";
import axios from "axios";

export default function CommentForm({ channelId, setComments }) {
  const [text, setText] = useState("");
  const [commentId, setCommentId] = useState(null);


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

  return (
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
  );
}