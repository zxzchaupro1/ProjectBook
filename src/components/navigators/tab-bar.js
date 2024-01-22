import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Account, Category, Home, Library, Search } from '../../screens'
import { AppRouter } from '../../constants'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()
export const Tabbar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={AppRouter.home}
        component={Home}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={24} style={{ color: color, width: size, height: size }} />
          ),
        }}
      />

      <Tab.Screen
        name={AppRouter.category}
        component={Category}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="book" size={24} style={{ color: color, width: size, height: size }} />
          ),
        }}
      />

      <Tab.Screen
        name={AppRouter.search}
        component={Search}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={24} style={{ color: color, width: size, height: size }} />
          ),
        }}
      />

      <Tab.Screen
        name={AppRouter.library}
        component={Library}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bookshelf" size={24} style={{ color: color, width: size, height: size }} />
          ),
        }}
      />

      <Tab.Screen
        name={AppRouter.account}
        component={Account}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={24} style={{ color: color, width: size, height: size }} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
