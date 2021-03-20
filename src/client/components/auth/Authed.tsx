import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { useCurrentUserPlans } from 'src/api/user'
import theme from 'src/app/theme'
import useCurrentPsid from 'src/hooks/useCurrentPsid'
import { IPlanDoc } from 'src/types/plan'
import styled from 'styled-components'
import Avatar from '../avatar'
import Icon from '../icon'
import { FlexRow, Space } from '../layout'
import Text from '../text'

interface AuthedProps {
  userPhotoSrc: string
}

const Container = styled(FlexRow)`
  align-items: center;
  cursor: pointer;
`

const StyledSubMenu = styled(Menu.SubMenu)`
  & svg {
    display: none !important;
  }
`

interface StyledMenuItemProps {
  highlight: boolean
}

const StyledMenuItem = styled(Menu.Item)<StyledMenuItemProps>`
  // highlight
  background: ${(props) => props.highlight && props.theme.brandBg};
`

const menu = (plans: (IPlanDoc[] | null | undefined), currentPsid: (string | undefined)) => (
  <Menu>
    <StyledSubMenu title='My plans'>
      {plans?.map((plan) => (
        <StyledMenuItem
          key={plan._id}
          highlight={plan.shortId === currentPsid}
        >
          <Link to={`/plan/${plan.shortId}`}>
            <Text
              variant='h6'
              fontWeight={plan.shortId === currentPsid ? 500 : 400}
            >{plan.major.name}</Text>
            <Text
              variant='h7'
              color={theme.textMuted}
              fontWeight={400}
            >{moment(plan.updatedAt).fromNow()}</Text>
          </Link>
        </StyledMenuItem>
      ))}
      <Menu.Item>
        <Link to='/new'>+ Add new plan</Link>
      </Menu.Item>
    </StyledSubMenu>
    <Menu.Item>
      <Link
        to='/new'
      >New plan</Link>
    </Menu.Item>
    <Menu.Item>
      <Link
        to='/logout'
        style={{ color: theme.danger }}
      >Logout</Link>
    </Menu.Item>
  </Menu>
)

const Authed = ({ userPhotoSrc }: AuthedProps) => {
  const { plans, refetch: refetchPlans } = useCurrentUserPlans()
  const currentPsid = useCurrentPsid()

  const handleClick = () => {
    refetchPlans()
  }

  return (
    <Dropdown
      overlay={menu(plans, currentPsid)}
      trigger={['click']}
      arrow
    >
      <Container onClick={handleClick}>
        <Avatar src={userPhotoSrc} />
        <Space margin='0 .1rem' />
        <Icon
          variant='down'
          size='1.5rem'
        />
      </Container>
    </Dropdown>
  )
}

export default Authed
