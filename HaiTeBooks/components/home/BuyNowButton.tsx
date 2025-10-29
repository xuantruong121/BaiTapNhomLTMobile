import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export interface BuyNowButtonProps {
  onPress?: () => void;
  disabled?: boolean;
}

const BuyNowButton: React.FC<BuyNowButtonProps> = ({ onPress, disabled = false }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.buttonDisabled,
        isPressed && !disabled && styles.buttonPressed, // đổi màu khi bấm
      ]}
      onPress={onPress}
      activeOpacity={0.9}
      disabled={disabled}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <Text
        style={[
          styles.buttonText,
          disabled && styles.buttonTextDisabled,
          isPressed && !disabled && styles.buttonTextPressed,
        ]}
      >
        Mua ngay
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#C92127',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  buttonPressed: {
    backgroundColor: '#FFA500',
    borderColor: '#FFA500',
  },
  buttonDisabled: {
    borderColor: '#D1D5DB',
    backgroundColor: '#F9FAFB',
  },
  buttonText: {
    color: '#C92127',
    fontWeight: '700',
    fontSize: 13,
  },
  buttonTextPressed: {
    color: '#FFFFFF',
  },
  buttonTextDisabled: {
    color: '#9CA3AF',
  },
});

export default BuyNowButton;
