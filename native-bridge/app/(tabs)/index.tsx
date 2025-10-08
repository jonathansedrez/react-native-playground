import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import NativeLocalStorage from "../../specs/NativeLocalStorage";

const EMPTY = "<empty>";

export default function HomeScreen() {
  const [value, setValue] = useState<string | null>(null);

  const [editingValue, setEditingValue] = useState<string | null>(null);

  useEffect(() => {
    const storedValue = NativeLocalStorage?.getItem("myKey");
    setValue(storedValue ?? "");
  }, []);

  function saveValue() {
    NativeLocalStorage?.setItem(editingValue ?? EMPTY, "myKey");
    setValue(editingValue);
  }

  function clearAll() {
    NativeLocalStorage?.clear();
    setValue("");
  }

  function deleteValue() {
    NativeLocalStorage?.removeItem("myKey");
    setValue("");
  }
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.text}>
        Current stored value is: {value ?? "No Value"}
      </Text>
      <TextInput
        placeholder="Enter the text you want to store"
        style={styles.textInput}
        onChangeText={setEditingValue}
      />
      <Button title="Save" onPress={saveValue} />
      <Button title="Delete" onPress={deleteValue} />
      <Button title="Clear" onPress={clearAll} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 10,
    fontSize: 20,
  },
  textInput: {
    margin: 10,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
});
