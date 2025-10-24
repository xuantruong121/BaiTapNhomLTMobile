import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface AccountTabProps {
  isActive?: boolean;
}

const AccountTab: React.FC<AccountTabProps> = ({ isActive = false }) => {
  const iconColor = isActive ? '#C92127' : '#999';
  const textColor = isActive ? '#C92127' : '#999';

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons 
          name={isActive ? "person" : "person-outline"} 
          size={20} 
          color={iconColor} 
        />
      </View>
      <Text style={[styles.text, { color: textColor }]}>Tài khoản</Text>
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
    marginBottom: 1,
  },
  text: {
    fontSize: 10,
    fontWeight: '500',
  },
});

export default AccountTab;
