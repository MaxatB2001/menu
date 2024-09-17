import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCart } from "@/app/contexts/cart.context";
import { useSearch } from "@/app/contexts/search.context";

type Props = {
  setIsOpen: (bool: boolean) => void;
};

const Header = ({ setIsOpen }: Props) => {
  const router = useRouter();
  const { tableNumber } = useCart();
  const { searchText, setSearchText } = useSearch();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* First View: Icon with Text */}
        <View className="flex-[0.2] " style={styles.iconContainer}>
          <View className="pl-4">
            <TouchableOpacity
              onPress={() => router.replace({ pathname: "/" })}
              className="rounded-full bg-green-600"
              style={styles.icon}
            >
              <Text style={styles.iconText}>C</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Second View: Search Input */}
        <View className="flex-[0.6] shrink-0" style={styles.searchContainer}>
          <View className="rounded" style={styles.searchBox}>
            <Ionicons
              name="search"
              size={20}
              color="lightgray"
              style={styles.iconMargin}
            />
            <TextInput
              value={searchText}
              onChangeText={(text) => {
                console.log("FROM TEXT ", text);
                
                setSearchText(text)
              }}
              style={styles.textInput}
            />
          </View>
        </View>

        {/* Third View: Text and Image */}
        <View className="flex-[0.2]">
          <View className="pr-4" style={styles.rightContainer}>
            <TouchableOpacity
              style={{padding: 8}}
              className="rounded-lg bg-gray-100"
              onPress={() => setIsOpen(true)}
            >
              <Text className="font-intersemibold">Стол № {tableNumber}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
    borderBottomWidth: 2,
    borderBottomColor: "#d1d5db", // Adjust the color as needed
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingHorizontal: 16,
    paddingVertical: 8,
  },
  iconContainer: {
    flex: 1,
  },
  icon: {
    height: 36,
    width: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    color: "white",
    fontWeight: "bold",
  },
  searchContainer: {},
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6", // gray-100
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: "100%",
  },
  iconMargin: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 16,
  },
  image: {
    height: 32,
    width: 32,
    borderRadius: 16,
  },
});

export default Header;
