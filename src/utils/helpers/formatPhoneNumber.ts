export const formatPhoneNumber = (phoneNumber: string) => {
  const cleaned = phoneNumber.replace(/\D/g, '')

  const isValidNumber = cleaned.length === 10

  if (isValidNumber) {
    const areaCode = cleaned.slice(0, 3)
    const prefix = cleaned.slice(3, 6)
    const lineNumber = cleaned.slice(6)
    return `(${areaCode}) ${prefix} ${lineNumber}`
  } else {
    return phoneNumber
  }
}
