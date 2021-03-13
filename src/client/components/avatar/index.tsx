import React from 'react'
import styled from 'styled-components'

interface AvatarProps {
  src: string
}

const Container = styled.div`
  overflow: hidden;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  box-shadow: ${(props) => props.theme.shadow};
  cursor: pointer;
`

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Container>
      <Img src={src} />
    </Container>
  )
}

export default Avatar
