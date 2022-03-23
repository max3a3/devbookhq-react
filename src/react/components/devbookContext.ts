import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import { useDevbook } from '@devbookhq/sdk'

interface DevbookProviderProps {
  children: React.ReactNode | React.ReactNode[] | null
}

export const devbookContext = createContext<ReturnType<typeof useDevbook> | null>(null)

export function DevbookProvider({ children }: DevbookProviderProps) {
  const devbook = useDevbook({
    env: 'dbk-dev-env',
    debug: true,
    config: { domain: 'dev.usedevbook.com' },
  })

  const forceUpdate = useReducer(() => ({}), {})[1]

  useEffect(() => {
    forceUpdate()
  }, [devbook.status, forceUpdate])

  return (
    <devbookContext.Provider value={devbook}>
      {children}
    </devbookContext.Provider>
  )
}

export const useFixedDevbook = () => useContext(devbookContext)
