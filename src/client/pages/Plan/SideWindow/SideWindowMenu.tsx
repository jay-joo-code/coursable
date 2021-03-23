import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'
import React, { useState } from 'react'
import theme from 'src/app/theme'
import Icon from 'src/components/icon'
import ConfirmationModal from 'src/components/modal/ConfirmationModal'
import { IRequirementDoc } from 'src/types/requirement'
import styled from 'styled-components'
import { useDeleteRequirementById, useUpdateRequirementById } from 'src/api/requirement'
import { useRemoveRequirement } from 'src/api/plan'
import useCurrentPsid from 'src/hooks/useCurrentPsid'
import Modal from 'src/components/modal'
import RequirementForm from 'src/components/forms/RequirementForm'

interface SideWindowMenuProps {
  requirement: IRequirementDoc
  setIsListenOutsideClick: (value: boolean) => void
}

const Container = styled.div`
  
`

const menu = (openEditModal, openDeleteModal) => (
  <Menu>
    <Menu.Item
      onClick={openEditModal}
    >
      Edit
    </Menu.Item>
    <Menu.Item
      style={{ color: theme.danger }}
      onClick={openDeleteModal}
    >
      Delete
    </Menu.Item>
  </Menu>
)

const SideWindowMenu = ({ requirement, setIsListenOutsideClick }: SideWindowMenuProps) => {
  const psid = useCurrentPsid()
  const { name, isFixedAssignment, course } = requirement || {}

  // edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const openEditModal = () => {
    setIsEditModalOpen(true)
    setIsListenOutsideClick(false)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setIsListenOutsideClick(true)
  }

  // edit functions
  const { updateRequirement } = useUpdateRequirementById(requirement?.id)
  const handleEdit = (reqData) => {
    updateRequirement(reqData)
    setIsEditModalOpen(false)
    setIsListenOutsideClick(true)
  }

  // delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true)
    setIsListenOutsideClick(false)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setIsListenOutsideClick(true)
  }

  // delete functions
  const { deleteRequirement } = useDeleteRequirementById(requirement?._id)
  const { removeRequirement } = useRemoveRequirement(psid)

  const handleDelete = () => {
    deleteRequirement({})
    removeRequirement({ _id: requirement?._id })
  }

  return (
    <>
      <Container id='requirement-dropdown-menu'>
        <Dropdown
          overlay={menu(openEditModal, openDeleteModal)}
          trigger={['click']}
          placement='bottomRight'
          getPopupContainer={() => document.getElementById('requirement-dropdown-menu')}
        >
          <Icon
            variant='more-hori'
            size='1.75rem'
            fill={theme.textMuted}
            interactiveHover
            pointer
          />
        </Dropdown>
      </Container>
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        heading='Edit requirement'
      >
        <RequirementForm
          name={name}
          isFixedAssignment={isFixedAssignment}
          courseData={course?.data}
          onSubmit={handleEdit}
        />
      </Modal>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        onConfirm={handleDelete}
        confirmLabel='Delete'
        heading='Delete requirement'
        description='Are you sure you wish to delete this requirement? All data related to this requirement will be permanently deleted.'
      />
    </>
  )
}

export default SideWindowMenu
