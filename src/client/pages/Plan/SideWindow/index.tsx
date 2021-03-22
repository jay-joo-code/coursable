import React, { useState } from 'react'
import theme from 'src/app/theme'
import OutsideClickListener from 'src/components/layout/OutsideClickListener'
import Tabs from 'src/components/tabs'
import Text from 'src/components/text'
import { IRequirementDoc } from 'src/types/requirement'
import { courseName } from 'src/util/roster'
import styled from 'styled-components'
import CourseTab from './CourseTab'
import DropdownMenu from './DropdownMenu'
import NotesTab from './NotesTab'

interface SideWindowProps {
  setIsWindowOpen: (state: boolean) => void
  requirement: IRequirementDoc | undefined
}

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadow};
  background: white;
  width: 300px;
`

const TopContainer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

type ITab = 'course' | 'notes' | string

const SideWindow = ({ requirement, setIsWindowOpen }: SideWindowProps) => {
  // tabs
  const [tab, setTab] = useState<ITab>('course')
  const tabToComponent = {
    course: <CourseTab requirement={requirement} />,
    notes: <NotesTab requirement={requirement} />,
  }

  // heading
  const { course } = requirement || {}
  const heading = course
    ? courseName(course)
    : requirement.name

  return (
    <OutsideClickListener
      onOutsideClick={() => setIsWindowOpen(false)}
    >
      <Container >
        <TopContainer>
          <div>
            <Text
              variant='h4'
              fontWeight={500}
            >{heading}</Text>
            {course && (
              <Text
                variant='h6'
                fontWeight={400}
                color={theme.textMuted}
              >{course?.data.titleShort}</Text>
            )}
          </div>
          <DropdownMenu requirement={requirement} />
        </TopContainer>
        <Tabs
          currentValue={tab}
          setTab={setTab}
          tabs={[
            { label: 'Course', value: 'course' },
            { label: 'Notes', value: 'notes' },
          ]}
        />
        {tabToComponent[tab]}
      </Container>
    </OutsideClickListener>
  )
}

export default SideWindow
