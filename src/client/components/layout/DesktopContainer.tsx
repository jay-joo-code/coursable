import React from 'react'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    width: 100%;
  }

  @media (min-width: ${(props) => props.theme.medium}) {
    & > div {
      width: 90%;
    }
  }

  // height
  height: ${(props) => props.height && props.height};
`

interface DesktopContainerProps {
  children: React.ReactNode
  height?: string
}

const DesktopContainer = ({ children, height }: DesktopContainerProps) => {
  return (
    <Container height={height}>
      <div>
        {children}
      </div>
    </Container>
  )
}

export default DesktopContainer
