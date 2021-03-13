import React from 'react'
import styled from 'styled-components'
import MajorSelector from './MajorSelector'
import { ReactComponent as IllustHome } from 'src/assets/illustrations/illust-home.svg'
import { FlexColumn, FlexRow, Space } from 'src/components/layout'
import Text from 'src/components/text'
import theme from 'src/app/theme'

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
`

const Illustration = styled(IllustHome)`
  width: 50%;
`

const New = () => {
  return (
    <Container>
      <Left>
        <Illustration />
      </Left>
      <Right
        ac
        jc
      >
        <Text variant='h3'>{'What\'s your major?'}</Text>
        <Space margin='1rem 0' />
        <MajorSelector />
      </Right>
    </Container>
  )
}

export default New
