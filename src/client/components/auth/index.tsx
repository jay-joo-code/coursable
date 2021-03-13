import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useCurrentUser } from 'src/api/user'
import googleSignin from 'src/assets/services/google-signin@2x.png'
import { RootState } from 'src/types/redux'
import Authed from './Authed'

const Auth = () => {
  const { accessToken } = useSelector((state: RootState) => state.authState)
  const { currentUser } = useCurrentUser()
  const userPhotoSrc = currentUser?.providerData?.photos[0]?.value

  if (accessToken && userPhotoSrc) {
    return <Authed userPhotoSrc={userPhotoSrc} />
  }

  return (
    <Link to='/login'>
      <img srcSet={`${googleSignin} 2x`} />
    </Link>
  )
}

export default Auth
