import palette from 'src/util/palette'

export const theme = {
  ...palette,

  // feedback
  success: '#66c088',
  success500: '#66c088',
  success300: '#8DD0A6',
  success100: '#B3E0C4',

  info: '#0275d8',
  info600: '#0275d8',
  info500: '#2C8CDF',
  info400: '#56A3E5',
  info300: '#81BAEC',
  info200: '#ABD1F2',
  info100: '#D5E8F9',
  info50: '#EAF4FC',

  warning: '#f0ad4e',
  warning100: '#FDF1E2',

  danger: '#de6362',
  danger500: '#de6362',
  danger400: '#E78A8A',
  danger300: '#EFB1B1',
  danger200: '#F3C5C5',
  danger100: '#F9E2E2',
  danger50: '#FCF1F1',

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
  text: '#3B454E',
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
