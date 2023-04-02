import { useState, useEffect } from 'react'

export default function CommentForm({ onSubmit }) {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ author, text });
    setAuthor("");
    setText("");
  };

  return <>
    <form className="form-comment" onSubmit={handleSubmit}>
      <h2>Add a Comment</h2>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        required
      />
      <button className="button-primary" type="submit">Leave a Comment</button>
    </form>
  </>
}