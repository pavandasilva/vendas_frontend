import { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'

interface UseLogar {
  error: any
}

export default function useLogout () {
  const { push } = useHistory()
  const [response, setResponse] = useState({ error: null } as UseLogar)

  const execLogout = useCallback(() => {
    try {
      localStorage.removeItem(`@${process.env.REACT_APP_NAME}:token`)
      push('/login')
    } catch (error) {
      setResponse({ error })
    }
  }, [])

  return [response, execLogout] as const
}
