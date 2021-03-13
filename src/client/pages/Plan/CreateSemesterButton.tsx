import React from 'react'
import { useAddSemester } from 'src/api/plan'
import Icon from 'src/components/icon'
import useCurrentPsid from 'src/hooks/useCurrentPsid'
import styled from 'styled-components'

interface CreateSemesterButtonProps {
  semesterNumber: number
}

const IconContainer = styled.div`
  opacity: 0;

  position: absolute;
  margin: auto;
  top: 30px;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;

  & > div {
    border-radius: 50%;
    box-shadow: ${(props) => props.theme.shadow};
    background: ${(props) => props.theme.brandLight};
  }
`

const Button = styled.div`
  position: relative;

  width: 3px;
  background: ${(props) => props.theme.bg};
  height: 100%;
`

const Container = styled.div`
  padding: 0 .5rem;
  cursor: pointer;

  &:hover ${Button} {
    background: ${(props) => props.theme.brandLight};
  }

  &:hover ${IconContainer} {
    opacity: 1;
  }
`

const CreateSemesterButton = ({ semesterNumber }: CreateSemesterButtonProps) => {
  const psid = useCurrentPsid()
  const { addSemester } = useAddSemester(psid)
  const handleClick = () => {
    addSemester({ semesterNumber })
  }

  return (
    <Container onClick={handleClick}>
      <Button>
        <IconContainer>
          <Icon
            variant='add'
            fill='#fff'
            size='1.2rem'
          />
        </IconContainer>
      </Button>
    </Container>
  )
}

export default CreateSemesterButton
