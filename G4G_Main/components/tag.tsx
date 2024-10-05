import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  topic: string;
  onPress: () => void;
}

const Tag: React.FC<ButtonProps> = ({ topic, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, 
        borderWidth: 2, width: '80%'}}>
        <Text style={{ color: 'black', fontSize: 16 }}>{topic}</Text>
      </View>
    </TouchableOpacity>
  );
};
  
export default Tag;