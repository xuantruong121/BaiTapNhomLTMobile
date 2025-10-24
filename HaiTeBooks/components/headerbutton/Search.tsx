import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
  onScanPress?: () => void;
}

const Search: React.FC<SearchProps> = ({
  placeholder,
  value,
  onChangeText,
  onSubmit,
  onScanPress,
}) => {
  const [text, setText] = useState(value ?? "");

  useEffect(() => {
    if (typeof value === "string") setText(value);
  }, [value]);

  const handleChange = (t: string) => {
    if (onChangeText) onChangeText(t);
    else setText(t);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrap}>
        <Ionicons
          name="search"
          size={16}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          value={text}
          onChangeText={handleChange}
          placeholder={placeholder ?? "Tìm kiếm..."}
          placeholderTextColor="#999"
          style={styles.input}
          returnKeyType="search"
          onSubmitEditing={() => onSubmit && onSubmit()}
          underlineColorAndroid="transparent"
        />
      </View>

      <TouchableOpacity
        style={styles.scanButton}
        accessibilityLabel="Quét mã vạch"
        onPress={() => onScanPress && onScanPress()}
      >
        <Ionicons name="barcode-outline" size={18} color="#C92127" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  inputWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    height: 32, // reduce height
    paddingHorizontal: 10,
    marginRight: 6,
  },
  searchIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontSize: 13, // slightly smaller font
    color: "#333",
    paddingVertical: 0,
  },
  scanButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Search;
