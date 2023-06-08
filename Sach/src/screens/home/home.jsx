import { StatusBar } from "expo-status-bar";
import { memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AppRouter } from "../../constants";

export const Home = memo(({ navigation }) => {
  const SwitchScreen = (screenName) => {
    navigation.navigate(screenName);
  };
  function Login() {
    navigation.navigate(AppRouter.home);
  }
  function Singup() {
    navigation.navigate(AppRouter.signup);
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerBackground}>
        <Image
          source={require("../../asset/avatar.png")}
          style={{
            width: 150,
            height: 150,
            marginTop: 100,
          }}
        />
        <Text style={{ color: "#fff", marginTop: -5 }}>Wellcome to</Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 30,
            color: "#fff",
            marginTop: 10,
          }}
        >
          ReadBook
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 30,
            color: "#000",
            marginTop: 20,
            marginBottom: 13,
          }}
        >
          Đăng nhập
        </Text>
        <TextInput
          style={{
            width: 300,
            height: 40,
            borderRadius: 10,
            backgroundColor: "#fff",
            borderColor: "#c4c4c4",
            borderWidth: 1,
            paddingLeft: 8,
            marginTop: 20,
          }}
          placeholder='Tài khoản'
        />
        <TextInput
          style={{
            width: 300,
            height: 40,
            borderRadius: 10,
            backgroundColor: "#fff",
            borderColor: "#c4c4c4",
            borderWidth: 1,
            paddingLeft: 8,
            marginTop: 20,
          }}
          placeholder='Mật khẩu'
          secureTextEntry={true}
          // keyboardType="default"
        />
        <TouchableOpacity
          style={{
            width: 256,
            height: 44,
            borderRadius: 20,
            alignContent: "center",
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
            marginTop: 50,
          }}
          onPress={() => Login()}
        >
          <Text style={{ color: "#000", alignSelf: "center", fontSize: 20 }}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ marginTop: 20 }}>
        <Text>Nếu bạn chưa có tài khoản</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginTop: 30,
          width: 256,
          height: 44,
          borderRadius: 20,
          alignContent: "center",
          justifyContent: "center",
          backgroundColor: "#191970",
          marginTop: 10,
        }}
        onPress={() => Singup()}
      >
        <Text style={{ color: "#fff", alignSelf: "center", fontSize: 20 }}>
          Đăng ký
        </Text>
      </TouchableOpacity>
      <StatusBar style='auto' />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  containerBackground: {
    width: "100%",
    height: "80%",
    left: 0,
    backgroundColor: "#191970",
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    alignItems: "center",
  },
});
