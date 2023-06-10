import { memo, useEffect, useState } from "react";
import { View } from "react-native";
import { Tab } from "@rneui/themed";
import { StorageKeys } from "../../constants";
import { GridBook, tw } from "../../components";
import { Screen } from "react-native-screens";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export const Library = memo(() => {
  const [index, setIndex] = useState(0);

  const { getItem } = useAsyncStorage(StorageKeys.favourite);
  const { getItem: getBookReading } = useAsyncStorage(StorageKeys.reading);

  const [books, setBooks] = useState([]);

  const getItemsBook = async (key = StorageKeys.reading) => {
    try {
      switch (key) {
        case StorageKeys.favourite:
          const books_favourite = await getItem();
          if (books_favourite) {
            const parse = JSON.parse(books_favourite);
            setBooks(parse);
            return;
          }
          setBooks([]);
          break;

        default:
          const books_reading = await getBookReading();
          if (books_reading) {
            const parse = JSON.parse(books_reading);
            setBooks(parse);
            return;
          }
          setBooks([]);
          break;
      }
    } catch (error) {
      console.log("get book library error", error);
    }
  };

  const handleChangeTab = async (tab) => {
    if (tab === index) return;
    setIndex(tab);
    switch (tab) {
      case 1:
        await getItemsBook(StorageKeys.favourite);
        break;

      default:
        await getItemsBook();
        break;
    }
  };

  useEffect(() => {
    getItemsBook();
  }, []);

  return (
    <Screen style={tw`flex-1 bg-white`}>
      <View style={tw`rounded-2xl`}>
        <Tab
          value={index}
          onChange={handleChangeTab}
          dense
          variant='primary'
          titleStyle={tw`text-14px font-bold`}
          indicatorStyle={tw`bg-white`}
        >
          <Tab.Item>Đang đọc</Tab.Item>
          <Tab.Item>Yêu thích</Tab.Item>
        </Tab>
      </View>
      <GridBook data={books} />
    </Screen>
  );
});
