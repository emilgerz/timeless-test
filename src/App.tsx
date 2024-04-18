import 'css-reset-eg'
import { useEffect } from 'react'
import { useDispatch } from './store/store'
import { fetchUsers } from './utils/thunks'
import s from './App.module.scss'
import { Header } from './components/Header'
import { Amountinfo } from './components/AmountInfo'
import { UsersTable } from './components/UsersTable'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <div className={s.container}>
      <Header />

      <div className={s.content}>
        <UsersTable />

        <Amountinfo />
      </div>
    </div>
  )
}

export default App
