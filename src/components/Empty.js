import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native-web'

const Empty = ({ onPressGetNumbers }) => (
    <View style={{ flex: 2, alignItems: 'center' }}>
        <TouchableOpacity
            onPress={onPressGetNumbers}
            style={{
                alignItems: 'center',
                backgroundColor: 'grey',
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 12,
                width: 240,

            }}
        >
            <Text style={{ color: 'white', fontSize: 24 }}>Get Numbers</Text>
        </TouchableOpacity>
    </View>
)

export default Empty