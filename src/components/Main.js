import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native-web'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators} from 'redux'
import Header from './Header'
import NumbersList from './NumbersList'
import Result from './Result'
import {
	getHasTestStarted,
	getHasTestFinished,
	getEmail,
	getExportData,
	getHasInvalidData,
} from '../store/selectors'
import { setHasTestStarted, setEmail, setNextStage } from '../store/actions'
import { createCsv } from '../helpers'
import { colors, iosShadow, iosShadowNeg } from '../constants'
import { Finish } from './Finish'
import { DiffPercent } from './DiffPercent'

const { clientWidth, clientHeight } = document.documentElement
const isMobile = clientWidth < 768
const marginsX = isMobile ? 48 : 96
const resultWidth = isMobile ? 0 : 240
const numbersListWidth = clientWidth - marginsX - resultWidth
const numColumns = Math.floor(isMobile ? 4 : numbersListWidth / 80)


const styles = StyleSheet.create({
	main: {
		flex: 1,
		height: clientHeight,
	},
  	mainContainer: {
		paddingHorizontal: isMobile ? 24 : 48,
		paddingVertical: 36,
	},
  	tablesContainer: {
		flexDirection: isMobile ? 'column' : 'row'
	},
	numbersList: {
		flex: 1,
		marginBottom: isMobile ? 36 : 0,
	},
	resultDesktop: {
		width: 240,
	},
	resultMobileContainer: {
		width: '100%',
		position: 'fixed',
		bottom: 0,
		backgroundColor: colors.mainBlue,
		marginBottom: 0,
		paddingVertical: 12,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	resultMobileDiffContainer: { marginBottom: 0 },
	resultMobileText: {	color: 'white', fontSize: 24 },
	resultMobileButton: {
		backgroundColor: 'transparent',
		paddingVertical: 2,
		paddingHorizontal: 6,
		borderRadius: 2,
		borderStyle: 'solid',
		borderWidth: 2,
		borderColor: 'white',
	},
	resultMobileButtonText: {
		fontSize: 20,
		color: 'white',
	},
	startTitle: {
		fontSize: 24,
		marginBottom: 12,
		textAlign: 'center',
	},
	startButtom: {
		alignItems: 'center',
		alignSelf: 'flex-end',
		backgroundColor: colors.mainBlue,
		borderRadius: 2,
		paddingVertical: 8,
		paddingHorizontal: 16,
		width: 160,
	},
	startText: { fontSize: 18, marginBottom: 6 },
	startTextBlock: { marginBottom: 24 },
	hintContainer: {
	  paddingVertical: 12,
	  paddingHorizontal: 16,
	  borderRadius: 4,
	  backgroundColor: colors.spaceCadet,
	  marginBottom: 16,
	},
	hintContainerHidden: {
		marginBottom: 16,
	},
	hintText: {
	  fontSize: 16,
	  marginTop: 12,
	  color: 'white',
	},
	hintTitle: {
	  color: 'white',
	  fontSize: 18,
	  marginBottom: 12,
	  marginTop: 8
	},
	hintClose: {
	  alignSelf: 'flex-end',
	  backgroundColor: colors.mainBlue,
	  borderRadius: 2,
	  paddingVertical: 4,
	  paddingHorizontal: 8,
	},
	hintCloseText: {
	  fontSize: 20,
	  color: 'white',
	},
})

const StartButtom = ({ onPress }) => (
	<TouchableOpacity onPress={onPress} style={[styles.startButtom, iosShadow]}>
		<Text style={{ color: 'white', fontSize: 18 }}>
			Get Started!
		</Text>
	</TouchableOpacity>
)

const Start = ({ onPressStart }) => (
	<View>
		<Text style={styles.startTitle}>
			{'Welcome!'}
		</Text>
		<Text style={[styles.startText, styles.startTextBlock]}>
			{'You probably have heard that many companies are manipulating their financial data in order to maximize their profits by lowering the tax base. They may do so in different ways, for example by maximizing their tax-deductible expenses, so that the final amount to pay the taxes on is considerably low. That means that companies may manipulate their financial data to get the tax advantage, which is a form of a fraud.'}
		</Text>
		<Text style={[styles.startText, styles.startTextBlock]}>
			{'One of the modern approaches that auditors are currently using to detect the tax fraud is to check if the financial data is conforming to so-called Benford’s Law. According to this law the unmanipulated data should always be Benford conform, which means the following:'}
		</Text>
		<Text style={styles.startText}>{'\u2022 Digit 1 as a first digit of the number should appear approx. 30% of the time'}</Text>
		<Text style={styles.startText}>{'\u2022 Digit 2 as a first digit of the number should appear approx. 17% of the time'}</Text>
		<Text style={styles.startText}>{'\u2022 Digit 3 as a first digit of the number should appear approx. 12% of the time'}</Text>
		<Text style={styles.startText}>{'\u2022 Digit 4 as a first digit of the number should appear approx. 9% of the time'}</Text>
		<Text style={[styles.startText, styles.startTextBlock]}>{'\u2022 and so on.'}</Text>
		<Text style={styles.startText}>{'Your Task:'}</Text>
		<Text style={styles.startText}>{'You will receive two tables which are per se Benford conform.\nYour task is to manipulate as much numbers as possible in a way that the total revenues will be lowered by exactly 15% (-15%). The change of total revenues and percentages are calculated automatically.'}</Text>
		<Text style={styles.startText}>{'After all we will check if the changed tables are still Benford conform or not.'}</Text>
		<Text style={[styles.startText, styles.startTextBlock]}>{'Please try your best to manipulate as much numbers as possible keeping in mind the Benford´s Law.'}</Text>
		<StartButtom onPress={onPressStart} />
	</View>
)

const ResultMobile = ({ onPress }) => (
	<View style={[styles.resultMobileContainer, iosShadowNeg]}>
		<Text style={styles.resultMobileText}>
			Result:
		</Text>
		<DiffPercent
			containerStyle={styles.resultMobileDiffContainer}
			textStyle={styles.resultMobileText}
		/>
		<TouchableOpacity onPress={onPress} style={styles.resultMobileButton}>
			<Text style={styles.resultMobileButtonText}>
				Finish Table
			</Text>
		</TouchableOpacity>
	</View>
)

const Hint = () => {
	const [isVisible, setIsVisible] = useState(true)
  
	return (
	  <View style={[isVisible ? styles.hintContainer : styles.hintContainerHidden, isVisible && iosShadow]}>
		  {isVisible ? (
			<View>
				<Text style={styles.hintText}>
					{'\u2022 Please click a number to change it.'}
				</Text>
				<Text style={styles.hintText}>
					{'\u2022 You need to reach -15% of old revenue and change as much numbers as possible.'}
				</Text>
			</View>
		  ) : null}
		<TouchableOpacity style={[styles.hintClose, iosShadow]} onPress={() => setIsVisible(!isVisible)}>
			<Text style={styles.hintCloseText}>
				{isVisible ? 'Got it!' : 'Show hints!'}
			</Text>
		</TouchableOpacity>
	  </View>
	)
  }

class _Main extends React.Component {
	_onStartTest = () => {
		const { actions } = this.props

		actions.setHasTestStarted()
	}

	_onPressNextStage = () => {
		const { actions, hasInvalidData } = this.props
	
		if (!hasInvalidData) {
			actions.setNextStage()
		}
	}

	_onPressSubmit = () => {
    const { exportData, email } = this.props
    const csv = createCsv(exportData, email)

    window.open(`mailto:kondrashina.og@gmail.com?subject=BenfordTest&body=${csv}`)
	}

	_onChangeEmail = email => {
		const { actions } = this.props

		actions.setEmail(email)
	}

	render() {
		const { hasTestStarted, hasTestFinished, email } = this.props

		return (
			<View style={styles.main}>
				<Header />
				<View style={styles.mainContainer}>
				{hasTestFinished
					? <Finish
						email={email}
						onPressSubmit={this._onPressSubmit}
						onChangeEmail={this._onChangeEmail}
					/>
					: hasTestStarted
					? (
						<>
							<Hint />
							<View style={styles.tablesContainer}>
								<NumbersList style={styles.numbersList} numColumns={numColumns} />
								{!isMobile && <Result style={styles.resultDesktop} />}
							</View>
						</>
					) : <Start onPressStart={this._onStartTest} />
				}
				</View>
			{hasTestStarted && isMobile && !hasTestFinished && <ResultMobile onPress={this._onPressNextStage} />}
			</View>
		)
	}
}

const mapStateToProps = createStructuredSelector({
	hasTestStarted: getHasTestStarted,
	hasTestFinished: getHasTestFinished,
	email: getEmail,
	exportData: getExportData,
	hasInvalidData: getHasInvalidData,
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ setHasTestStarted, setEmail, setNextStage }, dispatch)
})

const Main = connect(mapStateToProps, mapDispatchToProps)(_Main)

export { Main }