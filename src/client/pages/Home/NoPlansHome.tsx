import React from 'react'
import { Link } from 'react-router-dom'
import theme from 'src/app/theme'
import googleSignin from 'src/assets/services/google-signin@2x.png'
import { Button } from 'src/components/buttons'
import { HoriBar } from 'src/components/horiBar'
import { FlexColumn, Space } from 'src/components/layout'
import Text from 'src/components/text'
import useRouter from 'src/hooks/useRouter'

const NoPlansHome = () => {
  const router = useRouter()

  return (
    <FlexColumn
      alignCenter
      justifyCenter
    >
      <Text variant='h3'>There are no plans on this account</Text>
      <Space margin='.2rem 0' />
      <Text
        variant='p'
        color={theme.textMuted}
      >Get started with a new course plan</Text>
      <Space margin='1rem 0' />
      <Link to='/new'>
        <Button
          label='Get started'
          onClick={() => router.push('/new')}
          icon='right'
          iconSize='20px'
          isIconRightSide
        />
      </Link>
      <Space margin='1.5rem 0' />
      <HoriBar />
      <Space margin='1.5rem 0' />
      <Text variant='h3'>Not the right account?</Text>
      <Space margin='.2rem 0' />
      <Text
        variant='p'
        color={theme.textMuted}
      >Sign in with a different account</Text>
      <Space margin='1rem 0' />
      <Link to='/login'>
        <img srcSet={`${googleSignin} 2x`} />
      </Link>
    </FlexColumn>
  )
}

export default NoPlansHome
