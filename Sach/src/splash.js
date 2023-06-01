import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Splash({navigation}) {
    setTimeout(() => {
        navigation.replace('Login')
    }, 3000);

  return (
    <View style={styles.container}>
      <Image source={require('../src/asset/avatar.png')}
      style={{
        width: 200,
        height: 200,
        
      }}/> 
    </View>
    
  );

  


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191970',
    alignItems: 'center',
    justifyContent: 'center',
  },
});