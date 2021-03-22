import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'
import React, { useState } from 'react'
import theme from 'src/app/theme'
import Icon from 'src/components/icon'
import ConfirmationModal from 'src/components/modal/ConfirmationModal'
import { IRequirementDoc } from 'src/types/requirement'
import styled from 'styled-components'
import { useDeleteRequirementById } from 'src/api/requirement'
import { useRemoveRequirement } from 'src/api/plan'
import useCurrentPsid from 'src/hooks/useCurrentPsid'

interface DropdownMenuProps {
  requirement: IRequirementDoc
}

const Container = styled.div`
  
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

const DropdownMenu = ({ requirement }: DropdownMenuProps) => {
  // delete functions
  const { deleteRequirement } = useDeleteRequirementById(requirement?._id)
  const psid = useCurrentPsid()
  const { removeRequirement } = useRemoveRequirement(psid)

  const handleDelete = () => {
    deleteRequirement({})
    removeRequirement({ _id: requirement?._id })
  }

  // delete modal
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const openDeleteModal = () => setIsOpen(true)

  return (
    <>
      <Container id='requirement-dropdown-menu'>
        <Dropdown
          overlay={menu(openDeleteModal)}
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
      <ConfirmationModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        confirmLabel='Delete'
        heading='Delete requirement'
        description='Are you sure you wish to delete this requirement? All data related to this requirement will be permanently deleted.'
      />
    </>
  )
}

export default DropdownMenu
