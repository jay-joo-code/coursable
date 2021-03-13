import React from 'react'
import { Link } from 'react-router-dom'
import theme from 'src/app/theme'
import { ReactComponent as LogoSVGRaw } from 'src/assets/svgs/logo.svg'
import styled from 'styled-components'

const LogoSVG = styled(LogoSVGRaw)`
  // fill
  fill: ${(props) => props.fill && props.fill};
`
interface LogoProps {
  variant: 'brand' | 'black'
}

const Logo = ({ variant }: LogoProps) => {
  const variantToFill = {
    brand: theme.brand,
    black: theme.text,
  }
  const fill = variant ? variantToFill[variant] : theme.brand

  return (
    <Link to='/'>
      <LogoSVG fill={fill} />
    </Link>
  )
}

export default Logo
