import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { AppRouter } from "../../constants";

export function Splash() {
  const navigation =  useNavigation()
  useEffect(() => {setTimeout(() => {
    navigation.navigate("Trang chủ");
  }, 1000);},[])
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../src/asset/avatar.png")}
        style={{
          width: 200,
          height: 200,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191970",
    alignItems: "center",
    justifyContent: "center",
  },
});
