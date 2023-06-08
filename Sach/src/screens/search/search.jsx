import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, memo } from "react";
import { AppRouter } from "../../constants";

export const Search = memo(({ navigation }) => {
  const [listCustomer, setListCustomer] = useState(0);
  const [listSearch, setListSearch] = useState(0);
  const [textSearch, setTextSearch] = useState(0);
  const [loading, setLoading] = useState(false);

  const config = {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  };

  const getListCustomer = async () => {
    setLoading(true);

    await fetch("https://6459c36b8badff578e13fe4c.mockapi.io/Book")
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        setListCustomer(json);
        console.log("list", listCustomer);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const searchResult = async (name) => {
    const newLists = new Array();
    const newList = new Array();
    listCustomer.forEach((element) => {
      if (element.name.includes(name) && name != "") {
        console.log("==", name);
        newLists.push(element);
      } else if (name == "" && !element.name.includes(name)) {
        newLists(newList);
      }
    });
    setListSearch(newLists);
  };
  const goToDetail = (item) => {
    navigation.navigate(AppRouter.book, { item: item });
  };

  useEffect(() => {
    getListCustomer();
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
            source={require("../..//asset/back.png")}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: "#ffffff",
            width: "75%",
            height: 40,
            alignSelf: "center",
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 20, height: 20, marginLeft: 16 }}
            source={require("../..//asset/search.png")}
          />

          <TextInput
            style={{ width: "100%", height: "100%", marginLeft: 11 }}
            placeholder='Tìm kiếm sản phẩm'
            placeholderTextColor='#808080'
            onChangeText={(text) => {
              searchResult(text);
              setTextSearch(text);
            }}
          />
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator
            style={{ marginTop: 20, justifyContent: "center" }}
          />
        ) : null}
        <FlatList
          data={listSearch}
          renderItem={({ item }) => {
            const partialText = item.name.split(textSearch);
            return (
              <View
                style={{
                  flexDirection: "colum",
                  padding: 10,
                  marginBottom: 20,
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderRadius: 20,
                  shadowColor: "#000",
                  shadowOpacity: 0.3,
                  shadowRadius: 20,
                }}
              >
                <TouchableOpacity onPress={() => goToDetail(item)}>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 1, marginLeft: 20 }}>
                      <Text style={{ fontSize: 25, fontWeight: "700" }}>
                        {partialText.map((part, index) => {
                          return (
                            <Text key={index}>
                              {part}
                              {index !== partialText.length - 1 && (
                                <Text
                                  style={{ color: "blue", fontWeight: "900" }}
                                >
                                  {textSearch}
                                </Text>
                              )}
                            </Text>
                          );
                        })}
                      </Text>
                      <Text
                        style={{
                          fontSize: 25,
                          fontWeight: "500",
                          color: "red",
                        }}
                      >
                        {new Intl.NumberFormat("vi-VN", config).format(
                          item.price,
                        )}
                      </Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: 150 }}>
                      <Image
                        source={{ uri: item.imageBook }}
                        style={{
                          width: "100%",
                          height: "100%",
                          marginBottom: 8,
                        }}
                        resizeMode='contain'
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
