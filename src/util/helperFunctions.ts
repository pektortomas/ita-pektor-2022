import { error } from 'console'
import { useEffect, useState } from 'react'

export const generateID = () => {
  return Math.floor(Math.random() * 100_000_000)
}

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      console.error
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch {
      console.error
    }
  }
  return [storedValue, setValue] as const
}

export const pause = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(undefined)
    }, ms)
  })
}

export const shuffle = <T>(arr: T[]): T[] => {
  return arr.sort(() => Math.random() - 0.5)
}

export const generateSlug = (textToSlug: string, id: number | string) => {
  return `${textToSlug.toLowerCase().replace(/\W+/g, '-')}-${id}`
}

export const useComponentDidMount = (fn: () => void) => {
  useEffect(() => {
    fn()
  }, [])
}

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message
  return String(error)
}
