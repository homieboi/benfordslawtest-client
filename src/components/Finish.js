import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native-web'
import { colors, iosShadow } from '../constants.js'

const { clientWidth } = document.documentElement
const isMobile = clientWidth < 768

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 36,
        marginBottom: 24,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
  	submitButton: {
		alignItems: 'center',
		backgroundColor: colors.mainBlue,
		borderRadius: 2,
		paddingVertical: 4,
		paddingHorizontal: 8,
		width: 160,
  	},
  	emailInput: {
		border: '1px solid #ccc',
		borderRadius: 4,
		marginRight: 8,
		fontSize: 18,
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
	formContainer: {
        flexDirection: isMobile ? 'column' : 'row',
		alignItems: 'center',
    	marginBottom: 12,
    },
    formItemMobile: {
        marginBottom: 16,
    },
})

const SubmitButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={[styles.submitButton, iosShadow]}>
      <Text style={{ color: 'white', fontSize: 18 }}>
        Submit
      </Text>
    </TouchableOpacity>
  )

export const Finish = ({ onPressSubmit, email, onChangeEmail }) => (
	<View style={styles.container}>
 		<Text style={styles.title}>
			Thank You!
		</Text>
        <Text style={styles.text}>
            {'Please enter your university email address and click “Submit” button.'}
        </Text>
		<Text style={styles.text}>
            {'After that, your email client will be automatically opened and prefilled with results (in .csv format). That should be send to my e-mail, which is also automatically prefilled, so just click “Send”.'}
		</Text>
        <Text style={styles.text}>
            {'In case if you do not send the document – I would not be able to consider your participation. I will inform you about the results per email after the experiment is over. Good Luck!'}
        </Text>
		<View style={styles.formContainer}>
			<Text style={[{ fontSize: 20, marginRight: 8 }, isMobile && styles.formItemMobile]}>
				Your Email:
			</Text>
			<TextInput
				onChangeText={onChangeEmail}
				style={[styles.emailInput, isMobile && styles.formItemMobile]}
				textContentType='emailAddress'
				value={email}
			/>
			<SubmitButton onPress={onPressSubmit} />
		</View>
	</View>
)