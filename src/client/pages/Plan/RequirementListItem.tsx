import React, { memo, useState } from 'react'

import { useRequirementById } from 'src/api/requirement'
import theme from 'src/app/theme'
import Icon from 'src/components/icon'
import { FlexRow, Space } from 'src/components/layout'
import Pill from 'src/components/pill'
import Text from 'src/components/text'
import styled from 'styled-components'
import SideWindow from './SideWindow'
import { Draggable } from 'react-beautiful-dnd'

interface RequirementListItemProps {
  requirementId: string
  row: number
  semesterNumber: number
}

const RelativeContainer = styled.div`
  position: relative;
`

const SVGOnHover = styled.div`
  opacity: 0;
`

const Container = styled(FlexRow)`
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  padding: 1rem .5rem 1rem 1rem;
  margin: .5rem 0;
  cursor: move;
  cursor: grab;
  background: white;
  box-shadow: 0;
  transition: box-shadow .2s ease-in-out;
  align-items: flex-start;
  justify-content: space-between;

  @media (min-width: ${(props) => props.theme.large}) {
    &:hover {
      box-shadow: ${(props) => props.theme.shadow};
    }
  }

  // isDragging
  border: ${(props) => (props.isDragging) && `2px solid ${props.theme.grey[600]}`};

  &:hover ${SVGOnHover} {
    opacity: 1;
  }
`

const SideWindowContainer = styled.div`
  position: absolute;
  top: 0;
  z-index: 2;
  right: -245px;

  // isAssigned
  right: ${(props) => props.isAssigned && '-305px'};
`

const RequirementListItem = ({ requirementId, row }: RequirementListItemProps) => {
  const { requirement } = useRequirementById(requirementId)
  const { name, course, courseId, isFixedAssignment } = requirement || {}
  const [isWindowOpen, setIsWindowOpen] = useState(false)
  const title = (isFixedAssignment || !courseId)
    ? name
    : `${course?.data.subject} ${course?.data.catalogNbr}`

  const handleClick = () => {
    setIsWindowOpen(true)
  }

  return (
    <Draggable
      key={requirementId}
      draggableId={requirementId}
      index={row}
    >
      {(provided, snapshot) => (
        <RelativeContainer>
          <Container
            style={provided.draggableProps.style}
            isDragging={snapshot.isDragging}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={handleClick}
          >
            <div>
              <Text
                variant='p'
                fontWeight={500}
              >{title}</Text>

              {/* has assigned course */}
              {course && (
                <Text
                  variant='h6'
                  fontWeight={400}
                  color={theme.textLight}
                >{course.data.titleShort}</Text>
              )}

              {/* unassigned */}
              {!course && (
                <>
                  <Space margin='.5rem 0' />
                  <Pill
                    label='Unassigned'
                    background={theme.brandBg}
                    color={theme.brand300}
                  />
                </>
              )}

              {(!isFixedAssignment && courseId && name) && (
                <>
                  <Space margin='.8rem 0' />
                  <Pill
                    label={name}
                    background={theme.info50}
                    color={theme.info300}
                  />
                </>
              )}
            </div>
            <SVGOnHover>
              <Icon
                variant='right'
                interactiveHover
              />
            </SVGOnHover>
          </Container>
          <SideWindowContainer isAssigned={courseId}>
            {isWindowOpen && (
              <SideWindow
                setIsWindowOpen={setIsWindowOpen}
                requirement={requirement}
              />
            )}
          </SideWindowContainer>
        </RelativeContainer>
      )}
    </Draggable>
  )
}

export default memo(RequirementListItem)
