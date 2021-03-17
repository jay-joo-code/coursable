import React from 'react'
import { useCurrentUserPlans } from 'src/api/user'
import theme from 'src/app/theme'
import { FlexColumn, Space } from 'src/components/layout'
import Text from 'src/components/text'
import styled from 'styled-components'
import moment from 'moment'
import useRouter from 'src/hooks/useRouter'

const SelectContainer = styled.div`
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadow};
  border: ${(props) => props.theme.border};
  min-width: 60%;

  & > div {
    border-bottom: 1px solid ${(props) => props.theme.border};
  }

  & > div::last-child {
    border-bottom: none;
  }
`

const PlanListItem = styled.div`
  padding: .5rem 1rem;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.brandBg};
  }
`

const SelectPlanHome = () => {
  const { plans } = useCurrentUserPlans()
  const router = useRouter()

  return (
    <FlexColumn
      alignCenter
      justifyCenter
    >
      <Text variant='h3'>We found multiple plans on your account</Text>
      <Space margin='.2rem 0' />
      <Text
        variant='p'
        color={theme.textMuted}
      >Which one should we load?</Text>
      <Space margin='1rem 0' />
      <SelectContainer>
        {plans?.map((plan) => (
          <PlanListItem
            key={plan._id}
            onClick={() => router.push(`/plan/${plan.shortId}`)}
          >
            <Text variant='p'>{plan.major.name}</Text>
            <Text
              variant='h6'
              color={theme.textMuted}
            >Updated {moment(plan.updatedAt).fromNow()}</Text>
          </PlanListItem>
        ))}
        <PlanListItem
          onClick={() => router.push('/new')}
        >
          <Text
            variant='h5'
            fontWeight={500}
          >+ Add new plan</Text>
        </PlanListItem>
      </SelectContainer>
    </FlexColumn>
  )
}

export default SelectPlanHome
