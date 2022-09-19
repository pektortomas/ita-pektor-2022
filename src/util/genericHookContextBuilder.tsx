// inspired by https://dev.to/svehla/react-typed-state-management-under-10-lines-of-code-1347

import { createContext } from 'react'

type Props = {
  children: React.ReactNode
}

export const genericHookContextBuilder = <T, P>(hook: () => T) => {
  const Context = createContext<T>(undefined as never)

  return {
    Context,
    ContextProvider: (props: Props & P) => {
      const value = hook()

      return <Context.Provider value={value}>{props.children}</Context.Provider>
    },
  }
}
