import { memo } from 'react';
import { View } from 'react-native';
import { Banner } from '../../components';

export const Home = memo(({ navigation }) => {
  return (
    <View>
      <Banner />
    </View>
  );
});
