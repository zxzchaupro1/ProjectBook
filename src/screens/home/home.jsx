import { memo, useMemo } from "react";
import { ScrollView, View } from "react-native";
import _ from "lodash";
import { Banner, CategoryBook, tw } from "../../components";
import { useQueryBooks } from "../../hooks";
import { Text } from "@rneui/themed";

export const Home = memo(({ navigation }) => {
  const { data, isFetching, isLoading, isError, error } = useQueryBooks();
  const bookNew = useMemo(() => {
    let results = [];
    data &&
      _.sortBy(data)
        .reverse()
        .forEach((item, idx) => {
          if (idx >= 14) return;
          results = [...results, item];
        });
    return results;
  }, [data]);
  return (
    <ScrollView style={tw`bg-white`}>
      <Banner />
      {isLoading || isFetching ? (
        <View style={tw`flex justify-center items-center`}>
          <Text>Đang tải...</Text>
        </View>
      ) : null}
      {isError ? <Text>{error.message}</Text> : null}
      <View style={tw`px-16px`}>
        <CategoryBook data={bookNew} topic={"Sách mới"} itemWidth={0.4}/>
      </View>
    </ScrollView>
  );
});
