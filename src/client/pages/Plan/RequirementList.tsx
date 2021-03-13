import { Dropdown, Menu } from 'antd'
import React, { memo, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useDeleteSemester } from 'src/api/plan'
import theme from 'src/app/theme'
import { Button } from 'src/components/buttons'
import Icon from 'src/components/icon'
import { FlexRow, Space } from 'src/components/layout'
import Modal from 'src/components/modal'
import Text from 'src/components/text'
import useCurrentPsid from 'src/hooks/useCurrentPsid'
import { ISemester } from 'src/types/requirement'
import styled from 'styled-components'
import RequirementListItem from './RequirementListItem'

interface RequirementListProps {
  semester: ISemester
  semesterNumber: number
}

const Wrapper = styled.div`
`

const Container = styled.div`
  padding: 1rem;
  width: 240px;
  background: ${(props) => props.theme.grey[100]};
  border-radius: 8px;

  // isDraggingOver
  background: ${(props) => props.isDraggingOver && props.theme.brandBg};
`

const menu = (openDeleteModal) => (
  <Menu>
    <Menu.Item
      style={{ color: theme.danger }}
      onClick={openDeleteModal}
    >
      Delete
    </Menu.Item>
  </Menu>
)

const RequirementList = ({ semester, semesterNumber }: RequirementListProps) => {
  const heading = semesterNumber === 0
    ? 'Transfer Credits'
    : `Semester ${semesterNumber}`

  // delete semester handling
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const psid = useCurrentPsid()
  const { deleteSemester } = useDeleteSemester(psid)

  const openDeleteModal = () => setIsDeleteModalOpen(true)
  const handleClickDelete = () => {
    deleteSemester({ semesterNumber })

    setIsDeleteModalOpen(false)
  }

  return (
    <Droppable
      key={semesterNumber}
      droppableId={semesterNumber.toString()}
    >
      {(provided, snapshot) => (
        <Wrapper>
          <Container
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            <FlexRow
              jsb
              alignStart
            >
              <div>
                <Space margin='.2rem 0' />
                <Text
                  variant='h5'
                  fontWeight={500}
                  color={theme.textLight}
                >{heading}</Text>
                {/* <Text
                  variant='h6'
                  color={theme.textMuted}
                  fontWeight={400}
                >{totalCredits} credits</Text> */}
              </div>
              <Dropdown
                overlay={menu(openDeleteModal)}
                trigger={['click']}
                placement='bottomRight'
              >
                <Icon
                  variant='more-hori'
                  size='1.75rem'
                  fill={theme.textMuted}
                  interactiveHover
                  pointer
                />
              </Dropdown>
            </FlexRow>
            <Space margin='1rem 0' />
            {semester.map((requirementId, row) => (
              <RequirementListItem
                key={requirementId}
                requirementId={requirementId}
                row={row}
                semesterNumber={semesterNumber}
              />
            ))}
            {provided.placeholder}
          </Container>
          <Modal
            isOpen={isDeleteModalOpen}
            onRequestClose={() => setIsDeleteModalOpen(false)}
            isHideHeader
          >
            <Text
              variant='p'
              fontWeight={500}
            >Delete semester</Text>
            <Space margin='.5rem 0' />
            <Text
              maxWidth={280}
              variant='h6'
            >All requirements within this semester will be permanently deleted</Text>
            <Space margin='1rem 0' />
            <FlexRow
              ac
              je
            >
              <Button
                text
                label='Cancel'
                onClick={() => setIsDeleteModalOpen(true)}
              />
              <Space margin='0 .5rem' />
              <Button
                label='Delete'
                onClick={handleClickDelete}
              />
            </FlexRow>
          </Modal>
        </Wrapper>
      )}
    </Droppable>
  )
}

export default memo(RequirementList)
