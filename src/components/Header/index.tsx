import { useEffect, useState } from 'react'
import { useDispatch } from '../../store/store'
import { fetchUsers } from '../../utils/thunks'
import s from './Header.module.scss'
import { userPageSlice } from '../../store/reducers/userPageReducer'
import { useDebounce } from '../../hooks/useDebounce'

export const Header = () => {
  const dispatch = useDispatch()
  const toggleFetchUsers = () => dispatch(fetchUsers())

  const [inputValue, setInputValue] = useState('')

  const debouncedValue = useDebounce(inputValue, 500)

  useEffect(() => {
    dispatch(
      userPageSlice.actions.setSearchValue(
        debouncedValue.toLowerCase().trim().split(' '),
      ),
    )
  }, [debouncedValue])

  return (
    <header className={s.header}>
      <input
        className={s.searchInput}
        type="text"
        placeholder="Search"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />

      <button className={s.btnRefresh} onClick={toggleFetchUsers}>
        Refresh Users
      </button>
    </header>
  )
}
