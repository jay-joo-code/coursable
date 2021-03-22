import React, { useEffect } from 'react'
import styled from 'styled-components'
import ReactModal from 'react-modal'
import Icon from '../icon'
import { FlexRow } from '../layout'
import theme from 'src/app/theme'
import { hexToRGBA } from 'src/util/colors'
import Text from '../text'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    border: `1px solid ${theme.border}`,
    maxWidth: '95vw',
  },
  overlay: {
    background: hexToRGBA('#000000', 0.3),
    zIndex: 9999,
  },
}

const TopRow = styled(FlexRow)`
  padding: .5rem 1rem;
  border-bottom: 1px solid ${(props) => props.theme.border};

  & > *:first-child {
    margin-right: 1rem;
  }
`

const ContentContainer = styled.div`
  padding: 1rem;
  max-width: 700px;
`

interface ModalProps {
  isOpen: boolean
  onRequestClose: () => void
  children: React.ReactNode
  heading?: string
  onAfterOpen?: () => void
  isHideHeader?: boolean
}

const Modal = (props: ModalProps) => {
  useEffect(() => {
    ReactModal.setAppElement('#root')
  }, [])

  useEffect(() => {
    if (props.isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [props.isOpen])

  if (!props.isOpen) return null

  return (
    <ReactModal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      onAfterOpen={props.onAfterOpen}
      style={customStyles}
      ariaHideApp={false}
    >
      {!props.isHideHeader && (
        <TopRow
          justifySpaceBetween
          alignCenter
        >
          <Text variant='h4'>{props.heading}</Text>
          <Icon
            variant='close'
            onClick={props.onRequestClose}
            pointer
            interactiveHover
            size='1.7rem'
          />
        </TopRow>
      )}
      <ContentContainer>
        {props.children}
      </ContentContainer>
    </ReactModal>
  )
}

export default Modal
