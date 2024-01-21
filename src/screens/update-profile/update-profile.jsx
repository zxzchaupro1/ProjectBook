import { memo, useMemo, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { StyleSheet, Text, View } from 'react-native'
import { AppRouter, REGEXP, validationMessage } from '../../constants'
import { TextInput, tw } from '../../components'
import { Button } from '@rneui/themed'
import { updateProfileApi } from '../../api/auth'
import { useAuth } from '../../contexts'
import { showMessage } from 'react-native-flash-message'
import { useNavigation } from '@react-navigation/native'

export const UpdateProfile = memo(() => {
  const navigation = useNavigation()
  const { user, login } = useAuth()
  const [loading, setLoading] = useState(false)
  const validationSchema = useMemo(
    () =>
      zod.object({
        email: zod
          .string({ required_error: validationMessage.required })
          .nonempty({ message: validationMessage.required })
          .regex(REGEXP.email, { message: 'Email không đúng định dạng' }),
        fullname: zod
          .string({ required_error: validationMessage.required })
          .nonempty({ message: validationMessage.required }),
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
    defaultValues: {
      email: user?.email,
      fullname: user?.fullname,
    },
  })

  const handleLogin = (values) => {
    setLoading(true)

    updateProfileApi(user?._id, values)
      .then(async (res) => {
        login(res.data)
        showMessage({
          type: 'success',
          message: 'Cập nhật thông tin tài khoản thành công',
        })
        navigation.navigate(AppRouter.account)
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
    <View style={styles.container}>
      <View style={styles.containerBackground}>
        <Controller
          name="fullname"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              required
              label="Họ và tên"
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
              placeholder="Nhập họ và tên"
              clearButtonMode="while-editing"
              borderVisibleIfValue={false}
              renderErrorMessage={!!errors.fullname}
              errorMessage={errors.fullname?.message}
              autoCapitalize="none"
            />
          )}
        />
        <Text style={tw`pt-8px`}></Text>
        <Controller
          name="email"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              required
              label="Email"
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
              placeholder="Email"
              clearButtonMode="while-editing"
              borderVisibleIfValue={false}
              renderErrorMessage={!!errors.email}
              errorMessage={errors.email?.message}
              autoCapitalize="none"
            />
          )}
        />
      </View>
      <View style={tw`flex-1 justify-end w-full px-60px mb-24px`}>
        <Button title="Cập nhật" onPress={handleSubmit(handleLogin)} loading={loading} />
      </View>
      <StatusBar style="auto" />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  containerBackground: {
    width: '100%',
    height: '80%',
    left: 0,
    backgroundColor: '#fff',
    marginTop: 24,
    padding: 16,
  },
})
