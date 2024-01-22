import React, { useCallback } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Screen } from 'react-native-screens'
import { useNavigation } from '@react-navigation/native'

import { tw } from '../../components'
import { useAuth } from '../../contexts'
import { AppRouter } from '../../constants'
import { FontAwesome, Fontisto, Feather } from '@expo/vector-icons'

export const Account = React.memo(() => {
  const navigation = useNavigation()
  const { logout, user } = useAuth()

  const onLogout = useCallback(() => {
    logout()
  }, [])

  return (
    <Screen>
      <ScrollView contentContainerStyle={tw`grow`}>
        <View style={tw`px-16px pt-16px pb-24px border-b border-grayscale-border`}>
          <View style={tw`flex-row items-center`}>
            <FontAwesome name="user-o" size={38} />
            <View style={tw`ml-12px`}>
              <Text style={tw`text-19px font-semibold text-grayscale-black leading-24px`}>{user?.username}</Text>
              <Text style={tw`text-14px font-semibold text-grayscale-light leading-14px mt-8px`}>{user?.email}</Text>
            </View>
          </View>
        </View>
        <View style={tw`mb-28px mx-16px mt-24px`}>
          <Pressable
            style={tw`flex-row items-center justify-between`}
            onPress={() => navigation.navigate(AppRouter.updateProfile)}
          >
            <FontAwesome name="address-book-o" size={24} />
            <View style={tw`flex-row flex-1 border-b border-grayscale-border ml-16px py-12px`}>
              <Text style={tw`text-14px text-grayscale-black flex-1`}>Cập nhật tài khoản</Text>
            </View>
          </Pressable>
          <Pressable
            style={tw`flex-row items-center justify-between`}
            onPress={() => navigation.navigate(AppRouter.changePassword)}
          >
            <Feather name="unlock" size={24} color="black" />
            <View style={tw`flex-row flex-1 border-b border-grayscale-border ml-16px py-12px`}>
              <Text style={tw`text-14px text-grayscale-black flex-1`}>Đổi mật khẩu</Text>
            </View>
          </Pressable>
          <Pressable
            style={tw`flex-row items-center justify-between`}
            onPress={() => navigation.navigate(AppRouter.rewards)}
          >
            <Fontisto name="arrow-swap" size={24} color="black" />
            <View style={tw`flex-row flex-1 border-b border-grayscale-border ml-16px py-12px`}>
              <Text style={tw`text-14px text-grayscale-black flex-1`}>Đổi thưởng</Text>
            </View>
          </Pressable>
        </View>

        <Pressable style={tw`pb-40px self-center`} onPress={onLogout}>
          <Text style={[tw`font-semibold text-17px`, styles.logout]}>Đăng xuất</Text>
        </Pressable>
      </ScrollView>
    </Screen>
  )
})

const styles = StyleSheet.create({
  logout: {
    textDecorationLine: 'underline',
  },
})
