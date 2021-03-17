import React from 'react'
import theme from 'src/app/theme'
import styled from 'styled-components'
import Icon from '../icon'
import { Space } from '../layout'

type IVariant = 'warning'

interface InfoBoxProps {
  children: React.ReactNode
  variant: IVariant
}

interface ContainerProps {
  variant: IVariant
}

const Container = styled.div<ContainerProps>`
  display: flex;
  width: 100%;
  border-radius: 8px;
  background: ${(props) => props.theme.warningLight};
  color: ${(props) => props.theme.warning};
  padding: 1rem;
`

const InfoBox = ({ variant, children }: InfoBoxProps) => {
  return (
    <Container variant={variant}>
      <Icon
        variant='warning'
        fill={theme.warning}
      />
      <Space margin='0 .5rem' />
      {children}
    </Container>
  )
}

export default InfoBox
