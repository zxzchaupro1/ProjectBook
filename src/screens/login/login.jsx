import { memo, useMemo, useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { AppRouter, REGEXP, validationMessage } from '../../constants'
import { TextInput, tw } from '../../components'
import { Button } from '@rneui/themed'
import { loginApi } from '../../api/auth'
import { useAuth } from '../../contexts'
import { showMessage } from 'react-native-flash-message'
import { useNavigation } from '@react-navigation/native'

export const Login = memo(() => {
  const navigation = useNavigation()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const validationSchema = useMemo(
    () =>
      zod.object({
        email: zod
          .string({ required_error: validationMessage.required })
          .nonempty({ message: validationMessage.required })
          .regex(REGEXP.email, { message: 'Email không đúng định dạng' }),
        password: zod
          .string({ required_error: validationMessage.required })
          .nonempty(validationMessage.required)
          .min(6, 'Mật khẩu tối thiểu 6 ký tự'),
        // .regex(
        //   REGEXP.at_least_one_number_and_one_letter,
        //   "Mật khẩu bao gồm chữ cái và số",
        // ),
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

  function Singup() {
    navigation.navigate(AppRouter.signup)
  }

  const handleLogin = (values) => {
    setLoading(true)
    loginApi(values)
      .then((res) => {
        login({ ...res.data.data })
      })
      .catch((err) => {
        console.log('login failed', err)
        showMessage({
          description: err?.message,
          message: 'Đăng nhập thất bại vui lòng thử lại',
          type: 'danger',
        })
      })
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerBackground}>
        <Image
          source={require('../../asset/avatar.png')}
          style={{
            width: 150,
            height: 150,
            marginTop: 100,
          }}
        />
        <Text style={{ color: '#fff', marginTop: -5 }}>Chào mừng bạn đến với ReadBook</Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            color: '#fff',
            marginTop: 24,
          }}
        >
          Đăng nhập
        </Text>
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
          <Button title="Đăng nhập" onPress={handleSubmit(handleLogin)} loading={loading} />
        </View>
      </View>
      <TouchableOpacity style={{ marginTop: 40 }}>
        <Text>Nếu bạn chưa có tài khoản</Text>
      </TouchableOpacity>
      <Text
        style={{
          color: '#191970',
          alignSelf: 'center',
          fontSize: 16,
        }}
        onPress={() => Singup()}
      >
        Đăng ký
      </Text>
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
    height: '80%',
    left: 0,
    backgroundColor: '#191970',
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    alignItems: 'center',
  },
})
