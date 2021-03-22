import React from 'react'
import { CoreTextProps, H1, H2, H3, H4, H5, H6, H7, P } from './styles'

interface TextProps extends CoreTextProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'p'
  children: React.ReactNode
  style?: any
  maxLines?: number
}

const Text = ({ variant, children, ...rest }: TextProps) => {
  switch (variant) {
    case 'h1':
      return (
        <H1 {...rest}>{children}</H1>
      )
    case 'h2':
      return (
        <H2 {...rest}>{children}</H2>
      )
    case 'h3':
      return (
        <H3 {...rest}>{children}</H3>
      )
    case 'h4':
      return (
        <H4 {...rest}>{children}</H4>
      )
    case 'h5':
      return (
        <H5 {...rest}>{children}</H5>
      )
    case 'h6':
      return (
        <H6 {...rest}>{children}</H6>
      )
    case 'h7':
      return (
        <H7 {...rest}>{children}</H7>
      )
    case 'p':
      return (
        <P {...rest}>{children}</P>
      )
  }
}

export default Text
