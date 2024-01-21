import { useEffect, useState, memo } from 'react'
import { StatusBar } from 'expo-status-bar'

import { useAuth } from '../contexts'
import { StyleSheet, View } from 'react-native'
import { Image } from '@rneui/themed'
import { RootNavigator } from './root-navigator'
import { tw } from '../components'
import { StorageKeys } from '../constants'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

export const AppNavigator = memo(() => {
  const [appIsReady, setAppIsReady] = useState(false)

  const { isLoggedIn } = useAuth()

  useEffect(() => {
    ;(async () => {
      setTimeout(() => {
        setAppIsReady(true)
      }, 2000)
    })()
  }, [])

  if (!appIsReady) {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../src/asset/avatar.png')}
          style={{
            width: 200,
            height: 200,
          }}
        />
      </View>
    )
  }

  return (
    <>
      <StatusBar backgroundColor={tw.color('bg-white')} style="dark" />
      <RootNavigator isLoggedIn={isLoggedIn} />
    </>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191970',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
