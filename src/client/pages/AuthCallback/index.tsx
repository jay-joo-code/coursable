import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usePlanById, useUpdatePlanById } from 'src/api/plan'
import { useCurrentUser } from 'src/api/user'
import useRouter from 'src/hooks/useRouter'
import { setAccessToken } from 'src/slices/auth'
import { resetPsid } from 'src/slices/plan'
import { RootState } from 'src/types/redux'

const AuthCallback = () => {
  const router = useRouter()
  const { token } = router.query
  const dispatch = useDispatch()
  const { psid } = useSelector((state: RootState) => state.planState)
  const { accessToken } = useSelector((state: RootState) => state.authState)
  const { refetch: refetchPlan } = usePlanById(psid)
  const { updatePlan } = useUpdatePlanById(psid)
  const { refetch: refetchUser } = useCurrentUser()

  // set access token
  useEffect(() => {
    (async () => {
      if (token) {
        dispatch(setAccessToken(token))
      } else {
        router.push('/')
      }
    })()
  }, [router, token])

  // if plan.userId is unset,
  // set it with current user id
  useEffect(() => {
    (async () => {
      if (accessToken) {
        const { data: currentUser } = await refetchUser()

        if (currentUser && psid) {
          const { data: fetchedPlan } = await refetchPlan()

          if (!fetchedPlan?.userId) {
            // current plan is an unauthed plan
            await updatePlan({
              userId: currentUser?._id,
            })
            router.push(`/plan/${psid}`)
          } else {
            router.push('/')
          }

          // reset psid on auth
          dispatch(resetPsid())
        } else {
          router.push('/')
        }
      }
    })()
  }, [accessToken])

  return null
}

export default AuthCallback
