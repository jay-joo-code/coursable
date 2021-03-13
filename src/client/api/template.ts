import { ITemplateDoc } from 'src/types/template'
import useCustomMutation from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'

export const fetchTemplateByMajorIdConfig = (majorId) => ({
  url: `/public/template/major/${majorId}`,
  enabled: false,
})

export const useTemplateByMajorId = (majorId: (string | null)) => {
  const { data: template, ...rest } = useCustomQuery<ITemplateDoc>(fetchTemplateByMajorIdConfig(majorId))
  return {
    ...rest,
    template,
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

// export const useUpdateListingById = (_id: string) => {
//   const { mutate: updateListing, ...rest } = useCustomMutation<ListingDoc>({
//     url: `/private/listing/${_id}`,
//     method: 'put',
//     updateLocal: {
//       queryConfigs: [fetchMyListingsConfig()],
//       type: 'update',
//     },
//   })
//   return {
//     ...rest,
//     updateListing,
//   }
// }

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
