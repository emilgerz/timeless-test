import { Location } from '../types/user'

export const formatAdress = (adress: Location) => {
  return `${adress.city}, ${adress.state}, ${adress.country}`
}
