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

export const UpdateProfile = memo(() => {
  const { user, logout } = useAuth()
  const [loading, setLoading] = useState(false)

  const validationSchema = useMemo(
    () =>
      zod.object({
        email: zod
          .string({ required_error: validationMessage.required })
          .nonempty({ message: validationMessage.required })
          .regex(REGEXP.email, { message: 'Email không đúng định dạng' }),
        phoneNumber: zod
          .string({ required_error: validationMessage.required })
          .nonempty({ message: validationMessage.required })
          .regex(REGEXP.phone, { message: 'Phone không đúng định dạng' }),
        fullname: zod
          .string({ required_error: validationMessage.required })
          .nonempty({ message: validationMessage.required }),
        age: zod
          .string({ required_error: validationMessage.required })
          .nonempty({ message: validationMessage.required }),
        // password: zod
        //   .string({ required_error: validationMessage.required })
        //   .nonempty(validationMessage.required)
        //   .min(6, 'Mật khẩu tối thiểu 6 ký tự')
        //   .regex(REGEXP.at_least_one_number_and_one_letter, 'Mật khẩu bao gồm chữ cái và số'),
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
      fullname: user?.username,
      age: user?.age ? user?.age.toString() : '',
      phoneNumber: user?.phoneNumber ? '0' + user?.phoneNumber.toString() : '',
    },
  })

  const handleLogin = (values) => {
    setLoading(true)

    updateProfileApi(user?._id, {
      userName: values.fullname,
      password: values.password,
      phoneNumber: values.phoneNumber,
      email: values.email,
      age: +values?.age,
    })
      .then(async (res) => {
        showMessage({
          type: 'success',
          message: 'Cập nhật thông tin tài khoản thành công',
          description: 'Quý khách vui lòng đăng nhập lại',
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
        <Text style={tw`pt-8px`}></Text>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              required
              label="Số điện thoại"
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
              placeholder="Số điện thoại"
              clearButtonMode="while-editing"
              borderVisibleIfValue={false}
              renderErrorMessage={!!errors.phoneNumber}
              errorMessage={errors.phoneNumber?.message}
              autoCapitalize="none"
            />
          )}
        />
        <Text style={tw`pt-8px`}></Text>
        <Controller
          name="age"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              required
              label="Tuổi"
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
              placeholder="Tuổi"
              clearButtonMode="while-editing"
              borderVisibleIfValue={false}
              renderErrorMessage={!!errors.age}
              errorMessage={errors.age?.message}
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
