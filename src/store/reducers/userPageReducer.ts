import { createSlice } from '@reduxjs/toolkit'
import { Registered, User } from '../../utils/types/user'
import { Info } from '../../utils/types/userPageReducerInfo'
import { fetchUsers } from '../../utils/thunks'

export interface UserPageReducer {
  users: User[]
  info: Info | null
  searchValue: string
  isDataLoading: boolean
}

const initialState: UserPageReducer = {
  users: [],
  info: null,
  searchValue: '',
  isDataLoading: false,
}

export const userPageSlice = createSlice({
  name: 'userPage',
  initialState,
  reducers: {
    setUsers: (state, { payload }: { payload: User[] }) => {
      state.users = payload
    },
    deleteUser: (state, { payload }: { payload: Registered }) => {
      const { date } = payload

      state.users = state.users.filter((user) => user.registered.date !== date)
    },
    setSearchValue: (state, { payload }: { payload: string }) => {
      state.searchValue = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isDataLoading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload.results
      state.info = action.payload.info
      state.isDataLoading = false
    })
  },
})
