import { View, Text, FlatList, Image, Alert, Button } from 'react-native'
import React from 'react'
import { useCart } from '../contexts/cart.context';
import { Link } from 'expo-router';

const Cart = () => {
    const { cart } = useCart();
    console.log("CART", cart)

    const CHAT_BOT_TOKEN = '6431963038:AAGolRw4BiTCbqT3NEXaKHmaoJuRhsoLH4k'
    const CHAT_ID = '5169306298'

    const sendMessageToTelegram = async (message: string) => {
        const url = `https://api.telegram.org/bot${CHAT_BOT_TOKEN}/sendMessage`;
        const data = {
          chat_id: CHAT_ID,
          text: message,
        };
      
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const responseData = await response.json();
          console.log('Message sent successfully:', responseData);
          Alert.alert('Success', 'Message sent successfully');
        } catch (error) {
          console.error('Error sending message:', error);
          Alert.alert('Error', 'Failed to send message');
        }
      };

      const handleCartSubmit = async () => {
        const message = cart
          .map((item) => `${item.name} (Quantity: ${item.quantity})`)
          .join('\n');
        await sendMessageToTelegram(`New order:\n${message}`);
      };

  return (
    <View>
        <FlatList ListFooterComponent={<View className='h-14' />} data={cart} keyExtractor={(item => item.uid)} renderItem={({item}) => (
             <View className="flex-1 mx-2 mb-4 p-4 bg-white rounded-lg shadow-md">
             <Image
               className="w-full h-32 rounded-lg"
               source={{ uri: item.imageUrl }}
             />
             <View className="flex-row justify-between items-center mt-2">
               <View>
                 <Text>{item.name}</Text>
                 <Text>{item.price} р</Text>
               </View>
             </View>
           </View>
        )}/>
         {cart.length > 0 && (
        <View className='absolute p-4 bottom-0 right-0 left-0 bg-orange-400'>
          <Button title="Submit Cart" onPress={handleCartSubmit} />
        </View>
      )}
    </View>
  )
}

export default Cart