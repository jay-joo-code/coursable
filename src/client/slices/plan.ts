import { createSlice } from '@reduxjs/toolkit'

import { PlanState } from 'src/types/redux'

const initialState: PlanState = {
  psid: null,
}

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    setPsid: (state, { payload }) => {
      state.psid = payload.psid
    },
    resetPsid: (state) => {
      state.psid = null
    },
  },
})

export const { setPsid, resetPsid } = planSlice.actions

export default planSlice.reducer
