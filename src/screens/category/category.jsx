import { memo, useMemo } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useQueryBooks } from '../../hooks';
import { CategoryBook, tw } from '../../components';

export const Category = memo(() => {
  const { data, isFetching, isLoading, isError, error } = useQueryBooks();

  const rs = useMemo(() => {
    let results = [];
    (data || []).forEach((it) => {
      const existCate = results.find((cate) => cate.topic === it.topic);
      if (!existCate) {
        results = [...results, { topic: it.topic, items: [it] }];
      } else {
        const idx = results.findIndex((rs) => rs.topic === it.topic);
        results[idx].items = [results[idx].items, it];
      }
    });
    return results;
  }, [data]);

  return (
    <ScrollView style={tw`bg-white`}>
      {isLoading || isFetching ? (
        <View style={tw`flex justify-center items-center`}>
          <Text>Đang tải...</Text>
        </View>
      ) : null}
      {isError ? <Text>{error.message}</Text> : null}
      {rs.map((item, idx) => (
        <View key={idx} style={tw`px-16px`}>
          <CategoryBook data={item.items} topic={item.topic}/>
        </View>
      ))}
    </ScrollView>
  );
});
