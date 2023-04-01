import { useSession, signIn, signOut } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
import styles from "../styles/Profile.module.css"

export default function Component() {
  const { data: session } = useSession()

  if (session) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div>
            <h1>Hello, {session.user.name}</h1>
          </div>
          <div>Signed in as {session.user.email}</div>
          <img src={session.user.image} className={styles.image} /> <br />
          <br />
        </div>
      </main>
    )
  }
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    //redirect to login page
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}