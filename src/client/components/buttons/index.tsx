import React from 'react'
import theme from 'src/app/theme'
import styled from 'styled-components'
import Icon from '../icon'
import Loading from '../loading'

export interface ButtonProps {
  label: string
  color?: string
  bordered?: boolean
  text?: boolean
  onClick?: () => void
  isLoading?: boolean
  icon?: string
  isIconRightSide?: boolean
  iconSize?: string
  type?: 'submit'
}

interface StyledButtonProps {
  bordered?: boolean
  text?: boolean
  isLoading?: boolean
  icon?: string
  isIconRightSide?: boolean
}

const StyledButton = styled.button<StyledButtonProps>`
  background: ${(props) => props.theme.brand};
  color: ${(props) => props.theme.bg};
  padding: .5rem 1rem;
  cursor: pointer;
  flex-shrink: 0;
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 8px;
  font-family: inherit;

  font-size: .9rem;
  white-space: nowrap;

  display: flex;
  align-items: center;
  justify-content: center;

  // bordered
  color: ${(props) => props.bordered && props.color};
  background: ${(props) => props.bordered && props.theme.bg};
  border: ${(props) => props.bordered && `1px solid ${props.theme.brand}`};
  box-shadow: ${(props) => props.bordered && 'none'};

  // text
  color: ${(props) => props.text && props.color};
  background: ${(props) => props.text && props.theme.bg};
  padding: ${(props) => props.text && '.4rem .2rem'};
  border: ${(props) => props.text && 'none'};
  border-radius: ${(props) => props.text && '4px'};
  box-shadow: ${(props) => props.text && 'none'};
  font-size: ${(props) => props.text && '0.7rem'};
  font-weight: ${(props) => props.text && 500};
  text-transform: ${(props) => props.text && 'uppercase'};
  letter-spacing: ${(props) => props.text && '1px'};

  &:hover {
    background: ${(props) => props.text && props.theme.brandBg};
  }

  // isLoading, icon, text
  & > *:first-child {
    margin-right: ${(props) => (props.isLoading || props.icon) && '.5rem'};
    margin-right: ${(props) => (props.icon || props.text) && '.2rem'};
  }

  // isIconRightSide
  padding-right: ${(props) => props.isIconRightSide && '.5rem'};
`

export const Button = (props: ButtonProps) => {
  const color = props.color || theme.brand
  const iconFill = (props.bordered || props.text)
    ? color
    : theme.bg

  return (
    <StyledButton
      type={props.type || 'button'}
      color={color}
      {...props}
    >
      {(props.icon && !props.isIconRightSide) && <Icon
        variant={props.icon}
        fill={iconFill}
        size={props.iconSize}
      />}
      {props.isLoading && <Loading />}
      {props.label}
      {(props.icon && props.isIconRightSide) && <Icon
        variant={props.icon}
        fill={iconFill}
        size={props.iconSize}
      />}
    </StyledButton>
  )
}
