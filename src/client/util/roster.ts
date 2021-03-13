export const courseName = (course: any): string => {
  if (!course) return ''
  return `${course.data.subject} ${course.data.catalogNbr}`
}

export const requirementCredits = (requirement: any): number => {
  if (!requirement) return 0
  if (requirement.assignedCourse) {
    return requirement.assignedCourse.enrollGroups[0].unitsMaximum
  } else {
    return requirement.credits
  }
}
