import { memo } from 'react';
import { ScrollView } from 'react-native';
import { useQueryCategories } from '../../hooks';
import { tw } from '../../components';
import { GridBook } from '../../components/grid-book';

export const Category = memo(() => {
  const { data, isFetching, error,status } = useQueryCategories();
  return (
    <ScrollView style={tw`bg-white`}>
      <GridBook status={status} data={data} error={error} isFetching={isFetching} isCategory={true} />
    </ScrollView>
  );
});
