import { useState, memo, useCallback } from 'react';
import { View, Image, TextInput } from 'react-native';
import { debounce } from 'lodash';

import { ListBook, tw } from '../../components';
import { useSearchBook } from '../../hooks';

export const Search = memo(() => {
  const [textSearch, setTextSearch] = useState('');
  const { status, data, error, isFetching } = useSearchBook(textSearch);
  
  // handle debouce search when user onpress
  const handleSearch = useCallback(
    debounce((text) => {
      setTextSearch(text);
    }, 400),
    [],
  );

  return (
    <View style={tw`flex-1`}>
      <View style={tw`m-16px`}>
        <View
          style={{
            backgroundColor: '#ffffff',
            width: '100%',
            height: 40,
            alignSelf: 'center',
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image style={{ width: 20, height: 20, marginLeft: 16 }} source={require('../..//asset/search.png')} />
          <View style={tw`pl-12px`}>
            <TextInput
              style={tw`w-full`}
              placeholder='Tìm kiếm sách'
              placeholderTextColor='#808080'
              onChangeText={handleSearch}
            />
          </View>
        </View>
      </View>
      <ListBook status={status} data={data} error={error} isFetching={isFetching} />
    </View>
  );
});
