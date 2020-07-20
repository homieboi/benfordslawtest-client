import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native-web'

const styles = StyleSheet.create({
	itemContainer: {
		paddingVertical: 2,
		paddingHorizontal: 4,
		marginVertival: 6,
		marginHorizontal: 12,
	},
	itemText: {
		fontSize: 18,
		width: 48,
	},
	itemDirty: {
		borderBottomWidth: 1,
		borderBottomStyle: 'solid',
		borderBottomColor: 'green',
		paddingBottom: 0,
	},
	textDirty: {
		color: 'green',
		fontWeight: 'bold',
	},
	valueInvalid: {
		color: 'red',
		fontWeight: 'bold',
	},
})

class NumberItem extends React.Component {
	state = { isInput: false	}

	_toggleInput = () => {
		this.setState(state => ({ isInput: !state.isInput }))
	}

	_onChangeText = value => {
		const { onChange, id } = this.props
		const _value = !value.length ? 0 : parseInt(value)
		
		onChange(id, _value)
	}

  	render() {
		const { value, isDirty } = this.props
		const { isInput } = this.state
		const isValueValid = value > 99 && value < 10000

		if (isInput) {
			return (
				<View style={styles.itemContainer}>
					<TextInput
						autoFocus
						onBlur={this._toggleInput}
						onChangeText={this._onChangeText}
						value={value}
						style={styles.itemText}
					/>
				</View>
			)
		}
	
		return (
			<TouchableOpacity
				onPress={this._toggleInput}
				style={[styles.itemContainer, isValueValid && isDirty && styles.itemDirty]}
			>
				<Text style={[styles.itemText, !isValueValid ? styles.valueInvalid : isDirty ? styles.textDirty : {}]}>
					{value}
				</Text>
			</TouchableOpacity>
		)
	}
}

export { NumberItem }