import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useMajors } from 'src/api/major'
import { useGeneratePlanByMajor } from 'src/api/plan'
import { useCurrentUser } from 'src/api/user'
import theme from 'src/app/theme'
import { ReactComponent as EngineeringIconRaw } from 'src/assets/svgs/departments/engineering.svg'
import { FlexColumn, FlexRow, Space } from 'src/components/layout'
import Loading from 'src/components/loading'
import Pill from 'src/components/pill'
import Text from 'src/components/text'
import useRouter from 'src/hooks/useRouter'
import { setPsid } from 'src/slices/plan'
import styled from 'styled-components'

const Container = styled.div`
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 8px;
  display: flex;
  height: 250px;
`

const DepartmentList = styled.div`
  border-right: 1px solid ${(props) => props.theme.border};

  & > div {
    border-bottom: 1px solid ${(props) => props.theme.border};
  }
`

const DepartmentListItem = styled(FlexRow)`
  padding: .5rem 1rem;
  align-items: center;
  border-right: 3px solid ${(props) => props.theme.brand};
`

const EngineeringIcon = styled(EngineeringIconRaw)`
  fill: ${(props) => props.theme.textLight};
`

const MajorList = styled.div`
  flex: 1;
  max-height: 300px;
  overflow: auto;

  & > div {
    border-bottom: 1px solid ${(props) => props.theme.border};
  }
`

const MajorListItem = styled(FlexRow)`
  padding: .5rem 1rem;
  align-items: center;
  justify-content: space-between;
  
  // isComingSoon
  cursor: ${(props) => !props.isComingSoon && 'pointer'};
  background: ${(props) => props.isComingSoon && props.theme.grey[50]};
  
  &:hover {
    background: ${(props) => !props.isComingSoon && props.theme.brandBg};
  }
`

const TextContainer = styled.div`
  width: 200px;
  white-space: initial;
`

const MajorSelector = () => {
  const { majors } = useMajors()
  const router = useRouter()
  const { generatePlan, isLoading } = useGeneratePlanByMajor()
  const { currentUser } = useCurrentUser()
  const dispatch = useDispatch()
  const [selectedMajorId, setSelectedMajorId] = useState<string | null>()

  const handleClickMajor = async (majorId) => {
    if (!selectedMajorId) {
      setSelectedMajorId(majorId)
      const newPsid = await generatePlan({ majorId, userId: currentUser?._id })

      // if unauthed, save psid to redux to persist it
      if (!currentUser) {
        dispatch(setPsid({ psid: newPsid }))
      }

      router.push(`/plan/${newPsid}`)
    }
  }

  if (!majors) return <Loading />

  return (
    <FlexColumn ac>
      <Container>
        <DepartmentList>
          <DepartmentListItem>
            <EngineeringIcon />
            <Space margin='0 .2rem' />
            <Text
              variant='h5'
              fontWeight={500}
            >Engineering</Text>
          </DepartmentListItem>
        </DepartmentList>
        <MajorList>
          {majors?.map((major) => !major.isComingSoon && (
            <MajorListItem
              key={major._id}
              isComingSoon={major.isComingSoon}
              onClick={() => handleClickMajor(major._id)}
            >
              <TextContainer>
                <Text
                  variant='h5'
                  color={theme.text}
                >{major.name}</Text>
              </TextContainer>
              <Loading isHidden={!isLoading || selectedMajorId !== major._id} />
            </MajorListItem>
          ))}
        </MajorList>
      </Container>
      <Space margin='.3rem 0' />
      <Text
        variant='h5'
        color={theme.textMuted}
      >More departments and majors will be added soon!</Text>
    </FlexColumn>
  )
}

export default MajorSelector
