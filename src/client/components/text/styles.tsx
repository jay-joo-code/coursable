import styled from 'styled-components'

export interface CoreTextProps {
  ellipsis?: boolean
  nowrap?: boolean
  color?: string
  fontWeight?: number
  maxWidth?: number
  margin?: string
  uppercase?: boolean
  maxLines?: number
}

const CoreText = styled.p<CoreTextProps>`
  color: ${(props) => props.theme.text};
  white-space: pre-line;
  word-break: break-word;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: .5px;

  // ellipsis
  text-overflow: ${(props) => (props.ellipsis ? 'ellipsis' : '')};
  overflow: ${(props) => (props.ellipsis ? 'hidden' : '')};
  white-space: ${(props) => (props.ellipsis ? 'nowrap' : '')};

  // nowrap
  white-space: ${(props) => (props.nowrap ? 'nowrap' : '')};

  // color
  color: ${(props) => (props.color && props.color)};

  // fontWeight
  font-weight: ${(props) => (props.fontWeight && props.fontWeight)};

  // maxWidth
  max-width: ${(props) => (props.maxWidth ? `${props.maxWidth}px` : '')};

  // margin
  margin: ${(props) => props.margin ? props.margin : ''};

  // uppercase
  text-transform: ${(props) => props.uppercase && 'uppercase'};

  // maxLines
  overflow: ${(props) => props.maxLines && 'hidden'};
  text-overflow: ${(props) => props.maxLines && 'ellipsis'};
  display: ${(props) => props.maxLines && '-webkit-box'};
  -webkit-line-clamp: ${(props) => props.maxLines && props.maxLines};
  -webkit-box-orient: ${(props) => props.maxLines && 'vertical'};
`

export const H1 = styled(CoreText)`
  font-size: 42px;
  font-weight: 500;

  @media (min-width: ${(props) => props.theme.medium}) {
    font-size: 48px;
  }
`

export const H2 = styled(CoreText)`
  font-size: 30px;
  font-weight: 500;

  @media (min-width: ${(props) => props.theme.medium}) {
    font-size: 36px;
  }
`

export const H3 = styled(CoreText)`
  font-size: 24px;
  font-weight: 500;
`

export const H4 = styled(CoreText)`
  font-size: 18px;
  font-weight: 500;
`

export const P = styled(CoreText)`
  font-size: 16px;
`

export const H5 = styled(CoreText)`
  font-size: 14px;
`

export const H6 = styled(CoreText)`
  font-size: 12px;
`

export const H7 = styled(CoreText)`
  font-size: 11px;
`
