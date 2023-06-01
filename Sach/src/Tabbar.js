import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from "react-native";


import Home from "./home";
import Cart from "./cart";
import Search from "./search";
import Library from "./library";
import Account from "./account";


const Tab = createBottomTabNavigator();
const Tabbar = () => {
    return (
              <Tab.Navigator>
                <Tab.Screen name="Trang chủ"  component={Home} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
                <Image 
                source={require('../src/asset/home.png')} 
                style={{ tintColor: color, width: size, height: size }}
                />)}}/>

                <Tab.Screen name="Giỏ hàng" component={Cart} options={{ headerShown: false,tabBarIcon: ({ color, size }) => (
                <Image 
                source={require('../src/asset/cart.png')} 
                style={{ tintColor: color, width: size, height: size }}
                />)}}/>

                <Tab.Screen name="Tìm kiếm" component={Search} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
                <Image 
                source={require('../src/asset/search.png')} 
                style={{ tintColor: color, width: size, height: size }}
                />)}}/>

                <Tab.Screen name="Thư viện" component={Library} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
                <Image 
                source={require('../src/asset/book.png')} 
                style={{ tintColor: color, width: size, height: size }}
                />)}}/>

                <Tab.Screen name="Tài khoản" component={Account} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
                <Image 
                source={require('../src/asset/user.png')} 
                style={{ tintColor: color, width: size, height: size }}
                />)}}/>
              </Tab.Navigator>
          );
};

export default Tabbar;
