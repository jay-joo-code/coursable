import styled from 'styled-components'

export const HoriBar = styled.div`
  width: 70%;
  border-bottom: 1px solid ${(props) => props.theme.border};

  // width
  width: ${(props) => props.width && props.width};  
`
