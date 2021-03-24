import React, { memo } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import theme from 'src/app/theme'
import { FlexRow, Space } from 'src/components/layout'
import Text from 'src/components/text'
import { ISemester } from 'src/types/requirement'
import styled from 'styled-components'
import RequirementListItem from './RequirementListItem'
import RequirementListMenu from './RequirementListMenu'

interface RequirementListProps {
  semester: ISemester
  semesterNumber: number
}

const Wrapper = styled.div`
`

interface ContainerProps {
  isDraggingOver: boolean
}

const Container = styled.div<ContainerProps>`
  padding: 1rem;
  margin: 0 .5rem;
  width: 240px;
  background: ${(props) => props.theme.grey[100]};
  border-radius: 8px;

  // isDraggingOver
  background: ${(props) => props.isDraggingOver && props.theme.brandBg};
`

const RequirementList = ({ semester, semesterNumber }: RequirementListProps) => {
  const heading = semesterNumber === 0
    ? 'Transfer Credits'
    : `Semester ${semesterNumber}`

  return (
    <Droppable
      key={semesterNumber}
      droppableId={semesterNumber.toString()}
    >
      {(provided, snapshot) => (
        <Wrapper>
          <Container
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            <FlexRow
              justifySpaceBetween
              alignStart
            >
              <div>
                <Space margin='.2rem 0' />
                <Text
                  variant='h5'
                  fontWeight={500}
                  color={theme.textLight}
                >{heading}</Text>
                {/* <Text
                  variant='h6'
                  color={theme.textMuted}
                  fontWeight={400}
                >{totalCredits} credits</Text> */}
              </div>
              <RequirementListMenu
                semesterNumber={semesterNumber}
              />
            </FlexRow>
            <Space margin='1rem 0' />
            {semester.map((requirementId, row) => (
              <RequirementListItem
                key={requirementId}
                requirementId={requirementId}
                row={row}
                semesterNumber={semesterNumber}
              />
            ))}
            {provided.placeholder}
          </Container>
        </Wrapper>
      )}
    </Droppable>
  )
}

export default memo(RequirementList)
