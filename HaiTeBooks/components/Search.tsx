import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
}

const Search: React.FC<SearchProps> = ({ placeholder, value, onChangeText, onSubmit }) => {
  const [text, setText] = useState(value ?? '');

  useEffect(() => {
    if (typeof value === 'string') setText(value);
  }, [value]);

  const handleChange = (t: string) => {
    if (onChangeText) onChangeText(t);
    else setText(t);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrap}>
        <Ionicons name="search" size={18} color="#999" style={styles.searchIcon} />
        <TextInput
          value={text}
          onChangeText={handleChange}
          placeholder={placeholder ?? 'Tìm kiếm...'}
          placeholderTextColor="#999"
          style={styles.input}
          returnKeyType="search"
          onSubmitEditing={() => onSubmit && onSubmit()}
          underlineColorAndroid="transparent"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 18,
    height: 36,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    paddingVertical: 0,
  },
});

export default Search;