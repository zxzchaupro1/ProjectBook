import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { Category, Home, Library, Search, Setting } from '../../screens';
import { AppRouter } from '../../constants';

const Tab = createBottomTabNavigator();
export const Tabbar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={AppRouter.home}
        component={Home}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../../src/asset/home.png')}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
        }}
      />

      <Tab.Screen
        name={AppRouter.category}
        component={Category}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../../src/asset/cart.png')}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
        }}
      />

      <Tab.Screen
        name={AppRouter.search}
        component={Search}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../../src/asset/search.png')}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
        }}
      />

      <Tab.Screen
        name={AppRouter.library}
        component={Library}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../../src/asset/book.png')}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
        }}
      />

      <Tab.Screen
        name={AppRouter.setting}
        component={Setting}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../../src/asset/user.png')}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
