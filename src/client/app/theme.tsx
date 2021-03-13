import palette from 'src/util/palette'

export const theme = {
  ...palette,

  // feedback
  success: '#66c088',
  success500: '#66c088',
  success300: '#8DD0A6',
  success100: '#B3E0C4',

  info: '#0275d8',
  info500: '#0275d8',
  info300: '#4298E2',
  info100: '#81BAEC',
  info50: '#D5E8F9',

  warning: '#f0ad4e',
  warning100: '#FDF1E2',

  danger: '#de6362',
  danger500: '#de6362',
  danger300: '#EFB1B1',
  danger100: '#F3C5C5',

  // bg
  bg: '#ffffff',
  bgWash1: palette.grey[50],
  bgWash2: palette.grey[200],

  // border
  border: palette.grey[200],
  borderLight: '#E2E2E3',
  borderDark: '#C6C6C7',

  // brand
  brand: '#B31B1B',
  brandLight: '#D98D8D',
  brandDark: '#5A0E0E',
  brandBg: '#F4DFDF',

  brand500: '#B31B1B',
  brand300: '#C65454',
  brand100: '#D98D8D',

  // text
  text: '#24292E',
  textLight: '#575859',
  textMuted: '#737576',
  textPlaceholder: '#D3D7DB',

  // shadow
  shadow: '0 2px 4px rgba(0, 0, 0, .2)',

  // social
  facebook: '#3B5998',
  twitter: '#00ACED',
  google: '#ea4335',
  github: '#16171A',

  // breakpoints
  small: '576px', // landscape phones
  medium: '768px', // tablets
  large: '992px', // desktops, laptops
}

export default theme
