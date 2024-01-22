import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { tw } from '../../components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Screen } from 'react-native-screens'
import { Text } from '@rneui/themed'
import { numberWithDots } from '../../utils'
import { Button } from '@rneui/base'
import { getInfoUser } from '../../api/auth'
import { useAuth } from '../../contexts'

export const RewardPage = React.memo(() => {
  const { user } = useAuth()

  const [userInfo, setUserInfo] = useState()

  console.log('23232', userInfo)
  useEffect(() => {
    getInfoUser(user?._id).then((res) => {
      if (res?.data?.data) {
        setUserInfo(res?.data?.data)
      }
    })
  }, [])

  return (
    <Screen style={styles.container}>
      <SafeAreaView style={styles.containerBackground}>
        <View style={styles.box}>
          <View>
            <Text style={styles.point}>
              {userInfo?.pointTotal ?? 0} <Text style={styles.pointLabel}>ĐIỂM</Text>
            </Text>
          </View>
          <Text style={tw`text-[#fff] px-[18px]`}>=</Text>
          <View style={tw`flex flex-row`}>
            <Text style={styles.money}>{numberWithDots((userInfo?.pointTotal ?? 0) * 10000)}</Text>
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

        <View style={tw`w-full px-60px mt-36px`}>
          <Button title="Rút tiền" buttonStyle={tw`bg-[#191970] rounded`} />
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
})
