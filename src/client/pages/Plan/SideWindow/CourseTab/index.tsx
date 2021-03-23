import React from 'react'
import { IRequirementDoc } from 'src/types/requirement'
import CourseInfo from './CourseInfo'
import { useUpdateRequirementById } from 'src/api/requirement'
import CourseSearch from 'src/components/courseSearch'
import styled from 'styled-components'

interface CourseTabProps {
  requirement: IRequirementDoc | undefined
}

const Container = styled.div`
  padding: 1rem;
`

const CourseTab = ({ requirement }: CourseTabProps) => {
  const { course } = requirement || {}

  const { updateRequirement } = useUpdateRequirementById(requirement?._id)

  const handleClickCourse = (courseData) => {
    updateRequirement({
      courseId: courseData.crseId,
      course: { data: courseData },
    })
  }

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
      <CourseSearch handleClickCourse={handleClickCourse} />
    </Container>
  )
}

export default CourseTab
