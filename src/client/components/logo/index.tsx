import React from 'react'
import { Link } from 'react-router-dom'
import theme from 'src/app/theme'
import LogoSVGRaw from 'src/assets/svgs/logo.svg'
import styled from 'styled-components'
interface LogoProps {
  variant: 'brand' | 'black'
}

interface LogoSVGProps {
  fill?: string
}

const LogoSVG = styled(LogoSVGRaw)<LogoSVGProps>`
  // fill
  fill: ${(props) => props.fill && props.fill};
`

const Logo = ({ variant }: LogoProps) => {
  const variantToFill = {
    brand: theme.brand,
    black: theme.text,
  }
  const fill = variant ? variantToFill[variant] : theme.brand

  return (
    <Link to='/'>
      logo
      {/* <LogoSVG fill={fill} /> */}
    </Link>
  )
}

export default Logo
