import React from 'react'
import { usePlanById } from 'src/api/plan'
import useCurrentPsid from 'src/hooks/useCurrentPsid'
import styled from 'styled-components'
import SemesterList from './SemesterList'

const Container = styled.div`
  display: flex;
  overflow: hidden;
`

const Plan = () => {
  const psid = useCurrentPsid()
  const { plan } = usePlanById(psid)

  return (
    <Container>
      <SemesterList semesters={plan?.semesters} />
    </Container>
  )
}

export default Plan
