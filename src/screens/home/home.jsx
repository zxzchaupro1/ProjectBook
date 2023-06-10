import { memo, useMemo } from "react";
import { ActivityIndicator, ScrollView, SectionList, View } from "react-native";
import _ from "lodash";
import { Banner, GridBook, tw } from "../../components";
import { useQueryBooks } from "../../hooks";
import { Text } from "@rneui/themed";
import { Screen } from "react-native-screens";
import { SafeAreaView } from "react-native-safe-area-context";

export const Home = memo(() => {
  const { data, isFetching, isLoading, isError, status, error } =
    useQueryBooks();
  const bookNew = useMemo(() => {
    let results = [];
    data &&
      _.sortBy(data)
        .reverse()
        .forEach((item, idx) => {
          if (idx >= 6) return;
          results = [...results, item];
        });
    return results;
  }, [data]);
  const booksPopular = useMemo(() => {
    let results = [];
    data &&
      data.forEach((item, idx) => {
        if (item?.isPopular && idx >= 6) results = [...results, item];
      });
    return results;
  }, [data]);

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <ScrollView nestedScrollEnabled={true} style={{ width: "100%" }}>
        <Banner />
        {isLoading || isFetching ? (
          <View style={tw`flex justify-center items-center`}>
            <Text>Đang tải...</Text>
          </View>
        ) : null}
        {isError ? <Text>{error.message}</Text> : null}
        <View>
          <Text style={tw`px-12px pt-16px font-bold text-18px`}>Sách mới</Text>
          <GridBook
            status={status}
            data={bookNew}
            error={error}
            isFetching={isFetching}
          />

          <Text style={tw`px-12px pt-16px font-bold text-18px`}>
            Sách phổ biến
          </Text>
          <GridBook
            status={status}
            data={booksPopular}
            error={error}
            isFetching={isFetching}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});
