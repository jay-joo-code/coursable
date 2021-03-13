
export interface AuthState {
  accessToken: string | null
}

export interface PlanState {
  psid: string | null
}

export interface RootState {
  authState: AuthState
  planState: PlanState
}
