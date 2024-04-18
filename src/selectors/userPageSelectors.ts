import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store/store'
import { formatDate } from '../utils/helpers/formatDate'
import { formatAdress } from '../utils/helpers/formatAdress'
import { AmountUsersInfo } from '../utils/types/user'

const mainSelectorDomain = (state: RootState) => state.users

export const isDataLoadingSelector = () => {
  return createSelector([mainSelectorDomain], (state) => state.isDataLoading)
}

export const getAllUsersSelector = (state: RootState) => {
  return state.users
}

export const getSearchValueSelector = (state: RootState) => {
  return state.users.searchValue
}

export const getUsersBySearchQuerySelector = () => {
  return createSelector(
    [getAllUsersSelector, getSearchValueSelector],
    ({ users }, searchValue) => {
      if (!searchValue) {
        return users
      }

      return users.filter((user) => {
        const locationParsed = formatAdress(user.location)
        const birthDaParsed = formatDate(user.dob.date)

        if (
          [
            user.name.first,
            user.name.last,
            user.email,
            user.phone,
            birthDaParsed,
            locationParsed,
          ].some((field) =>
            field.toLowerCase().includes(searchValue.toLowerCase().trim()),
          )
        ) {
          return true
        }

        return false
      })
    },
  )
}

export const getAmountUsersInfoSelector = () => {
  return createSelector([mainSelectorDomain], (state) => {
    const ageDivisions = [
      [11, 20],
      [21, 30],
      [31, 40],
      [41, 50],
      [51, Infinity],
    ]

    return state.users.reduce(
      (amount, current) => {
        const { age } = current.dob

        const currentDivision = ageDivisions.find((div) => {
          return age >= div[0] && age <= div[1]
        })

        if (currentDivision) {
          const key = currentDivision.join('to') as keyof AmountUsersInfo

          amount[key]++
        }

        amount[current.gender]++

        return amount
      },
      {
        total: state.users.length,
        '11to20': 0,
        '21to30': 0,
        '31to40': 0,
        '41to50': 0,
        '51toInfinity': 0,
        female: 0,
        male: 0,
      } as AmountUsersInfo,
    ) as unknown as AmountUsersInfo
  })
}
