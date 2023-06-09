import React, { memo, useMemo } from "react";
import { Button, Divider, Icon, Text } from "@rneui/themed";
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { tw } from "../../components";
import { AppRouter } from "../../constants";
import { useNavigation } from "@react-navigation/native";

export const BookDetail = memo(({ route }) => {
  const navigation = useNavigation();
  const book = useMemo(() => route?.params?.item, [route]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageParent}>
          <Image source={{ uri: book.image }} style={styles.image} />
        </View>
        <View style={styles.header}></View>
        <View>
          <View style={styles.containerBackground}>
            <Text style={tw`text-center text-18px font-semibold py-8px`}>
              {book.name}
            </Text>
            <Text
              style={tw`text-center text-14px text-grayscale-light pb-16px`}
            >
              {book.author}
            </Text>

            <View
              style={tw`mx-16px border-t border-b border-grayscale-border flex-row justify-around items-center py-16px text-center`}
            >
              <View>
                <Text style={tw`text-14px font-normal text-center`}>
                  {book.page || 200}{" "}
                </Text>
                <Text style={tw`text-13px text-grayscale-light text-center`}>
                  Trang
                </Text>
              </View>
              <Divider color='#EEEEEE' width={1} orientation='vertical' />
              <View>
                <Text style={tw`text-14px font-normal text-center`}>
                  {(book.view && book.view + "k") || "911,4k"}
                </Text>
                <Text style={tw`text-13px text-grayscale-light text-center`}>
                  Lượt đọc
                </Text>
              </View>
              <Divider color='#EEEEEE' width={1} orientation='vertical' />
              <View>
                <Text style={tw`text-14px font-normal text-center`}>
                  {(book.heart && book.heart + "k") || "19,1k"}
                </Text>
                <Text style={tw`text-13px text-grayscale-light text-center`}>
                  Yêu thích
                </Text>
              </View>
            </View>
            <Text style={tw`my-8px text-center px-24px`}>
              {book.description}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={tw`flex-row justify-between items-center w-full bg-white py-16px border-t border-grayscale-border`}
      >
        <View style={tw`pl-16px`}>
          <Button
            title={"Đọc sách"}
            size='sm'
            buttonStyle={tw`w-full h-38px p-auto`}
            titleStyle={tw`text-white`}
          />
        </View>
        <View style={tw`pr-16px`}>
          <Button
            title={<Icon name='heart' type='font-awesome' color='pink' />}
            size='sm'
            buttonStyle={tw`w-6/12 h-38px p-auto bg-white border border-grayscale-border`}
            titleStyle={tw`text-white`}
          />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191970",
  },
  containerBackground: {
    height: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 120,
  },
  imageParent: {
    zIndex: 10,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 60,
    left: 0,
    right: 0,
  },
  image: {
    width: 160,
    height: 240,
    borderRadius: 10,
  },
  header: {
    height: 200,
    backgroundColor: "#191970",
  },
  ImageBackground: {
    flex: 1,
    justifyContent: "center",
    opacity: 0.9,
  },
});
