import React from 'react'
import OutsideClickListener from 'src/components/layout/OutsideClickListener'
import { IRequirementDoc } from 'src/types/requirement'
import styled from 'styled-components'
import AssignSideWindow from './AssignSideWindow'

interface SideWindowProps {
  setIsWindowOpen: (state: boolean) => void
  requirement: IRequirementDoc | undefined
}

const Container = styled.div`
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadow};
  background: white;
`

const SideWindow = ({ requirement, setIsWindowOpen }: SideWindowProps) => {
  return (
    <OutsideClickListener onOutsideClick={() => setIsWindowOpen(false)}>
      <Container >
        <AssignSideWindow requirement={requirement} />
      </Container>
    </OutsideClickListener>
  )
}

export default SideWindow
