import React from 'react'
import styled from 'styled-components'
import { ReactComponent as ArticleIcon } from 'src/assets/icons/article.svg'
import { ReactComponent as EditIcon } from 'src/assets/icons/edit.svg'
import { ReactComponent as DoneIcon } from 'src/assets/icons/done.svg'
import { ReactComponent as RightIcon } from 'src/assets/icons/right.svg'
import { ReactComponent as DownIcon } from 'src/assets/icons/down.svg'
import { ReactComponent as DeleteIcon } from 'src/assets/icons/delete.svg'
import { ReactComponent as CloseIcon } from 'src/assets/icons/close.svg'
import { ReactComponent as DownloadIcon } from 'src/assets/icons/download.svg'
import { ReactComponent as BookmarkIcon } from 'src/assets/icons/bookmark.svg'
import { ReactComponent as BookmarkFilledIcon } from 'src/assets/icons/bookmark-filled.svg'
import { ReactComponent as ReportIcon } from 'src/assets/icons/report.svg'
import { ReactComponent as ExchangeIcon } from 'src/assets/icons/exchange.svg'
import { ReactComponent as AddIcon } from 'src/assets/icons/add.svg'
import { ReactComponent as PeopleIcon } from 'src/assets/icons/people.svg'
import { ReactComponent as UpIcon } from 'src/assets/icons/up.svg'
import { ReactComponent as LeftIcon } from 'src/assets/icons/left.svg'
import { ReactComponent as PersonIcon } from 'src/assets/icons/person.svg'
import { ReactComponent as MenuIcon } from 'src/assets/icons/menu.svg'
import { ReactComponent as LockIcon } from 'src/assets/icons/lock.svg'
import { ReactComponent as PlaceIcon } from 'src/assets/icons/place.svg'
import { ReactComponent as AddCircleIcon } from 'src/assets/icons/add-circle.svg'
import { ReactComponent as RemoveCircleIcon } from 'src/assets/icons/remove-circle.svg'
import { ReactComponent as WarningIcon } from 'src/assets/icons/warning.svg'
import { ReactComponent as MoreHoriIcon } from 'src/assets/icons/more-hori.svg'
import { ReactComponent as MoreVertIcon } from 'src/assets/icons/more-vert.svg'

interface IconProps {
  variant: string
  fill?: string
  size?: string
  onClick?: () => void
  pointer?: boolean
  interactiveHover?: boolean
}

const IconContainer = styled.div`
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
