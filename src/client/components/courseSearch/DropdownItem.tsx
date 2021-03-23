import React from 'react'
import theme from 'src/app/theme'
import Text from 'src/components/text'
import styled from 'styled-components'

interface DropdownItemProps {
  courseData: any
  handleClickCourse: (courseData: any) => void
}

const Container = styled.div`
  padding: .5rem;
  border-bottom: 1px solid ${(props) => props.theme.border};
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.brandBg};
  }
`

const DropdownItem = ({ courseData, handleClickCourse }: DropdownItemProps) => {
  const handleClick = () => handleClickCourse(courseData)

  return (
    <Container onClick={handleClick}>
      <Text
        variant='h5'
        fontWeight={400}
        color={theme.textLight}
      >{courseData.subject} {courseData.catalogNbr}</Text>
      <Text
        variant='h6'
        fontWeight={300}
        color={theme.textMuted}
      >{courseData.titleShort}</Text>
    </Container>
  )
}

export default DropdownItem
