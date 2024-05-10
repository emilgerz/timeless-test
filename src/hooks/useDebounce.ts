import { useEffect, useRef, useState } from 'react'

type UseDebounceType = <T>(value: T, delay: number) => T

export const useDebounce: UseDebounceType = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  const debounceIsActiveRef = useRef<undefined | number>(Math.random())

  useEffect(() => {
    if (debounceIsActiveRef.current) {
      clearTimeout(debounceIsActiveRef.current)

      debounceIsActiveRef.current = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)
    }

    return () => {
      if (debounceIsActiveRef.current) {
        clearTimeout(debounceIsActiveRef.current)
      }
    }
  }, [value])

  return debouncedValue
}
