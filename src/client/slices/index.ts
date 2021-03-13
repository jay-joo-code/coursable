import { combineReducers, Reducer } from 'redux'

import authReducer from './auth'
import planReducer from './plan'
import { RootState } from 'src/types/redux'

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  authState: authReducer,
  planState: planReducer,
})

export default rootReducer
