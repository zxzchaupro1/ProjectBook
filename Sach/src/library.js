import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
// import { create, createStore } from "zustand";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import cartStore from "./cartStore";



export default function Library({ navigation, route }) {
  const info = route
  const [listProduct, setListProduct] = useState();
  const [number, setNumber] = useState();
  const [total, setTotal] = useState();
  const [check, setCheck] = useState(false)

  const count = cartStore(state => state.count);
  const addCount = cartStore(state => state.addCount);
  const subtractCount = cartStore(state => state.subtractCount);

  const listCartP = cartStore(state => state.listProducCart)
  const listttt = cartStore(state => state.list);

  const getListProduct = async () => {
    await fetch("https://645b097765bd868e93293770.mockapi.io/buyed")
      .then((Response) => Response.json())
      .then((json) => {
        setListProduct(json);
        // console.log("list", listProduct);
        listCartP(json)
        console.log(listttt);

        setNumber(json.length)
        let amountOfMoney = 0
        let money = 0
        for (let i = 0; i < json.length; i++) {
          money = json[i].price
          amountOfMoney += money
        }
        setTotal(amountOfMoney)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getListProduct();
  }, []);
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
          Thư viện
        </Text>
      </View>
      <Text
        style={{
          marginTop: 15,
          marginBottom: 15,
          marginLeft: 15,
          fontSize: 20,
          fontWeight: "500",
        }}
      >
        Tổng số: {number} sản phẩm
      </Text>

      <StatusBar style="auto" />
      <View style={{ flex: 10, backgroundColor: '#F7F7F7' }}>
        <FlatList
          data={listProduct}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', padding: 20, backgroundColor: '#fff', margin: 15, borderRadius: 10 }}>
              <Image
                style={{ width: 150, height: 150, marginLeft: -40 }}
                source={{ uri: item.imageBook }}
                resizeMode="contain"
              />
              <View>
                <Text style={{ fontSize: 15, fontWeight: '700' }}>{item.name}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    flex: 1,
  },
});
