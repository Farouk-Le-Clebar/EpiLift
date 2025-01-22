import React, { useCallback, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import styles from "./LoginStyle";

export default function Login() {
  const navigation = useNavigation();
  const getTaskInfo = async () => {};

  return (
    <View style={styles.pageGlobalContainer}>
      <TextInput placeholder="LE CACA EST BON"/>
      <TextInput placeholder="LE CACA EST BON"/>
      <TouchableOpacity style={styles.loginButton} onPress={() => {}}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
