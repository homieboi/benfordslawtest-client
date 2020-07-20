import React from 'react'
import { StyleSheet, Text, View } from 'react-native-web'
import { colors, iosShadow } from '../constants'

const styles = StyleSheet.create({
	header: {
		alignItems: 'center',
		backgroundColor: colors.mainBlue,
		paddingVertical: 24,
		paddingHorizontal: 24,
	},
	title: {
		borderBottomStyle: 'solid',
		borderBottomWidth: 2,
		borderBottomColor: 'white',
		color: 'white',
		fontSize: 36,
	}
})

const Header = () => (
	<View style={[styles.header, iosShadow]} >
		<Text style={styles.title}>
			{'Tax Fraud Detection using Benford´s Law'}
		</Text>
	</View>
)

export default Header