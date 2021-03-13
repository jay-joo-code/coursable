import { useSelector } from 'react-redux'
import useCustomQuery from 'src/hooks/useCustomQuery'
import { IPlanDoc } from 'src/types/plan'
import { RootState } from 'src/types/redux'
import { IUserDoc } from 'src/types/user'

export const fetchCurrentUserConfig = () => ({
  url: '/private/user/current',
})

export const fetchCurrentUserPlansConfig = () => ({
  url: '/private/user/plans',
  options: {
    retry: false,
  },
})

export const useCurrentUser = () => {
  const { data: currentUser, ...rest } = useCustomQuery<IUserDoc>(fetchCurrentUserConfig())
  const { accessToken } = useSelector((state: RootState) => state.authState)

  return {
    ...rest,
    currentUser: accessToken ? currentUser : null,
  }
}

export const useCurrentUserPlans = () => {
  const { data: plans, ...rest } = useCustomQuery<IPlanDoc[]>(fetchCurrentUserPlansConfig())
  return {
    ...rest,
    plans,
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
