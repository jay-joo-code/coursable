import React, { memo, useState } from 'react'

import { useRequirementById } from 'src/api/requirement'
import theme from 'src/app/theme'
import Icon from 'src/components/icon'
import { FlexRow, Space } from 'src/components/layout'
import Text from 'src/components/text'
import styled from 'styled-components'
import SideWindow from './SideWindow'
import { Draggable } from 'react-beautiful-dnd'
import Badge from 'src/components/badge'

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

interface ContainerProps {
  isDragging: boolean
  isError: boolean
}

const Container = styled(FlexRow)<ContainerProps>`
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  padding: .7rem .5rem .7rem .7rem;
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

  // isError
  /* border: ${(props) => props.isError && `1px solid ${props.theme.danger100}`}; */

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
  right: -310px;
`

const RequirementListItem = ({ requirementId, row }: RequirementListItemProps) => {
  const { requirement } = useRequirementById(requirementId)
  const { name, course, courseId, isFixedAssignment, description } = requirement || {}
  const [isWindowOpen, setIsWindowOpen] = useState(false)
  const title = (isFixedAssignment || !courseId)
    ? name
    : `${course?.data.subject} ${course?.data.catalogNbr}`

  const handleClick = () => {
    setIsWindowOpen(true)
  }

  if (!requirement) return null

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
            isError={!course}
          >
            <div>
              <Text
                variant='p'
                fontWeight={500}
              >{title}</Text>

              {/* course title */}
              {course && (
                <Text
                  variant='h6'
                  fontWeight={400}
                  color={theme.textLight}
                >{course.data.titleShort}</Text>
              )}

              {/* notes (description) */}
              {description && (
                <>
                  <Space margin='.5rem 0' />
                  <Text
                    variant='h6'
                    color={theme.textMuted}
                    maxLines={2}
                  >{description}</Text>
                </>
              )}

              {/* unassigned */}
              {!course && (
                <>
                  <Space margin='.5rem 0' />
                  <Badge
                    label='Course unassigned'
                    color={theme.danger500}
                    background={theme.danger50}
                  />
                </>
              )}

              {/* satisfies badge */}
              {(!isFixedAssignment && courseId && name) && (
                <>
                  <Space margin='.8rem 0' />
                  <Badge
                    label={`Satisfies: ${name}`}
                    color={theme.info500}
                    background={theme.info50}
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
          <SideWindowContainer>
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
