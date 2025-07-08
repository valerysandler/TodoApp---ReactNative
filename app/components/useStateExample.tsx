// src/components/UseStateExample.tsx
import { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function UseStateExample() {
  const [count, setCount] = useState(0);

  return (
    <View className="items-center space-y-2">
      <Text className="text-2xl">Счётчик: {count}</Text>
      <Button title="Увеличить" onPress={() => setCount(count + 1)} />
    </View>
  );
}