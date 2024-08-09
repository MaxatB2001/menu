import React from "react";
import { View, Text, SafeAreaView, TextInput, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* First View: Icon with Text */}
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
            <Text style={styles.iconText}>C</Text>
          </View>
        </View>
        
        {/* Second View: Search Input */}
        <View style={styles.searchContainer}>
          <View className="rounded" style={styles.searchBox}>
            <Ionicons name="search" size={20} color="gray" style={styles.iconMargin} />
            <TextInput
              style={styles.textInput}
            />
          </View>
        </View>
        
        {/* Third View: Text and Image */}
        <View style={styles.rightContainer}>
          <Text>Стол</Text>
          <Image
            style={styles.image}
            source={{
              uri: "https://img.freepik.com/premium-photo/amazing-delicious-cheese-burger_727939-299.jpg",
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#d1d5db', // Adjust the color as needed
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  iconContainer: {
    flex: 1,
  },
  icon: {
    backgroundColor: '#10b981', // green-600
    height: 32,
    width: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchContainer: {
    flex: 2.9, // Adjust the flex ratio as needed
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6', // gray-100
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '100%',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 16,
  },
  image: {
    height: 32,
    width: 32,
    borderRadius: 16,
  },
});

export default Header;
