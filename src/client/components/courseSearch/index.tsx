import React, { useState } from 'react'
import { useCoursesByQuery } from 'src/api/course'
import { Input } from 'src/components/formElements'
import { FlexColumn, Space } from 'src/components/layout'
import Dropdown from 'src/components/layout/Dropdown'
import Text from 'src/components/text'
import styled from 'styled-components'
import { useDebounce } from 'use-debounce'
import DropdownItem from './DropdownItem'

interface CourseSearchProps {
  handleClickCourse: (courseData: any) => void
}

const Container = styled(FlexColumn)`
  width: 200px;
`

const StyledDropdown = styled(Dropdown)`
  background: white;
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.border};
  width: 100%;
`

const CourseSearch = ({ handleClickCourse }: CourseSearchProps) => {
  const [text, setText] = useState('')
  const [query] = useDebounce(text, 1000)

  const { courses } = useCoursesByQuery(query)

  return (
    <Container>
      <Text
        variant='h5'
        fontWeight={700}
      >Assign course</Text>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
      />
      <Space margin='.2rem 0' />
      <StyledDropdown>
        {courses?.map(({ data }) => (
          <DropdownItem
            key={data.crseId}
            courseData={data}
            handleClickCourse={handleClickCourse}
          />
        ))}
      </StyledDropdown>
    </Container>
  )
}

export default CourseSearch
