import { useParams, useLocation, useRouteMatch } from 'react-router-dom'
import { useMemo } from 'react'
import { parse, stringify } from 'query-string'
import history from 'src/util/history'

export default function useRouter() {
  const params = useParams()
  const location = useLocation()
  const match: any = useRouteMatch()

  const query: any = {
    ...parse(location.search), // Convert string to object
    ...params,
  }

  const setQuery = (newQuery) => {
    const queryStr = stringify(newQuery)
    const newPath = `${location.pathname}?${queryStr}`
    history.push(newPath)
  }

  const updateQuery = (obj, overwrite = false) => {
    const newQuery = Object.assign({}, query, obj)
    setQuery(overwrite ? obj : newQuery)
  }

  return useMemo(() => {
    return {
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      query,
      updateQuery,
      match,
      location,
      history,
    }
  }, [params, match, location, history])
}
