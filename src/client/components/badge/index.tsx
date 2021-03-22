import React from 'react'
import styled from 'styled-components'
import Text from '../text'

interface BadgeProps extends ContainerProps {
  label: string
  color: string
}

interface ContainerProps {
  background: string
}

const Container = styled.div<ContainerProps>`
  padding: .1rem .4rem;
  border-radius: 4px;
  display: inline-block;

  // background
  background-color: ${(props) => props.background && props.background};
`

const Badge = ({ label, color, background }: BadgeProps) => {
  return (
    <Container background={background}>
      <Text
        variant='h7'
        color={color}
        maxLines={1}
      >{label}</Text>
    </Container>
  )
}

export default Badge
