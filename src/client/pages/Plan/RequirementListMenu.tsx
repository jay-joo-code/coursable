import React, { useState } from 'react'
import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'
import theme from 'src/app/theme'
import Icon from 'src/components/icon'
import { useAddRequirement, useAddSemester, useDeleteSemester } from 'src/api/plan'
import { useCreateRequirement } from 'src/api/requirement'
import useCurrentPsid from 'src/hooks/useCurrentPsid'
import ConfirmationModal from 'src/components/modal/ConfirmationModal'
import Modal from 'src/components/modal'
import RequirementForm from 'src/components/forms/RequirementForm'

interface RequirementListMenuProps {
  semesterNumber: number
}

const menu = (openAddRequirementModal, addSemesterRight, addSemesterLeft, openDeleteModal) => (
  <Menu>
    <Menu.Item
      onClick={openAddRequirementModal}
    >
      New requirement
    </Menu.Item>
    <Menu.Item
      onClick={addSemesterRight}
    >
      Add semester to right
    </Menu.Item>
    <Menu.Item
      onClick={addSemesterLeft}
    >
      Add semester to left
    </Menu.Item>
    <Menu.Item
      style={{ color: theme.danger }}
      onClick={openDeleteModal}
    >
      Delete
    </Menu.Item>
  </Menu>
)

const RequirementListMenu = ({ semesterNumber }: RequirementListMenuProps) => {
  const psid = useCurrentPsid()

  // delete semester
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const { deleteSemester } = useDeleteSemester(psid)

  const openDeleteModal = () => setIsDeleteModalOpen(true)
  const handleClickDelete = () => {
    deleteSemester({ semesterNumber })

    setIsDeleteModalOpen(false)
  }

  // new requirement
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

  // add semester
  const { addSemester } = useAddSemester(psid)
  const addSemesterRight = () => {
    addSemester({ semesterNumber })
  }
  const addSemesterLeft = () => {
    addSemester({ semesterNumber: semesterNumber - 1 })
  }

  return (
    <>
      <Dropdown
        overlay={menu(openAddRequirementModal, addSemesterRight, addSemesterLeft, openDeleteModal)}
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
    </>
  )
}

export default RequirementListMenu
