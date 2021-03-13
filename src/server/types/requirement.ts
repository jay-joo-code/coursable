import { Document } from 'mongoose'
import { ICourseDoc } from './course'
import { IMajorDoc } from './major'

export type ISemesters = string[][]
export type ISemester = string[]

interface ILink {
  label: string
  href: string
}

export interface IRequirementDoc extends Document {
  name: string
  credits: number
  isFixedAssignment: boolean
  courseId?: number
  course?: ICourseDoc

  // requirement information (optional)
  description?: string
  links?: ILink[]
}
