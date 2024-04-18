import { createAsyncThunk } from '@reduxjs/toolkit'
import { Info, User } from './types/user'

export const fetchUsers = createAsyncThunk<{ results: User[]; info: Info }>(
  `userPage/fetchUsers`,
  () => {
    return fetch('https://randomuser.me/api/?results=500').then((response) =>
      response.json(),
    )
  },
)
