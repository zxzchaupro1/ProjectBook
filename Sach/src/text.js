import React from 'react';
import { View, Button } from 'react-native';

const postData = async (user) => {
  try {
    // Gửi POST request với user lên server
    const response = await fetch('https://example.com/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

const MyComponent = () => {
  const users = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
    { name: 'Bob', age: 28 },
  ];

  const handlePostData = async () => {
    for (const user of users) {
      await postData(user);
    }
  };
  

  return (
    <View>
      <Button title="POST Users" onPress={handlePostData} />
    </View>
  );
};

export default MyComponent;