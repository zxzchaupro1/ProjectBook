import { createContext, useContext, useState, useEffect } from 'react'
import { StorageKeys } from '../constants'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

const AuthContext = createContext({
  isLoggedIn: false,
  isCheckedMe: false,
  login() {
    throw new Error('not-ready')
  },
  logout() {
    throw new Error('not-ready')
  },
  saveUserInfo() {
    throw new Error('not-ready')
  },
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const { getItem, setItem, removeItem } = useAsyncStorage(StorageKeys.user_info)

  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const [user, setUser] = useState()

  const login = async (data) => {
    await setItem(JSON.stringify(data))
    setIsLoggedIn(true)
    setUser(data)
  }

  const logout = async () => {
    await removeItem()
    setIsLoggedIn(false)
    setUser(undefined)
  }

  useEffect(() => {
    ;(async () => {
      const res = await getItem()
      const user_info = JSON.parse(res)
      if (user_info.fullname) {
        console.log('user_info', user_info)
        setUser(user_info)
        setIsLoggedIn(true)
      }
    })()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
