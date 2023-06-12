import React, { memo, useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

import { tw } from "../../components";
import { StorageKeys } from "../../constants";
import { ActivityIndicator } from "react-native";

export const BookView = memo(({ route }) => {
  const { getItem, setItem } = useAsyncStorage(StorageKeys.reading);
  const { getItem: getBooksReaded, setItem: setBooksReaded } = useAsyncStorage(
    StorageKeys.readed,
  );
  const [loading, setLoading] = useState(false);
  const [booksReading, setBooksReading] = useState([]);

  const book = useMemo(() => route?.params?.item, [route]);

  const handleSetBooksReading = async () => {
    try {
      let bookReading = [];
      const item = await getItem();
      if (item) {
        const parse = JSON.parse(item);
        bookReading = [...parse];
      }
      const isExist = bookReading.find((items) => items.id === book.id);
      if (isExist) {
        setBooksReading(bookReading);
        return;
      }
      const newBookReading = [...bookReading, book];
      await setItem(JSON.stringify(newBookReading));
      setBooksReading(newBookReading);
    } catch (e) {
      // save error
      console.log("error-save-book-reading", e);
    }
  };

  const handleSetBooksReaded = async () => {
    try {
      let bookReaded = [];
      const item = await getBooksReaded();
      if (item) {
        const parse = JSON.parse(item);
        bookReaded = [...parse];
      }

      // handle remove book reading because here book is readed

      const booksReadingNew = booksReading.filter(
        (item) => item.id !== book.id,
      );
      await setItem(JSON.stringify(booksReadingNew));

      // handle set book  readed

      const isExist = bookReaded.find((items) => items.id === book.id);
      if (isExist) return;
      const newBookReaded = [...bookReaded, book];
      await setBooksReaded(JSON.stringify(newBookReaded));
    } catch (e) {
      // save error
      console.log("error-save-book-readed", e);
    }
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  useEffect(() => {
    handleSetBooksReading();
  }, []);

  return (
    <SafeAreaView style={tw`flex-1`}>
      {loading && <ActivityIndicator />}
      <WebView
        source={{
          uri: route?.params?.url,
        }}
        style={{ marginTop: 20 }}
        onLoadStart={() => {
          setLoading(true);
        }}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            handleSetBooksReaded();
          }
        }}
        onLoadEnd={() => {
          setLoading(false);
        }}
        startInLoadingState={true}
      />
    </SafeAreaView>
  );
});
