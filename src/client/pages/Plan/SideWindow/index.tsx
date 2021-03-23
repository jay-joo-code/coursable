import React, { useState } from 'react'
import theme from 'src/app/theme'
import Badge from 'src/components/badge'
import { Space } from 'src/components/layout'
import OutsideClickListener from 'src/components/layout/OutsideClickListener'
import Tabs from 'src/components/tabs'
import Text from 'src/components/text'
import { IRequirementDoc } from 'src/types/requirement'
import { courseName } from 'src/util/roster'
import styled from 'styled-components'
import CourseTab from './CourseTab'
import SideWindowMenu from './SideWindowMenu'
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
  const { name, courseId, isFixedAssignment, course } = requirement || {}

  // tabs
  const [tab, setTab] = useState<ITab>('course')
  const tabToComponent = {
    course: <CourseTab requirement={requirement} />,
    notes: <NotesTab requirement={requirement} />,
  }

  // heading
  const heading = course
    ? courseName(course)
    : requirement.name

  // outside click listener
  const [isListenOutsideClick, setIsListenOutsideClick] = useState(true)

  return (
    <OutsideClickListener
      onOutsideClick={() => setIsWindowOpen(false)}
      isListening={isListenOutsideClick}
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

            {/* unassigned */}
            {!course && (
              <>
                <Space margin='.5rem 0' />
                <Badge
                  label='Course unassigned'
                  color={theme.danger500}
                  background={theme.danger50}
                />
              </>
            )}

            {/* satisfies badge */}
            {(!isFixedAssignment && courseId && name) && (
              <>
                <Space margin='.8rem 0' />
                <Badge
                  label={`Satisfies: ${name}`}
                  color={theme.info500}
                  background={theme.info50}
                />
              </>
            )}
          </div>
          <SideWindowMenu
            requirement={requirement}
            setIsListenOutsideClick={setIsListenOutsideClick}
          />
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
