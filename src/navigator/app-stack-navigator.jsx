import { memo, useMemo } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Tabbar, tw } from '../components'
import { AppRouter } from '../constants'
import {
  BookAdvertising,
  BookDetail,
  BookView,
  CategoryDetail,
  ChangePassword,
  Login,
  Singup,
  UpdateProfile,
} from '../screens'

const Stack = createNativeStackNavigator()

export const AppStackNavigator = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="bottom-tab" component={Tabbar} options={{ headerShown: false }} />
      {/* screen  */}
      <Stack.Screen name={AppRouter.bookDetail} component={BookDetail} options={{ headerShown: true }} />
      <Stack.Screen
        name={AppRouter.bookView}
        component={BookView}
        options={({ route }) => ({
          headerShown: true,
          title: route.params.headerTitle,
        })}
      />
      <Stack.Screen name={AppRouter.categoryDetail} component={CategoryDetail} options={{ headerShown: true }} />
      <Stack.Screen name={AppRouter.updateProfile} component={UpdateProfile} options={{ headerShown: true }} />
      <Stack.Screen name={AppRouter.changePassword} component={ChangePassword} options={{ headerShown: true }} />
    </Stack.Navigator>
  )
})
