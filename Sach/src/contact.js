import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";

export default function Contact({ navigation, route }) {
  const info = route.params;
  useEffect(() => {
  }, []);
  return (
    <View>
      <View
        style={{
          backgroundColor: "#191970",
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 30,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.55,
          shadowRadius: 14.78,

          elevation: 22,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Library');
          }}
          style={{ padding: 20 }}
        >
          <Image
            source={require("../src/asset/back.png")}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            color: "#fff",
          }}
        >
         {info.item.name}
        </Text>
      </View>
      <ScrollView>
      <View style={{}}>
        <Text>{info.item.content}</Text>
      </View></ScrollView>
    </View>
  );
}
