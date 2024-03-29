import { memo, useMemo, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { AppRouter, REGEXP, validationMessage } from '../../constants'
import { TextInput, tw } from '../../components'
import { Button } from '@rneui/themed'
import { registerApi } from '../../api/auth'
import { showMessage } from 'react-native-flash-message'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const Singup = memo(({ navigation }) => {
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
        password: zod
          .string({ required_error: validationMessage.required })
          .nonempty(validationMessage.required)
          .min(6, 'Mật khẩu tối thiểu 6 ký tự')
          .regex(REGEXP.at_least_one_number_and_one_letter, 'Mật khẩu bao gồm chữ cái và số'),
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

  const handleRegister = (values) => {
    setLoading(true)
    registerApi({
      userName: values.fullname,
      password: values.password,
      phoneNumber: values.phoneNumber,
      email: values.email,
      age: 18,
    })
      .then((res) => {
        showMessage({
          type: 'success',
          message: 'Đăng ký thành công',
        })
        navigation.navigate(AppRouter.login)
      })
      .catch((err) => {
        console.log('register err', err)
        showMessage({
          description: err?.message,
          message: 'Đăng ký thất bại vui lòng thử lại',
          type: 'danger',
        })
      })
    setLoading(false)
  }
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={styles.containerBackground}>
        <View style={styles.center}>
          <Image
            source={require('../../asset/avatar.png')}
            style={{
              width: 150,
              height: 150,
              marginTop: 80,
            }}
          />
        </View>
        <Text style={{ color: '#fff', marginTop: -5, textAlign: 'center' }}>Chào mừng bạn đến với ReadBook</Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            color: '#fff',
            marginTop: 24,
            textAlign: 'center',
          }}
        >
          Đăng ký
        </Text>
        <Controller
          name="fullname"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
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
                marginTop: 20,
              }}
              maxLength={255}
              placeholder="Họ và tên"
              clearButtonMode="while-editing"
              borderVisibleIfValue={false}
              renderErrorMessage={!!errors.fullname}
              errorMessage={errors.fullname?.message}
              autoCapitalize="none"
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
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
                marginTop: 20,
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
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
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
                marginTop: 20,
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
        <Controller
          name="password"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              inputContainerStyle={{
                height: 42,
                borderRadius: 10,
                backgroundColor: '#fff',
                borderColor: '#c4c4c4',
                borderWidth: 1,
                paddingLeft: 8,
                marginTop: 20,
              }}
              placeholder="Nhập mật khẩu"
              value={value}
              onBlur={onBlur}
              clearButtonMode="while-editing"
              onChangeText={onChange}
              secureTextEntry
              toggleSecureTextIcon
              errorMessage={errors.password?.message}
            />
          )}
        />

        <View style={tw`flex-1 w-full px-60px`}>
          <Button title="Đăng ký" onPress={handleSubmit(handleRegister)} loading={loading} />
        </View>
      </KeyboardAwareScrollView>
      <View style={tw`py-36px`}>
        <Text>Bạn là hội viên của Readbook</Text>
        <Text
          style={{
            color: '#191970',
            alignSelf: 'center',
            fontSize: 16,
          }}
          onPress={() => navigation.navigate(AppRouter.login)}
        >
          Đăng nhập
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  containerBackground: {
    width: '100%',
    height: '75%',
    backgroundColor: '#191970',
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
  },
  center: {
    alignItems: 'center',
  },
})
