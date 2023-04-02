import { prisma } from '../../server/db/client';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Head from 'next/head';
import styles from "../styles/Posts.module.css";

export default function Posts(props) {

  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [posts, setPosts] = useState(props.posts)

  useEffect(() => {
    setPosts(props.posts)
  }, [props.posts])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post('/api/posts', { title, ingredients })
    setPosts([...posts, res.data])
  }

  return (<>
    <Head>
      <title>{title}</title>
      <meta name="author" content="Anna Jeong" />
      <meta property="og:title" content="Recipe Page" />
      <meta name="description" content="Recipe Detail" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/imgs/favicon.png" />
    </Head>
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Post a recipe</h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
          <input placeholder='enter your recipe' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea placeholder='enter recipe' value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
        {posts.map((post) => (
          <div className={styles.post} key={post.id}>
            <h2>{post.title}</h2>
            <hr></hr>
            <p>{post.ingredients}</p>
          </div>
        ))}
      </div>
    </main>
  </>
  )
}

export async function getServerSideProps() {
  const posts = await prisma.post.findMany()

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  }
}