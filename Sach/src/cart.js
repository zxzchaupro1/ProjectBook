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
export default function Cart({ navigation, route}) {
  const [listProduct, setListProduct] = useState();
  const [number, setNumber] = useState();
  const [total, setTotal] = useState();
  const listCartP = cartStore(state => state.listProducCart)



  useEffect(() => {
    getListProduct();
  }, [total]);


  const getListProduct = async () => {
    await fetch("https://645b097765bd868e93293770.mockapi.io/ListBook")
      .then((Response) => Response.json())
      .then((json) => {
        setListProduct(json);
        listCartP(json)
        setNumber(json.length)
        let total1 = 0
        json.forEach((element) => {
          var tongSoTien = element.price;
          total1 = total1 + tongSoTien;
        });
          console.log("Tiền",total1)
        setTotal(total1)
      })
      .catch((error) => {
        console.log(error);
      });
  };


const postData = async (item) => {
  const response = await fetch("https://645b097765bd868e93293770.mockapi.io/buyed", {
      method: "POST",
      headers: { "Content-Type": "application/json",},
      Accept: "application/json",
      body: JSON.stringify(item),
    });
  };
  
  const MyComponent = () => {
    const myArray = [listProduct];
    console.log ("đây là ",myArray)
    const handlePostData = async () => {
      for (const item of myArray) {
        await postData(item);
      }
    };
  };
  


  const onDelete = (deleteId) => {
    const newList = new Array()
    listProduct.forEach(element => {
      if(element.id != deleteId){
        newList.push(element)
      }
    });
    setListProduct(newList)
    setNumber(newList.length)
    let total = 0
    for (const e of listProduct){
      total+= Number(e.price)
    }
    console.log(amountOfMoney);
    setTotal(total);
  };


  const onDeleteAPI = async(deleteID) => {
    fetch("https://645b097765bd868e93293770.mockapi.io/ListBook/" + deleteID, {
      method: 'DELETE',
    })
    .then(res => {
      if(res.status == 200) {
        // Alert.alert('Thông báo',"Xóa thành công")
        getListProduct()
      } else {
        Alert.alert('Thông báo',"Xóa không thành cong")
      }
    })
  }
  const buy = () => {
    Alert.alert ('Thông báo',"Đã mua thành công")
    return 
  }

  const updateItem = (item, bool) => {

    // console.log(check);
    if (!bool) {
      item.quantityBuy = item.quantityBuy + 1
    item.quantity = item.quantity - 1
    } else {
      item.quantityBuy = item.quantityBuy - 1
    item.quantity = item.quantity + 1
    }
    
    const requestOptions = {
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(item)
    };
    fetch("https://645b097765bd868e93293770.mockapi.io/ListBook/" + item.id, requestOptions)
    .then(res => {
      if(res.status == 200) {
        console.log("Update thanh cong id: " , item.id);
        getListProduct()
      } else {
        console.log("That bai");
      }
    })
  }
  const config = {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  };

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
          Giỏ hàng của tôi
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
            <View style={{flexDirection:'row', padding: 20, backgroundColor: '#fff', margin: 15, borderRadius: 20}}>
              <Image
                style={{ width: 150, height: 150,marginLeft: -40 }}
                source={{ uri: item.imageBook }}
                resizeMode="contain"

              />
              <View>
              <Text style={{fontSize: 15, fontWeight: '700'}}>{item.name}</Text>
              <Text style = {{ marginTop: 10}}> Giá tiền:   
                <Text style={{color: 'red', fontSize: 15, marginBottom: 20, }}>
                {new Intl.NumberFormat("vi-VN", config).format(item.price)}
              </Text>
              </Text>
              </View>

              <View style={{marginLeft: "25%"}}>
              <TouchableOpacity onPress={() => onDeleteAPI(item.id)}>
                <Text style={{fontSize: 13, fontWeight: '600', marginLeft: 20}}>X</Text>
              </TouchableOpacity>

              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}

        ></FlatList>
      </View> 

      <View style={{ flex: 1.5 , flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{flex: 1,fontSize: 20, fontWeight: '700', marginLeft: 30}}>Tổng cộng: {new Intl.NumberFormat("vi-VN", config).format(total)}</Text>
        <TouchableOpacity style={{flex: 1 ,backgroundColor: '#191970', alignItems:'center', padding: 10, borderRadius: 20 }}  onPress={() => handlePostData()}><Text style={{fontSize: 20, fontWeight: '500', color: "#fff"}}>Mua ngay</Text></TouchableOpacity>
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

