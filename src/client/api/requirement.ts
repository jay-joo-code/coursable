import useCustomMutation from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'
import { IRequirementDoc } from 'src/types/requirement'

export const fetchRequirementByIdConfg = (id) => ({
  url: `/public/requirement/${id}`,
  options: {
    refetchOnWindowFocus: false,
  }
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

// export const useCreateListing = <T>() => {
//   const { mutate: createListing, ...rest } = useCustomMutation<ListingDoc>({
//     url: '/private/listing',
//     method: 'post',
//     updateLocal: {
//       queryConfigs: [fetchMyListingsConfig()],
//       type: 'create',
//     },
//   })
//   return {
//     ...rest,
//     createListing,
//   }
// }

export const useUpdateRequirementById = (_id: string) => {
  const { mutate: updateRequirement, ...rest } = useCustomMutation<IRequirementDoc>({
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

// export const useDeleteListingById = (_id: string) => {
//   const { mutate: deleteListing, ...rest } = useCustomMutation<ListingDoc>({
//     url: `/private/task/${_id}`,
//     method: 'delete',
//     updateLocal: {
//       queryConfigs: [fetchMyListingsConfig()],
//       type: 'delete',
//     },
//   })
//   return {
//     ...rest,
//     deleteListing,
//   }
// }
