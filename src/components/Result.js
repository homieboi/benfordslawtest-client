import { reduce, add } from 'ramda'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native-web'

const SubmitButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={{
        alignItems: 'center',
        backgroundColor: "#e3eaa7",
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
        width: 160,
    }}>
        <Text style={{ fontSize: 24 }}>Submit</Text>
    </TouchableOpacity>
)

const Result = ({ oldNumbers = [], newNumbers = [], onPressSubmit }) => {
    const oldNumbersSum = reduce(add, 0, oldNumbers)
    const oldNumbersString = `Old sum: ${oldNumbersSum}`

    const newNumbersSum = reduce(add, 0, newNumbers)
    const newNumbersString = `New sum: ${newNumbersSum}`

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, marginBottom: 12 }}>{oldNumbersString}</Text>
            <Text style={{ fontSize: 24, marginBottom: 12 }}>{newNumbersString}</Text>
            <SubmitButton onPress={onPressSubmit} />
        </View>
    )
}

export default Result