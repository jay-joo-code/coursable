import React from 'react'
import Modal from '.'
import { Button } from '../buttons'
import { FlexRow, Space } from '../layout'
import Text from '../text'

interface ConfirmationModalProps {
  isOpen: boolean
  onRequestClose: () => void
  onConfirm: () => void
  confirmLabel: string
  heading: string
  description: string
}

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm, heading, description, confirmLabel }: ConfirmationModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      isHideHeader
    >
      <Text
        variant='p'
        fontWeight={500}
      >{heading}</Text>
      <Space margin='.5rem 0' />
      <Text
        maxWidth={280}
        variant='h5'
      >{description}</Text>
      <Space margin='1.5rem 0' />
      <FlexRow
        alignCenter
        justifyEnd
      >
        <Button
          text
          label='Cancel'
          onClick={() => onRequestClose()}
        />
        <Space margin='0 .5rem' />
        <Button
          label={confirmLabel}
          onClick={onConfirm}
        />
      </FlexRow>
    </Modal>
  )
}

export default ConfirmationModal
