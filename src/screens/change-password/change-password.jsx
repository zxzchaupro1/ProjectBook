import { memo, useMemo, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { REGEXP, validationMessage } from '../../constants'
import { TextInput, tw } from '../../components'
import { Button } from '@rneui/themed'
import { changePWApi } from '../../api/auth'
import { useAuth } from '../../contexts'
import { showMessage } from 'react-native-flash-message'
import { useNavigation } from '@react-navigation/native'
import { Screen } from 'react-native-screens'

export const ChangePassword = memo(() => {
  const navigation = useNavigation()
  const { user, logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const validationSchema = useMemo(
    () =>
      zod
        .object({
          currentPassword: zod
            .string({ required_error: validationMessage.required })
            .nonempty(validationMessage.required)
            .min(6, 'Mật khẩu tối thiểu 6 ký tự')
            .regex(REGEXP.at_least_one_number_and_one_letter, 'Mật khẩu bao gồm chữ cái và số'),
          password: zod
            .string({ required_error: validationMessage.required })
            .nonempty(validationMessage.required)
            .min(6, 'Mật khẩu tối thiểu 6 ký tự')
            .regex(REGEXP.at_least_one_number_and_one_letter, 'Mật khẩu bao gồm chữ cái và số'),
          confirmPassword: zod
            .string({ required_error: validationMessage.required })
            .nonempty(validationMessage.required)
            .min(6, 'Mật khẩu tối thiểu 6 ký tự')
            .regex(REGEXP.at_least_one_number_and_one_letter, 'Mật khẩu bao gồm chữ cái và số'),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: 'Mật khẩu xác nhận không trùng khớp',
          path: ['confirmPassword'],
        }),
    [],
  )

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
  })

  const handleChangePassword = ({ currentPassword, confirmPassword }) => {
    setLoading(true)

    changePWApi(user?._id, { oldPassword: currentPassword, newPassword: confirmPassword })
      .then(async (res) => {
        showMessage({
          type: 'success',
          message: 'Đổi mật khẩu thành công!',
          description: 'Bạn cần đăng nhập lại với mật khẩu mới để tiếp tục sử dụng Readbook App',
        })
        logout()
      })
      .catch((err) => {
        showMessage({
          description: err?.message,
          message: 'Cập nhật tài khoản thất bại vui lòng thử lại',
          type: 'danger',
        })
      })
    setLoading(false)
  }

  return (
    <Screen style={styles.container}>
      <SafeAreaView style={styles.containerBackground}>
        <Controller
          name="currentPassword"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              required
              label="Mật khẩu cũ"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              inputContainerStyle={{
                height: 42,
                borderRadius: 10,
                backgroundColor: '#fff',
                borderColor: '#c4c4c4',
                borderWidth: 1,
                paddingLeft: 8,
              }}
              maxLength={255}
              placeholder="Nhập Mật khẩu cũ"
              secureTextEntry
              toggleSecureTextIcon
              borderVisibleIfValue={false}
              renderErrorMessage={!!errors.currentPassword}
              errorMessage={errors.currentPassword?.message}
              autoCapitalize="none"
            />
          )}
        />
        <Text style={tw`pt-8px`}></Text>
        <Controller
          name="password"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              required
              label="Mật khẩu mới"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              inputContainerStyle={{
                height: 42,
                borderRadius: 10,
                backgroundColor: '#fff',
                borderColor: '#c4c4c4',
                borderWidth: 1,
                paddingLeft: 8,
              }}
              maxLength={255}
              placeholder="Nhập Mật khẩu mới"
              secureTextEntry
              toggleSecureTextIcon
              borderVisibleIfValue={false}
              renderErrorMessage={!!errors.password}
              errorMessage={errors.password?.message}
              autoCapitalize="none"
            />
          )}
        />
        <Text style={tw`pt-8px`}></Text>

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              required
              label="Xác nhận mật khẩu"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              inputContainerStyle={{
                height: 42,
                borderRadius: 10,
                backgroundColor: '#fff',
                borderColor: '#c4c4c4',
                borderWidth: 1,
                paddingLeft: 8,
              }}
              maxLength={255}
              placeholder="Nhập Xác nhận mật khẩu"
              secureTextEntry
              toggleSecureTextIcon
              borderVisibleIfValue={false}
              renderErrorMessage={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
              autoCapitalize="none"
            />
          )}
        />
        <View style={tw`w-full px-60px mt-36px`}>
          <Button title="Cập nhật" onPress={handleSubmit(handleChangePassword)} loading={loading} disabled={loading} />
        </View>
      </SafeAreaView>
      <StatusBar style="auto" />
    </Screen>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerBackground: {
    marginTop: 24,
    marginLeft: 16,
    marginRight: 16,
  },
})
