import { Button, Platform, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Slot } from "expo-router";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const WaiterLayout = () => {
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setExpoPushToken(token);
      }
    });
  }, []);

  const sendNotification = async () => {
    console.log("Sending push notification...");

    // notification message
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "My first push notification!",
      body: "This is my first push notification made with expo rn app",
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  return (
    <View>
      <Text>WaiterLayout</Text>
      <Slot />
      <Button title="send" onPress={sendNotification}/>
    </View>
  );
};

async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Ошибка получение токена!");
      return;
    }

    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "aebaba4b-f5db-44f8-bc28-8fa3faa8e010",
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }
  return token;
}

export default WaiterLayout;
