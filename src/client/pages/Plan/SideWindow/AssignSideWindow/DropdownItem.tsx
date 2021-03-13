import React from 'react'
import { useDispatch } from 'react-redux'
import { useUpdateRequirementById } from 'src/api/requirement'
import theme from 'src/app/theme'
import Text from 'src/components/text'
import styled from 'styled-components'

interface DropdownItemProps {
  courseData: any
  requirementId: string
}

const Container = styled.div`
  padding: .5rem;
  border-bottom: 1px solid ${(props) => props.theme.border};
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.brandBg};
  }
`

const DropdownItem = ({ courseData, requirementId }: DropdownItemProps) => {
  const { updateRequirement } = useUpdateRequirementById(requirementId)

  const handleClick = () => {
    updateRequirement({
      courseId: courseData.crseId,
      course: { data: courseData },
    })
  }

  return (
    <Container onClick={handleClick}>
      <Text
        variant='h5'
        fontWeight={400}
        color={theme.textLight}
      >{courseData.subject} {courseData.catalogNbr}</Text>
    </Container>
  )
}

export default DropdownItem
