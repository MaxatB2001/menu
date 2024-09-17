import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useCart } from "@/app/contexts/cart.context";

type Props = {
  tables: { uid: string; tableNumber: number }[];
  setIsOpen: (bool: boolean) => void
};

export default function TableChoose({ tables, setIsOpen }: Props) {
  const {setTableNumber} = useCart()
   
  const setTable = (number: number) => {
    setTableNumber(number)
    setIsOpen(false)
  }

  return (
    <View className="flex items-center bg-white rounded-xl w-full">
      <Text className="font-interbold py-4">Выбрать стол</Text>
      <View className="w-full">
        {tables.map((table) => (
          <TouchableOpacity onPress={() => setTable(table.tableNumber)} className="w-full p-6 border-t-2 border-green-600" key={table.uid}>
            <Text className="font-intersemibold">Cтол № {table.tableNumber}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
