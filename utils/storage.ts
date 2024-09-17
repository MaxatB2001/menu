import AsyncStorage from '@react-native-async-storage/async-storage';

export const getDataFromStorage = async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
}

export const storeData = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };