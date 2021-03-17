import styled from 'styled-components'

interface HoriBarProps {
  width?: string
}

export const HoriBar = styled.div<HoriBarProps>`
  width: 70%;
  border-bottom: 1px solid ${(props) => props.theme.border};

  // width
  width: ${(props) => props.width && props.width};  
`
