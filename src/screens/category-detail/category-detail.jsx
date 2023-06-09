import { memo, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { tw } from '../../components';
import { GridBook } from '../../components/grid-book';
import { useQueryBookByCategory } from '../../hooks';

export const CategoryDetail = memo(({ route }) => {
  const navigation = useNavigation();
  const { data, isFetching, error, status } = useQueryBookByCategory(route?.params.item.id);

  useEffect(() => {
    if (route?.params.item.name) {
      navigation.setOptions({ title: route?.params.item.name });
    }
  }, [route]);
  return (
    <ScrollView style={tw`bg-white`}>
      <GridBook status={status} data={data} error={error} isFetching={isFetching} />
    </ScrollView>
  );
});
