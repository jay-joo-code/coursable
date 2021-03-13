import React from 'react'
import { IRequirementDoc } from 'src/types/requirement'
import CourseInfo from './CourseInfo'
import CourseSearch from './CourseSearch'

interface AssignSideWindowProps {
  requirement: IRequirementDoc | undefined
}

const AssignSideWindow = ({ requirement }: AssignSideWindowProps) => {
  const { course } = requirement || {}

  if (course) {
    return <CourseInfo
      assignedCourse={course}
      requirement={requirement}
    />
  }

  return <CourseSearch requirementId={requirement?._id} />
}

export default AssignSideWindow
