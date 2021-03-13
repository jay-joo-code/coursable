import { Router } from 'express'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useRouter from 'src/hooks/useRouter'
import { resetPsid } from 'src/slices/plan'

const ResetPsid = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    dispatch(resetPsid())
    router.push('/')
  }, [])

  return null
}

export default ResetPsid
