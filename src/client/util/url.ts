import queryString from 'query-string'
import omit from 'lodash/omit'

export const queryStringToObject = (str, options = {}) =>
  queryString.parse(str, {
    arrayFormat: 'bracket',
    ...options,
  })

export const objectToQueryString = (obj) => {
  Object.keys(obj).forEach((key) => {
    const undef = obj[key] === undefined
    const emptyStr = obj[key] === ''
    const emptyArr = obj[key] === []
    if (undef || emptyStr || emptyArr) {
      delete obj[key]
    }
  })
  return new URLSearchParams(obj).toString()
}

export const omitFromQueryString = (str, keys) =>
  objectToQueryString(omit(queryStringToObject(str), keys))

export const addToQueryString = (str, fields) =>
  objectToQueryString({
    ...queryStringToObject(str),
    ...fields,
  })
