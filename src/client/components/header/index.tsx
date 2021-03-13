import React from 'react'
import useIsMobile from 'src/hooks/useIsMobile'
import styled from 'styled-components'
import Auth from '../auth'
import { FlexRow } from '../layout'
import DesktopContainer from '../layout/DesktopContainer'
import Logo from '../logo'

const Container = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.border};
`

const Header = () => {
  return (
    <Container>
      <DesktopContainer>
        <FlexRow
          ac
          jsb
          fullWidth
          style={{ padding: '.5rem' }}
        >
          <Logo variant='brand' />
          <Auth />
        </FlexRow>
      </DesktopContainer>
    </Container>
  )
}

export default Header
