import axios from 'axios'
import history from 'src/util/history'
import { objectToQueryString } from 'src/util/url'
import store from 'src/slices/store'
import { logout } from 'src/slices/auth'
import { showToast } from 'src/util/toast'

const defaults = {
  baseURL: '/api',
  headers: () => ({
    'Content-Type': 'application/json',
  }),
  error: {
    code: 'INTERNAL_ERROR',
    message: 'Something went wrong. Please check your internet connection or contact our support.',
    status: 503,
    data: {},
  },
}

const listener = () => {
  const { accessToken } = store.getState().authState
  defaults.headers = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  })
}

store.subscribe(listener)

const api = (
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  variables: any
) =>
  new Promise((resolve, reject) => {
    axios({
      url: `${defaults.baseURL}${url}`,
      method,
      headers: defaults.headers(),
      params: method === 'get' ? variables : undefined,
      data: method !== 'get' ? variables : undefined,
      paramsSerializer: objectToQueryString,
    })
      .then((response) => {
        resolve(response.data)
      },
      (error) => {
        // TOOD: auth error handling
        if (error.response) {
          const { code, message } = error.response.data
          if (code === 404) {
            if (message === '접속 토큰이 유효하지 않습니다. msg : jwt expired') {
              history.push('/refresh-token')
            } else {
              showToast('error', '세션이 만료되었습니다')
              store.dispatch(logout())
              history.push('/login')
            }
          } else {
            reject(error)
          }
        } else {
          reject(error)
        }
      }
      )
  })

export default api
