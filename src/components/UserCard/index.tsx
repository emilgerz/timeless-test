import { formatAdress } from '../../utils/helpers/formatAdress'
import { formatDate } from '../../utils/helpers/formatDate'
import { formatPhoneNumber } from '../../utils/helpers/formatPhoneNumber'
import { User } from '../../utils/types/user'
import s from './UserCard.module.scss'
import trashIcon from '../../assets/trashIcon.svg'
import { useDispatch } from '../../store/store'
import { userPageSlice } from '../../store/reducers/userPageReducer'
import { InfoDetailStroke } from '../CardDetail'

interface UserCardProps {
  user: User
}

export const UserCard = ({ user }: UserCardProps) => {
  const userFullName = `${user.name.first} ${user.name.last}`

  const birthDay = formatDate(user.dob.date)

  const adress = formatAdress(user.location)

  const phone = formatPhoneNumber(user.phone)

  const dispatch = useDispatch()

  const onDeleteButtonClick = () => {
    dispatch(userPageSlice.actions.deleteUser(user.registered))
  }

  return (
    <div className={s.card}>
      <button className={s.btnDelete} onClick={onDeleteButtonClick}>
        <img src={trashIcon} draggable={false} />
      </button>

      <div className={s.card__content}>
        <div className={s.header}>
          <img
            className={s.avatar}
            src={user.picture.thumbnail}
            alt={userFullName}
          />

          <div className={s.title}>
            <h2 className={s.title__fullname} title={userFullName}>
              {userFullName}
            </h2>

            <span title={user.email}>{user.email}</span>
          </div>
        </div>

        <div className={s.info}>
          <InfoDetailStroke field="Phone No" value={phone} />
          <InfoDetailStroke field="Birthday" value={birthDay} />
          <InfoDetailStroke field="Address" value={adress} />
        </div>
      </div>
    </div>
  )
}
