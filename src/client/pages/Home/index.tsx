import React from 'react'
import { useCurrentUser, useCurrentUserPlans } from 'src/api/user'
import { ReactComponent as IllustHome } from 'src/assets/illustrations/illust-home.svg'
import { FlexColumn, FlexRow, Space } from 'src/components/layout'
import Text from 'src/components/text'
import useIsMobile from 'src/hooks/useIsMobile'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'
import NoPlansHome from './NoPlansHome'
import SelectPlanHome from './SelectPlanHome'
import UnauthedHome from './UnauthedHome'

const Container = styled(FlexRow)`

`

const Left = styled.div`
  flex: 1;
  background: ${(props) => props.theme.brandBg};
  display: flex;
  justify-content: center;
  align-items: center;
`

const Right = styled(FlexColumn)`
  flex: 1;

  & > div {
    height: 100%;
  }
`

const Illustration = styled(IllustHome)`
  width: 50%;
`

const Home = () => {
  const isMobile = useIsMobile()
  const { currentUser } = useCurrentUser()
  const { plans } = useCurrentUserPlans()
  const router = useRouter()

  const getComponent = () => {
    if (!currentUser) return <UnauthedHome />
    else {
      if (plans?.length === 0) {
        // no plans on this account
        return <NoPlansHome />
      } else if (plans?.length === 1) {
        // only 1 plan on this account
        // redirect to the single plan
        router.push(`/plan/${plans[0].shortId}`)
      } else {
        // multiple plans on this account
        // choose which plan to redirect to
        return <SelectPlanHome />
      }
    }
  }

  if (isMobile) {
    return (

    <FlexColumn ac>
      <Space margin='.5rem 0' />
      <Text
        variant='p'
        style={{ textAlign: 'center' }}
      >CourseFlow is currently not avilable on mobile devices</Text>
    </FlexColumn>
    )
  }

  return (
    <Container>
      <Left>
        <Illustration />
      </Left>
      <Right>
        {getComponent()}
      </Right>
    </Container>
  )
}

export default Home
