import React, { memo } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { usePlanById, useUpdatePlanById } from 'src/api/plan'
import { FlexRow, Space } from 'src/components/layout'
import useCurrentPsid from 'src/hooks/useCurrentPsid'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'
import CreateSemesterButton from './CreateSemesterButton'
import RequirementList from './RequirementList'

interface SemesterListProps {
  semesters: string[][] | undefined
}

const WashBackground = styled.div`
  /* background: ${(props) => props.theme.grey[100]}; */
  background: white;
  overflow: hidden;
`

const Container = styled(FlexRow)`
  overflow: auto;
  height: 100%;
  padding: .5rem 0;

  & > div:first-child {
    padding-left: 1rem;
  }

  & > div:last-child {
    padding-right: 1rem;
  }
`

const reorder = (list: string[], startIndex: number, endIndex: number) => {
  const result = [...list]
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const moveBetweenLists = (source: string[], destination: string[], droppableSource: any, droppableDestination: any) => {
  const sourceClone = [...source]
  const destClone = [...destination]
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
}

const SemesterList = ({ semesters }: SemesterListProps) => {
  const psid = useCurrentPsid()
  const { updatePlan } = useUpdatePlanById(psid)

  const handleDragEnd = (result) => {
    const { source, destination } = result

    if (!destination || !semesters || !source.droppableId) {
      // dropped outside the list
      return
    }

    const sourceSemesterNumber = +source.droppableId
    const destSemesterNumber = +destination.droppableId

    // // filter out null requirements
    // const newSemesters = semesters.map((semester) => {
    //   return semester.filter((requirement) => requirement)
    // })

    const newSemesters = [...semesters]

    if (sourceSemesterNumber === destSemesterNumber) {
      // movement within the same list
      newSemesters[sourceSemesterNumber] = reorder(newSemesters[sourceSemesterNumber], source.index, destination.index)
    } else {
      // movement between different lists
      const result = moveBetweenLists(newSemesters[sourceSemesterNumber], newSemesters[destSemesterNumber], source, destination)
      newSemesters[sourceSemesterNumber] = result[sourceSemesterNumber]
      newSemesters[destSemesterNumber] = result[destSemesterNumber]
    }

    updatePlan({
      semesters: newSemesters,
    })
  }

  return (
    <WashBackground>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Container>
          <CreateSemesterButton semesterNumber={0} />
          {semesters?.map((semester, semesterNumber) => (
            <>
              <RequirementList
                key={semesterNumber + 1}
                semester={semester}
                semesterNumber={semesterNumber}
              />
              <CreateSemesterButton semesterNumber={semesterNumber} />
            </>
          ))}
        </Container>
      </DragDropContext>
    </WashBackground>
  )
}

export default memo(SemesterList)
