import { useSelector } from 'react-redux'
import {
  getUsersBySearchQuerySelector,
  isDataLoadingSelector,
} from '../../selectors/userPageSelectors'
import { UserCard } from '../UserCard'
import { Loader } from '../Loader'
import s from './UsersTable.module.scss'
import { useRef, useState } from 'react'
import { cn } from '../../utils/helpers/cn'

export const UsersTable = () => {
  const users = useSelector(getUsersBySearchQuerySelector())
  const isDataLoading = useSelector(isDataLoadingSelector())

  const [scrolledToTop, setScrolledToTop] = useState(true)
  const [scrolledToBottom, setScrolledToBottom] = useState(false)

  const tableRef = useRef<HTMLDivElement>(null)

  const handleFadeStatesChange = () => {
    const refEl = tableRef.current

    if (refEl) {
      const isScrolledToBottom =
        refEl.scrollHeight < refEl.clientHeight + refEl.scrollTop + 1

      const isScrolledToTop = isScrolledToBottom ? false : refEl.scrollTop === 0

      setScrolledToBottom(isScrolledToBottom)
      setScrolledToTop(isScrolledToTop)
    }
  }

  if (isDataLoading) {
    return (
      <div className={s.loader}>
        <Loader />
      </div>
    )
  }

  return (
    <main
      className={cn(
        s.users,
        scrolledToTop && s.bottomFade,
        scrolledToBottom && s.topFade,
        !scrolledToTop && !scrolledToBottom && s.topAndBottomFade,
      )}
      ref={tableRef}
      onScroll={handleFadeStatesChange}
    >
      {users.map((user) => (
        // key такой потому что user.id.value не уникальный :)
        <UserCard key={user.registered.date} user={user} />
      ))}
    </main>
  )
}
