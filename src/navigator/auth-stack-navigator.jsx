import { memo, useMemo } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { AppRouter } from '../constants'
import { Login, Singup } from '../screens'
import { Member } from '../screens/member'
import { Payment } from '../screens/payment'

const Stack = createNativeStackNavigator()

export const AuthStackNavigator = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={AppRouter.login} component={Login} options={{ headerShown: false }} />
      <Stack.Screen name={AppRouter.signup} component={Singup} options={{ headerShown: false }} />
      <Stack.Screen name={AppRouter.member} component={Member} options={{ headerShown: false }} />
      <Stack.Screen name={AppRouter.payment} component={Payment} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
})
