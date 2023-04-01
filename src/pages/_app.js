import SiteNavigation from '../../comp/SiteNavigation'
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <SiteNavigation />
      <Component {...pageProps} />
    </SessionProvider>
  )
}
