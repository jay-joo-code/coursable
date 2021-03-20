import React from 'react'
import { Link } from 'react-router-dom'
import LogoSVG from 'src/assets/svgs/logo.svg'

const Logo = () => {
  return (
    <Link to='/'>
      <LogoSVG />ab
    </Link>
  )
}

export default Logo
