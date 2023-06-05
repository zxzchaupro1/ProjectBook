import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
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

export default function InfoProduct({ navigation, route }) {
  const info = route.params;
  const config = {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  };

  useEffect(() => {
    console.log(info.item);
  }, []);

  const Save = () => {
    onSave();
    // goback();
  };
  const onSave = () => {
    const newProduct = info.item;
    console.log("Hàm 1 được gọi");
    fetch("https://645b097765bd868e93293770.mockapi.io/ListBook", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }); 
    const goback = () => {
      console.log ("hàm 2 được gọi")
      navigation.navigate('Home')
  
    }
  };

  function gotobuy() {
    navigation.navigate('Cart')

  }

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#191970",
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 50,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 11,
          },
          shadowOpacity: 0.55,
          shadowRadius: 14.78,

          elevation: 22,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.replace("Home");
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
          Chi tiết sản phẩm
        </Text>
        <TouchableOpacity style={{ marginLeft: '25%' }} onPress={() => navigation.navigate('Cart')}>
          <Image
            source={require("../src/asset/shopping-cart.png")}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
      </View><ScrollView>
      <View style={{ padding: 20, flex: 1}}>
        <Image
          source={{ uri: info.item.imageBook }}
          style={{ width: "100%", height: "50%", marginBottom: 8 }}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 30, fontWeight: "700",}}>
          {info.item.name}
        </Text>
        <Text> Tác giả: <Text style={{ fontSize: 15, fontWeight: "700" }}>
          {info.item.author}
        </Text>
        </Text> 
        <Text> Thể loại : <Text style={{ fontSize: 15, fontWeight: "700" }}>
          {info.item.topic}
        </Text>
        </Text> 
        <Text style={{ color: "#EE0033", fontSize: 20, fontWeight: "700" }}>
          {new Intl.NumberFormat("vi-VN", config).format(info.item.price)}
        </Text>
        <Text style={{ marginTop: 5, marginBottom: 10, color: "#191970", fontSize: 20,}}>
          Giới thiệu nội dung
        </Text>
        <ScrollView>
        <Text>{info.item.describe}</Text></ScrollView>
      </View></ScrollView>
      <View style={{ flex: 0.5 , flexDirection: 'row', alignItems: 'center', borderWidth:1}}>
        <TouchableOpacity
          style={{
            width: 190,
            height: 49,
            backgroundColor: "#A5A5A5",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 40,
            marginLeft: 20
          }}
          onPress={() => Save()}
        >
          <Text
            style={{ color: "#fff", fontSize: 20, fontWeight: "400",  }}
          >
            Thêm vào giỏ hàng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
           width: 190,
            height: 49,
            backgroundColor: "#191970",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 40,
            marginLeft: 10
            
            
          }}
          onPress={() => gotobuy()}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "400" }}>
            Mua ngay
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
  },
});
