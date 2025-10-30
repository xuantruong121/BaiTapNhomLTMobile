import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HomeTabProps {
  isActive?: boolean;
}

const HomeTab: React.FC<HomeTabProps> = ({ isActive = false }) => {
  const iconColor = isActive ? '#C92127' : '#999';
  const textColor = isActive ? '#C92127' : '#999';

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons 
          name={isActive ? "home" : "home-outline"} 
          size={25} 
          color={iconColor} 
        />
      </View>
      <Text style={[styles.text, { color: textColor }]}>Trang chủ</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconContainer: {
    marginBottom: 0,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default HomeTab;
