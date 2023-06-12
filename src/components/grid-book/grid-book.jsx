import { memo } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { tw } from "../tw";
import { useNavigation } from "@react-navigation/native";
import { AppRouter } from "../../constants";

export const GridBook = memo(
  ({ status, error, isFetching, data, isCategory, ...props }) => {
    const navigation = useNavigation();

    function renderItem({ item, index }) {
      const { image, name: title, author } = item;
      return (
        <Pressable
          activeOpacity={1}
          style={tw`w-1/3 p-6px`}
          onPress={() => {
            if (isCategory) {
              navigation.navigate(AppRouter.categoryDetail, { item: item });
              return;
            }
            navigation.navigate(AppRouter.bookDetail, { item: item });
          }}
        >
          <View>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.name} numberOfLines={2}>
              {title}
            </Text>
            {author && (
              <Text style={styles.descriptionText} numberOfLines={1}>
                {author}
              </Text>
            )}
          </View>
        </Pressable>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        {status === "error" ? <Text>{error.message}</Text> : null}
        <FlatList
          data={data}
          contentContainerStyle={[tw`py-16px justify-between -m-6px px-4px`]}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          onEndReachedThreshold={0.8}
          ListFooterComponent={
            status === "loading" ? <ActivityIndicator /> : null
          }
          {...props}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 1 / 2,
    borderRadius: 10,
  },
  lowerContainer: {},
  descriptionText: {
    fontSize: 12,
    color: "#676E72",
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    borderColor: "#A0A0A0",
  },
  name: {
    fontSize: 14,
    fontWeight: "500",
    color: "#202C38",
    paddingTop: 6,
  },
});
