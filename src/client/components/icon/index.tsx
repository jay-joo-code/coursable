import React from 'react'
import styled from 'styled-components'
import ArticleIcon from 'src/assets/icons/article.svg'
import EditIcon from 'src/assets/icons/edit.svg'
import DoneIcon from 'src/assets/icons/done.svg'
import RightIcon from 'src/assets/icons/right.svg'
import DownIcon from 'src/assets/icons/down.svg'
import DeleteIcon from 'src/assets/icons/delete.svg'
import CloseIcon from 'src/assets/icons/close.svg'
import DownloadIcon from 'src/assets/icons/download.svg'
import BookmarkIcon from 'src/assets/icons/bookmark.svg'
import BookmarkFilledIcon from 'src/assets/icons/bookmark-filled.svg'
import ReportIcon from 'src/assets/icons/report.svg'
import ExchangeIcon from 'src/assets/icons/exchange.svg'
import AddIcon from 'src/assets/icons/add.svg'
import PeopleIcon from 'src/assets/icons/people.svg'
import UpIcon from 'src/assets/icons/up.svg'
import LeftIcon from 'src/assets/icons/left.svg'
import PersonIcon from 'src/assets/icons/person.svg'
import MenuIcon from 'src/assets/icons/menu.svg'
import LockIcon from 'src/assets/icons/lock.svg'
import PlaceIcon from 'src/assets/icons/place.svg'
import AddCircleIcon from 'src/assets/icons/add-circle.svg'
import RemoveCircleIcon from 'src/assets/icons/remove-circle.svg'
import WarningIcon from 'src/assets/icons/warning.svg'
import MoreHoriIcon from 'src/assets/icons/more-hori.svg'
import MoreVertIcon from 'src/assets/icons/more-vert.svg'

interface IconProps extends IconContainerProps {
  variant: string
  onClick?: () => void
}

interface IconContainerProps {
  fill?: string
  size?: string
  pointer?: boolean
  interactiveHover?: boolean
}

const IconContainer = styled.div<IconContainerProps>`
  height: 2rem;
  width: 2rem;
  flex-shrink: 0;

  // size
  height: ${(props) => props.size && props.size};
  width: ${(props) => props.size && props.size};

  // pointer
  cursor: ${(props) => props.pointer && 'pointer'};

  & svg {
    height: 100%;
    width: 100%;
    fill: ${(props) => props.theme.text};

    // fill
    fill: ${(props) => props.fill && props.fill};

    // interactiveHover
    height: ${(props) => props.interactiveHover && '70%'};
    width: ${(props) => props.interactiveHover && '70%'};
  }

  // interactiveHover
  border-radius: ${(props) => props.interactiveHover && '50%'};
  display: ${(props) => props.interactiveHover && 'flex'};
  justify-content: ${(props) => props.interactiveHover && 'center'};
  align-items: ${(props) => props.interactiveHover && 'center'};
  cursor: ${(props) => props.interactiveHover && 'pointer'};

  @media (min-width: ${(props) => props.theme.medium}) {
    &:hover {
      background: ${(props) => props.interactiveHover && props.theme.grey[100]};
    }
  }
`

const Icon = (props: IconProps) => {
  const variantToComponent = {
    article: <ArticleIcon />,
    edit: <EditIcon />,
    done: <DoneIcon />,
    right: <RightIcon />,
    down: <DownIcon />,
    up: <UpIcon />,
    left: <LeftIcon />,
    delete: <DeleteIcon />,
    close: <CloseIcon />,
    download: <DownloadIcon />,
    bookmark: <BookmarkIcon />,
    report: <ReportIcon />,
    add: <AddIcon />,
    exchange: <ExchangeIcon />,
    'bookmark-filled': <BookmarkFilledIcon />,
    people: <PeopleIcon />,
    person: <PersonIcon />,
    menu: <MenuIcon />,
    lock: <LockIcon />,
    place: <PlaceIcon />,
    'add-circle': <AddCircleIcon />,
    'remove-circle': <RemoveCircleIcon />,
    warning: <WarningIcon />,
    'more-hori': <MoreHoriIcon />,
    'more-vert': <MoreVertIcon />,
  }

  return (
    <IconContainer {...props}>
      {variantToComponent[props.variant]}
    </IconContainer>
  )
}

export default Icon
