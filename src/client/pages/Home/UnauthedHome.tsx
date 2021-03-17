import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import theme from 'src/app/theme'
import googleSignin from 'src/assets/services/google-signin@2x.png'
import { Button } from 'src/components/buttons'
import { HoriBar } from 'src/components/horiBar'
import { FlexColumn, Space } from 'src/components/layout'
import Text from 'src/components/text'
import useRouter from 'src/hooks/useRouter'
import { RootState } from 'src/types/redux'

const UnauthedHome = () => {
  const router = useRouter()

  // load pre-existing plan with persisted psid
  const { psid } = useSelector((state: RootState) => state.planState)
  useEffect(() => {
    if (psid) {
      router.push(`/plan/${psid}`)
    }
  }, [])

  return (
    <FlexColumn
      alignCenter
      justifyCenter
    >
      <Text variant='h3'>Welcome back!</Text>
      <Space margin='.2rem 0' />
      <Text
        variant='p'
        color={theme.textMuted}
      >Sign in to load your course plan</Text>
      <Space margin='1rem 0' />
      <Link to='/login'>
        <img srcSet={`${googleSignin} 2x`} />
      </Link>
      <Space margin='1.5rem 0' />
      <HoriBar />
      <Space margin='1.5rem 0' />
      <Text variant='h3'>Or is it your first time here?</Text>
      <Space margin='.2rem 0' />
      <Text
        variant='p'
        color={theme.textMuted}
      >Get started with Coursable!</Text>
      <Space margin='1rem 0' />
      <Button
        label='Get started'
        onClick={() => router.push('/new')}
        icon='right'
        iconSize='20px'
        isIconRightSide
      />
    </FlexColumn>
  )
}

export default UnauthedHome
