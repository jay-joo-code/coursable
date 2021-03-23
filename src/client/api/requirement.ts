import useCustomMutation from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'
import { IRequirementDoc } from 'src/types/requirement'

export const fetchRequirementByIdConfg = (id) => ({
  url: `/public/requirement/${id}`,
  options: {
    refetchOnWindowFocus: false,
  },
})

export const useRequirementById = (id) => {
  const { data: requirement, ...rest } = useCustomQuery<IRequirementDoc>(fetchRequirementByIdConfg(id))
  return {
    ...rest,
    requirement,
  }
}

// export const useListingById = (lid: string) => {
//   const { data: listing, ...rest } = useCustomQuery<ListingDoc>(fetchListingByIdConfig(lid))
//   return {
//     ...rest,
//     listing,
//   }
// }

export const useCreateRequirement = () => {
  const { mutateAsync: createRequirement, ...rest } = useCustomMutation<IRequirementDoc>({
    url: '/public/requirement',
    method: 'post',
  })
  return {
    ...rest,
    createRequirement,
  }
}

export const useUpdateRequirementById = (_id: string) => {
  const { mutateAsync: updateRequirement, ...rest } = useCustomMutation<IRequirementDoc>({
    url: `/public/requirement/${_id}`,
    method: 'put',
    updateLocal: {
      queryConfigs: [fetchRequirementByIdConfg(_id)],
      mutationFn: (oldVariables, newVariables) => {
        return {
          ...oldVariables,
          ...newVariables,
        }
      },
    },
  })
  return {
    ...rest,
    updateRequirement,
  }
}

export const useDeleteRequirementById = (_id: string) => {
  const { mutateAsync: deleteRequirement, ...rest } = useCustomMutation<IRequirementDoc>({
    url: `/public/requirement/${_id}`,
    method: 'delete',
  })
  return {
    ...rest,
    deleteRequirement,
  }
}
