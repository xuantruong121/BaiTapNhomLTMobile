import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface NotificationsTabProps {
  isActive?: boolean;
}

const NotificationsTab: React.FC<NotificationsTabProps> = ({ isActive = false }) => {
  const iconColor = isActive ? '#C92127' : '#999';
  const textColor = isActive ? '#C92127' : '#999';

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons 
          name={isActive ? "notifications" : "notifications-outline"} 
          size={20} 
          color={iconColor} 
        />
      </View>
      <Text style={[styles.text, { color: textColor }]}>Thông báo</Text>
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

export default NotificationsTab;
