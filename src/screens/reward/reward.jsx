import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput, tw } from '../../components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Screen } from 'react-native-screens'
import { Text } from '@rneui/themed'
import { numberWithDots } from '../../utils'
import { Button } from '@rneui/base'
import { getInfoUser, minuspointApi } from '../../api/auth'
import { useAuth } from '../../contexts'
import { showMessage } from 'react-native-flash-message'

const convertedPrice = 10000

export const RewardPage = React.memo(() => {
  const { user } = useAuth()

  const [loading, setLoading] = useState(false)
  const [defaultPoint, setDefaultPoint] = useState(0)
  const [value, setValue] = useState(0)

  const handleReward = () => {
    if (!user || !value) return
    setLoading(true)
    minuspointApi(user._id, value)
      .then(() => {
        setValue(0)
        showMessage({
          type: 'success',
          message: 'Nhận thưởng thành công',
        })
      })
      .catch((err) => {
        showMessage({
          type: 'danger',
          message: 'Nhận thưởng thất bại',
          description: err?.message,
        })
      })
      .finally(() => {
        getInfoUser(user?._id).then((res) => {
          if (res?.data?.data) {
            setDefaultPoint(res?.data?.data?.pointTotal ?? 0)
          }
        })
        setLoading(false)
      })
  }

  useEffect(() => {
    getInfoUser(user?._id).then((res) => {
      if (res?.data?.data) {
        setDefaultPoint(res?.data?.data?.pointTotal ?? 0)
      }
    })
  }, [])

  return (
    <Screen style={styles.container}>
      <SafeAreaView style={styles.containerBackground}>
        <View style={styles.box}>
          <View>
            <Text style={styles.point}>
              {defaultPoint ?? 0} <Text style={styles.pointLabel}>ĐIỂM</Text>
            </Text>
          </View>
          <Text style={tw`text-[#fff] px-[18px]`}>=</Text>
          <View style={tw`flex flex-row`}>
            <Text style={styles.money}>{numberWithDots((defaultPoint ?? 0) * convertedPrice)}</Text>
            <Text style={tw`text-[#fff]`}>VNĐ</Text>
          </View>
        </View>
        <View>
          <Text style={tw`text-[#000] text-[16px] font-medium mt-[24px]`}>
            Chương trình đọc sách đổi thưởng cùng READBOOK
          </Text>
          <Text style={tw`mt-[8px]`}>Điều kiện áp dụng: Dành cho quý khách có 500 điểm trở lên</Text>
          <Text>Mức điểm đổi tối thiểu: 100 điểm trở lên</Text>
          <Text>Thời gian áp dụng: Đến ngày 02/02/2024</Text>
        </View>
        <View style={[styles.box2, tw`mt-[30px]`]}>
          <View style={tw`flex flex-row justify-center mt-[20px]`}>
            <Text style={styles.money}>{numberWithDots((value ?? 0) * convertedPrice)}</Text>
            <Text style={tw`text-[#fff]`}>VNĐ</Text>
          </View>
          <View style={tw`w-full text-[#fff] flex flex-row justify-center p-[18px]`}>
            <Text style={tw`text-[#fff] `}>=</Text>
          </View>
          <TextInput
            value={value}
            onChangeText={(newValue) => {
              const number = Number(newValue)
              if (number > defaultPoint) {
                setValue(defaultPoint)
              } else {
                setValue(number)
              }
            }}
            inputContainerStyle={{
              height: 42,
              borderRadius: 10,
              backgroundColor: '#fff',
              borderColor: '#c4c4c4',
              borderWidth: 1,
              paddingLeft: 8,
            }}
            maxLength={255}
            placeholder="Điểm cần đổi"
            clearButtonMode="while-editing"
            borderVisibleIfValue={false}
          />
        </View>
        <View style={tw`w-full px-60px mt-36px`}>
          <Button title="Rút tiền" buttonStyle={tw`bg-[#191970] rounded`} loading={loading} onPress={handleReward} />
        </View>
      </SafeAreaView>
    </Screen>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBackground: {
    marginTop: 24,
    marginLeft: 16,
    marginRight: 16,
  },
  box: {
    borderRadius: 8,
    backgroundColor: '#191970',
    width: '100%',
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  point: {
    color: 'white',
    fontSize: 16,
    fontWeight: 600,
  },
  pointLabel: {
    color: 'white',
    fontSize: 16,
  },
  money: {
    color: 'white',
    fontSize: 28,
    fontWeight: 700,
  },
  moneyLabel: {
    color: 'white',
  },
  box2: {
    borderRadius: 8,
    backgroundColor: '#191970',
    width: '100%',
  },
})
