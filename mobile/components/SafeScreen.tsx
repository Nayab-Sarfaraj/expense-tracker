import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "@/constants/colors.ts";
type SafeScreenProps = {
  children: React.ReactNode;
};

const SafeScreen: React.FC<SafeScreenProps> = ({ children }) => {
  const insert = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insert.top,
        backgroundColor: COLORS.background,
        flex: 1,
      }}
    >
      {children}
    </View>
  );
};

export default SafeScreen;

const styles = StyleSheet.create({});
