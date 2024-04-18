import { useSelector } from 'react-redux'
import s from './AmountInfo.module.scss'
import {
  getAmountUsersInfoSelector,
  isDataLoadingSelector,
} from '../../selectors/userPageSelectors'
import { InfoDetailStroke } from '../CardDetail'
import { Loader } from '../Loader'

export const Amountinfo = () => {
  const usersAmountInfo = useSelector(getAmountUsersInfoSelector())
  const isDataLoading = useSelector(isDataLoadingSelector())

  return (
    <aside className={s.amountInfo}>
      {isDataLoading ? (
        <div className={s.loader}>
          <Loader />
        </div>
      ) : (
        <>
          <div className={s.item}>
            <h2>{usersAmountInfo.total} Users</h2>
          </div>

          <div className={s.item}>
            <h3>Age Groups</h3>

            <div className={s.item__info}>
              <InfoDetailStroke
                field="11 to 20"
                value={usersAmountInfo['11to20']}
              />
              <InfoDetailStroke
                field="21 to 30"
                value={usersAmountInfo['21to30']}
              />
              <InfoDetailStroke
                field="31 to 40"
                value={usersAmountInfo['31to40']}
              />
              <InfoDetailStroke
                field="41 to 50"
                value={usersAmountInfo['41to50']}
              />
              <InfoDetailStroke
                field="51+"
                value={usersAmountInfo['51toInfinity']}
              />
            </div>
          </div>

          <div className={s.item}>
            <h3>Gender Groups</h3>

            <div className={s.item__info}>
              <InfoDetailStroke field="Male" value={usersAmountInfo.male} />
              <InfoDetailStroke field="Female" value={usersAmountInfo.female} />
            </div>
          </div>
        </>
      )}
    </aside>
  )
}
