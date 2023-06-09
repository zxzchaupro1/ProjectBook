import { memo, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { Tab } from "@rneui/themed";
import { AppRouter } from "../../constants";
import { tw } from "../../components";
import { Screen } from "react-native-screens";

const tabs = [
  {
    value: 0,
    label: "Đang đọc",
  },
  {
    value: 1,
    label: "Yêu thích",
  },
];

export const Library = memo((props) => {
  const [index, setIndex] = useState(0);
  return (
    <Screen>
      <View style={tw`rounded-2xl`}>
        <Tab
          value={index}
          onChange={setIndex}
          dense
          variant='primary'
          titleStyle={tw`text-14px font-bold`}
          indicatorStyle={tw`bg-white`}
        >
          {tabs.map((tab) => (
            <Tab.Item key={tab.value}>{tab.label}</Tab.Item>
          ))}
        </Tab>
      </View>
      <ScrollView>{index === 1 ? <View></View> : <View></View>}</ScrollView>
    </Screen>
  );
});
