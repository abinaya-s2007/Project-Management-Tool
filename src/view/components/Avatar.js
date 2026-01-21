import React from "react";
import { View, Text } from 'react-native';

const getColorFromName = name => {
  const colors = [
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#3F51B5',
    '#03A9F4',
    '#009688',
    '#4CAF50',
    '#FF9800',
    '#795548',
  ];
  if (!name) return colors[0];
  const charCode = name.charCodeAt(0);
  return colors[charCode % colors.length];
};

const Avatar = ({ name, size = 80 }) => {
  const letter = name ? name.charAt(0).toUpperCase() : '?';
  const backgroundColor = getColorFromName(name);

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: '#fff',   
          fontWeight: 'bold',
          fontSize: size / 2,
        }}
      >
        {letter}
      </Text>
    </View>
  );
};

export default Avatar;
