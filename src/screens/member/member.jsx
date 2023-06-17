import { Button, Divider, Image, Text } from "@rneui/themed";
import React, { memo } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Screen } from "react-native-screens";
import { tw } from "../../components";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { AppRouter } from "../../constants";

export const Member = memo(({ route }) => {
  console.log("route", route);
  const navigation = useNavigation();
  return (
    <Screen style={styles.container}>
      <View style={styles.containerBackground}>
        <View style={tw`flex justify-center items-center`}>
          <Image
            source={require("../../asset/avatar.png")}
            style={{
              width: 150,
              height: 150,
              marginTop: 100,
            }}
          />
          <Text style={{ color: "#fff", marginTop: -5, fontSize: 18 }}>
            Trở thành hội viên của ReadBook
          </Text>
        </View>
        <View style={tw`pl-24px`}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 30,
              color: "#fff",
              marginTop: 24,
            }}
          >
            ƯU ĐÃI CÓ HẠN
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 30,
              color: "#fff",
            }}
          >
            CHO NGƯỜI DÙNG MỚI
          </Text>
        </View>
        <View style={tw`w-140px px-24px m-8px`}>
          <Divider width={3} color='#fff' />
        </View>
        <View style={tw`pl-24px`}>
          <View style={tw`flex-row py-4px items-center`}>
            <Image
              source={require("../../asset/tick-circle.png")}
              style={{
                width: 20,
                height: 20,
              }}
            />
            <Text style={tw`pl-8px text-white`}>
              Các khuyến mại độc quyền tại Readbook
            </Text>
          </View>
          <View style={tw`flex-row py-4px items-center`}>
            <Image
              source={require("../../asset/tick-circle.png")}
              style={{
                width: 20,
                height: 20,
              }}
            />
            <Text style={tw`pl-8px text-white`}>
              Đề xuất dành riêng cho bạn.
            </Text>
          </View>
          <View style={tw`flex-row py-4px items-center`}>
            <Image
              source={require("../../asset/tick-circle.png")}
              style={{
                width: 20,
                height: 20,
              }}
            />
            <Text style={tw`pl-8px text-white`}>
              Mở khóa đầy đủ nội dung sách.
            </Text>
          </View>
        </View>
        <View style={tw`w-full px-24px my-16px`}>
          <Divider width={1} color='#fff' />
        </View>
        <View
          style={tw`border border-white bg-white h-62px mx-80px rounded flex-row justify-between items-center px-24px mt-10px`}
        >
          <Text style={tw`text-13px`}>Chỉ với:</Text>
          <Text style={tw`text-36px font-bold`}>78,000 đ</Text>
        </View>
      </View>
      <View style={tw`pl-24px mt-8px`}>
        <Text style={styles.dieukhoan}>Điều khoản sử dụng</Text>
        <Text style={tw`text-13px p-8px`}>
          Khi ấn thanh toán đồng nghĩa với việc bạn đồng í với điều khoản sử
          dụng của ReadBook
        </Text>
      </View>
      <View style={tw`flex-1 w-full px-60px mt-8px`}>
        <Button
          title='Thanh toán'
          onPress={() =>
            navigation.navigate(AppRouter.payment, {
              user: route?.params.user,
            })
          }
        />
      </View>
      <StatusBar style='auto' />
    </Screen>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dieukhoan: {
    textDecorationLine: "underline",
    fontSize: 14,
    paddingLeft: 8,
  },
  containerBackground: {
    width: "100%",
    height: "80%",
    left: 0,
    backgroundColor: "#191970",
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
  },
});
