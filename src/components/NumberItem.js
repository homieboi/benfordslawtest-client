import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native-web'

class NumberItem extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isInput: false,
			newValue: props.value,
		}
	}

	_toggleInput = () => {
		this.setState(state => ({ isInput: !state.isInput }))
	}

	_onChangeText = value => {
		this.setState({ newValue: parseInt(value) })
	}

	_onSubmit = () => {
		const { onChange, id } = this.props
		const { newValue } = this.state

		this._toggleInput()
		onChange(id, newValue)
	}

  render() {
		const { value } = this.props
		const { isInput, newValue } = this.state

		if (isInput) {
			return (
				<View style={{ flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 16 }}>
					<TextInput
						autoFocus
						onBlur={this._onSubmit}
						onChangeText={this._onChangeText}
						value={newValue}
						style={{ width: 48, fontSize: 20 }}
					/>
				</View>
			)
		}
	
		return (
			<TouchableOpacity onPress={this._toggleInput} style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
				<Text style={{ fontSize: 20, width: 48 }}>
					{value}
				</Text>
			</TouchableOpacity>
		)
  }
}

export { NumberItem }