import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity
} from "react-native";

import { Alert } from "react-native";

export default function Home({ navigation }) {
  const [listCustomer, setListCustomer] = useState();

  const getListCustomer = async () => {
    await fetch("https://6459c36b8badff578e13fe4c.mockapi.io/Book")
      .then((response) => response.json())
      .then((json) => {
        setListCustomer(json);
        console.log("list", listCustomer);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const goToDetail = (item) => {
    navigation.navigate('InfoProduct', { item: item })
  }

  useEffect(() => {
    getListCustomer();
  }, []);

  const dataDanhMuc = [
    {
      name: "Tất cả",
    },
    {
      name: "Tâm lý - kỹ năng sống",
    },
    {
      name: "Truyện ma",
    },
    {
      name: "Truyện hài",
    },

  ];
  //Item Chuyện cổ tích
  const renderItem = ({ item }) => {
    if (item.topic === ("Cổ tích")) {
      return (
        <View
          style={{
            width: 130,
            height: 160,
            backgroundColor: "#FFF",
            margin: 5,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            padding: 22,
          }}
        >
          <TouchableOpacity onPress={() => goToDetail(item)}>
            <Image
              source={{ uri: item.imageBook }}
              style={{ width: 100, height: 100, marginBottom: 8 }}
            />
            <Text>{item.name}</Text>
            <Text>{item.dependencies}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };
  //Item Chuyện cười
  const renderItem1 = ({ item }) => {
    if (item.topic === ("Truyện Cười")) {
      return (
        <View
          style={{
            width: 130,
            height: 160,
            backgroundColor: "#FFF",
            margin: 5,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            padding: 22,
          }}
        >
          <TouchableOpacity onPress={() => goToDetail(item)}>
            <Image
              source={{ uri: item.imageBook }}
              style={{ width: "100%", height: "50%", marginBottom: 8 }}
              resizeMode="contain"
            />
            <Text style={{ justifyContent: "center" }}>{item.name}</Text>
            <Text>{item.dependencies}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };
  //Item Chuyện ma
  const renderItem2 = ({ item }) => {
    if (item.topic === ("Kinh dị")) {
      return (
        <View
          style={{
            width: 130,
            height: 160,
            backgroundColor: "#FFF",
            margin: 5,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            padding: 22,
          }}
        >
          <TouchableOpacity onPress={() => goToDetail(item)}>
            <Image
              source={{ uri: item.imageBook }}
              style={{ width: "100%", height: "50%", marginBottom: 8 }}
              resizeMode="contain"
            />
            <Text style={{ justifyContent: "center" }}>{item.name}</Text>
            <Text>{item.dependencies}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };
  //Item Tiểu thuyết
  const renderItem3 = ({ item }) => {
    if (item.topic === ("Tiểu thuyết")) {
      return (
        <View
          style={{
            width: 130,
            height: 160,
            backgroundColor: "#FFF",
            margin: 5,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            padding: 22,
          }}
        >
          <TouchableOpacity onPress={() => goToDetail(item)}>
            <Image
              source={{ uri: item.imageBook }}
              style={{ width: "100%", height: "50%", marginBottom: 8 }}
              resizeMode="contain"
            />
            <Text style={{ justifyContent: "center" }}>{item.name}</Text>
            <Text>{item.dependencies}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };


  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            flex: 2,
            backgroundColor: "#191970",
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 13,
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
          <Image
            source={require("../src/asset/avatar.png")}
            style={{ width: 60, height: 60, marginTop: 40 }}
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 25,
              color: "#fff",
              marginLeft: -1,
              marginTop: 30
            }}
          >
            Xin chào
          </Text>
        </View>

        <View style={{ flex: 10 }}>

          <View style={{ flex: 10, width: "100%" }}>
            <View
              style={{
                backgroundColor: "#191970",
                height: 240,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
              }}
            >
              <View
                style={{
                  backgroundColor: "#ffffff",
                  width: "90%",
                  height: 47,
                  alignSelf: "center",
                  marginTop: 11,
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 20, height: 20, marginLeft: 16 }}
                  source={require("../src/asset/search.png")}
                />

                <TextInput
                  style={{ width: "100%", height: "100%", marginLeft: 11 }}
                  placeholder="Tìm kiếm sản phẩm"
                  placeholderTextColor="#808080"
                  onChangeText={() => { }}
                  onFocus={() => { navigation.navigate('Search') }}
                />
              </View>
            </View>

            <View
              // flashlish 1
              style={{
                height: 100,
                backgroundColor: "white",
                width: "90%",
                justifyContent: "center",
                alignSelf: "center",
                position: "absolute",
                top: 110,
                borderRadius: 29,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                padding: 22,
              }}
            >
              <FlatList
                //Cột, hàng
                horizontal={true}
                // numColumns={3}
                data={dataDanhMuc}
                renderItem={({ item }) => (
                  <View
                    style={{
                      width: 90,
                      height: 50,
                      backgroundColor: "#191970",
                      margin: 5,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                    }}
                  >
                    <Text style={{ color: "#fff" }}>{item.name}</Text>
                  </View>
                )}
                keyExtractor={(item) => item.name}
              />
            </View>
            <View
              //FlatList 2
              style={{
                backgroundColor: "white",
                width: "100%",
                justifyContent: "center",
                alignSelf: "center",

                borderRadius: 29,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                padding: 22,
                alignItems: "center",

                marginTop: 30,
                marginBottom: 20
              }}
            >
              <View style = {{ flex: 8}}>
              <Text style = {{fontSize: 20 , fontWeight: '700', marginLeft: -50}}>Truyện cổ tích</Text>
              <FlatList style = {{margin:5}}
                // Cột hàng 
                horizontal={true}
                // numColumns={3}
                data={listCustomer}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
              />

              <Text style = {{fontSize: 20 , fontWeight: '700', marginLeft: -50}}>Truyện cười</Text>
              <FlatList
                // Cột hàng 
                horizontal={true}
                // numColumns={3}
                data={listCustomer}
                renderItem={renderItem1}
                keyExtractor={(item) => item.id.toString()}
              />
              <Text style = {{fontSize: 20 , fontWeight: '700', marginLeft: -50}}>Truyện ma</Text>
              <FlatList
                // Cột hàng 
                horizontal={true}
                // numColumns={3}
                data={listCustomer}
                renderItem={renderItem2}
                keyExtractor={(item) => item.id.toString()}
              />
              <Text style = {{fontSize: 20 , fontWeight: '700', marginLeft: -50}}>Tiểu thuyết</Text>
              <FlatList
                // Cột hàng 
                horizontal={true}
                // numColumns={3}
                data={listCustomer}
                renderItem={renderItem3}
                keyExtractor={(item) => item.id.toString()}
              /></View>
            </View>
          </View>

        </View>
        <StatusBar style="auto" />
      </View></ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    flex: 1,
  },
});
