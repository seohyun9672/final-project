
import { useRouter } from 'next/router'
import { PlusIcon } from '@heroicons/react/24/outline'

import { useSession, signIn, signOut } from "next-auth/react"

export default function SiteNavigation() {

  const router = useRouter();

  const { data: session } = useSession()

  if (session) {
    return (
      <div className='navbar'>
        <div className='navbar-container'>
          <img className='logo' src='/imgs/logo.svg' onClick={() => router.push("/")} />
          <div className='navbar-btncont'>
            <button className='navbar-button' onClick={signIn}>Sign Out</button>
            <button className='navbar-button' onClick={() => router.push("/profile")}>Profile</button>
            <div className='icon-button'>
            <PlusIcon width={20} />
              <button
                onClick={() => router.push("/posts")
                }>Add your own recipe</button>
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}