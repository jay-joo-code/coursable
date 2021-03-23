import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'
import React, { memo, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useAddRequirement, useDeleteSemester } from 'src/api/plan'
import { useCreateRequirement } from 'src/api/requirement'
import theme from 'src/app/theme'
import RequirementForm from 'src/components/forms/RequirementForm'
import Icon from 'src/components/icon'
import { FlexRow, Space } from 'src/components/layout'
import Modal from 'src/components/modal'
import ConfirmationModal from 'src/components/modal/ConfirmationModal'
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

interface ContainerProps {
  isDraggingOver: boolean
}

const Container = styled.div<ContainerProps>`
  padding: 1rem;
  margin: 0 .5rem;
  width: 240px;
  background: ${(props) => props.theme.grey[100]};
  border-radius: 8px;

  // isDraggingOver
  background: ${(props) => props.isDraggingOver && props.theme.brandBg};
`

const menu = (openAddRequirementModal, openDeleteModal) => (
  <Menu>
    <Menu.Item
      onClick={openAddRequirementModal}
    >
      Add requirement
    </Menu.Item>
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

  const psid = useCurrentPsid()

  // delete semester handling
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const { deleteSemester } = useDeleteSemester(psid)

  const openDeleteModal = () => setIsDeleteModalOpen(true)
  const handleClickDelete = () => {
    deleteSemester({ semesterNumber })

    setIsDeleteModalOpen(false)
  }

  // add requirement handling
  const [isReqModalOpen, setIsReqModalOpen] = useState(false)
  const openAddRequirementModal = () => setIsReqModalOpen(true)
  const { createRequirement } = useCreateRequirement()
  const { addRequirement } = useAddRequirement(psid)

  const handleCreateRequirement = async (reqData) => {
    const data: any = await createRequirement(reqData)

    if (data && data._id) {
      addRequirement({
        _id: data._id,
        semesterNumber,
      })
    }

    setIsReqModalOpen(false)
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
              justifySpaceBetween
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
                overlay={menu(openAddRequirementModal, openDeleteModal)}
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
          <ConfirmationModal
            isOpen={isDeleteModalOpen}
            onRequestClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleClickDelete}
            confirmLabel='Delete'
            heading='Delete semester'
            description='All requirements within this semester will be permanently deleted.'
          />
          <Modal
            isOpen={isReqModalOpen}
            onRequestClose={() => setIsReqModalOpen(false)}
            heading='Add requirement'
          >
            <RequirementForm
              onSubmit={handleCreateRequirement}
            />
          </Modal>
        </Wrapper>
      )}
    </Droppable>
  )
}

export default memo(RequirementList)
