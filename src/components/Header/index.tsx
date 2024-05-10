import { useEffect, useRef, useState } from 'react'
import { useDispatch } from '../../store/store'
import { fetchUsers } from '../../utils/thunks'
import s from './Header.module.scss'
import { userPageSlice } from '../../store/reducers/userPageReducer'

export const Header = () => {
  const dispatch = useDispatch()
  const toggleFetchUsers = () => dispatch(fetchUsers())

  const [inputValue, setInputValue] = useState('')

  const debounceIsActiveRef = useRef<undefined | number>(Math.random())

  useEffect(() => {
    if (debounceIsActiveRef.current) {
      clearTimeout(debounceIsActiveRef.current)

      debounceIsActiveRef.current = setTimeout(() => {
        dispatch(
          userPageSlice.actions.setSearchValue(
            inputValue.toLowerCase().trim().split(' '),
          ),
        )
      }, 500)
    }
  }, [inputValue])

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
