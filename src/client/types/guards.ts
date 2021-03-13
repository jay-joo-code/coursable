import { IRequirementDoc } from './requirement'

export function isRequirement(obj: any): obj is IRequirementDoc {
  return !obj.isPlaceholder
}
