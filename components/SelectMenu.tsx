import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type Props = {
    showPicker: boolean
}

const SelectMenu = ({showPicker}: Props) => {
  const [selectedValue, setSelectedValue] = useState('java');

  return (
    <View style={{ padding: 20 }}>
      {/* Trigger Button to show/hide Picker */}

      {/* Picker Dropdown */}
      {showPicker && (
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          style={{ height: 200, width: '100%' }}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="Python" value="python" />
          <Picker.Item label="C++" value="cpp" />
        </Picker>
      )}

      <Text style={{ marginTop: 20 }}>Selected: {selectedValue}</Text>
    </View>
  );
};

export default SelectMenu;
