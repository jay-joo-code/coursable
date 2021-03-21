import React from 'react'
import { IRequirementDoc } from 'src/types/requirement'
import CourseInfo from './CourseInfo'
import CourseSearch from './CourseSearch'
import styled from 'styled-components'

interface CourseTabProps {
  requirement: IRequirementDoc | undefined
}

const Container = styled.div`
  padding: 1rem;
`

const CourseTab = ({ requirement }: CourseTabProps) => {
  const { course } = requirement || {}

  if (course) {
    return (
      <Container>
        <CourseInfo
          assignedCourse={course}
          requirement={requirement}
        />
      </Container>
    )
  }

  return (
    <Container>
      <CourseSearch requirementId={requirement?._id} />
    </Container>
  )
}

export default CourseTab
