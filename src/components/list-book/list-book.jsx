import { memo } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { numberWithDots } from '../../utils';
import { tw } from '../tw';

export const ListBook = memo(({ status, error, isFetching, data }) => {
  const goToDetail = (item) => {
    navigation.navigate(AppRouter.book, { item: item });
  };
  return (
    <View style={{ flex: 1 }}>
      {status === 'loading' || isFetching ? (
        <View style={tw`flex justify-center items-center`}>
          <Text>Đang tải...</Text>
        </View>
      ) : null}
      {status === 'error' ? <Text>{error.message}</Text> : null}
      <FlatList
        data={data}
        renderItem={({ item }) => {
          console.log('item',item);
          const partialText = item.name.split(textSearch);
          return (
            <View
              style={{
                flexDirection: 'colum',
                padding: 10,
                marginBottom: 20,
                backgroundColor: 'rgba(255,255,255,0.9)',
                borderRadius: 20,
                shadowColor: '#000',
                shadowOpacity: 0.3,
                shadowRadius: 20,
              }}
            >
              <TouchableOpacity onPress={() => goToDetail(item)}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 1, marginLeft: 20 }}>
                    <Text style={{ fontSize: 25, fontWeight: '700' }}>
                      {partialText.map((part, index) => {
                        return (
                          <Text key={index}>
                            {part}
                            {index !== partialText.length - 1 && (
                              <Text style={{ color: 'blue', fontWeight: '900' }}>{textSearch}</Text>
                            )}
                          </Text>
                        );
                      })}
                    </Text>
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: '500',
                        color: 'red',
                      }}
                    >
                      {numberWithDots(item.price) || 'Miễn phí'}
                    </Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 150 }}>
                    <Image
                      source={{ uri: item.imageBook }}
                      style={{
                        width: '100%',
                        height: '100%',
                        marginBottom: 8,
                      }}
                      resizeMode='contain'
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
});
