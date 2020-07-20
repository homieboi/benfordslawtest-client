import { prop, add } from 'ramda'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native-web'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getEmail,
  getSumDefault,
  getSumNew,
  getExportData,
  getStageCount,
  getHasTestFinished,
  getHasInvalidData,
} from '../store/selectors'
import { setEmail, setNextStage } from '../store/actions'
import { DiffPercent } from './DiffPercent'
import { colors, iosShadow } from '../constants'

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 12,
    textAlign: 'center',
    border: '1px solid black',
    paddingVertical: 4,
    paddingHorizontal: 24,
  },
  finishButton: {
    backgroundColor: colors.mainBlue,
    borderRadius: 2,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: 160,
  },
  buttonGrey: {
    backgroundColor: '#ccc'
  },
})

const FinishButton = ({ onPress, hasInvalidData }) => (
  <TouchableOpacity onPress={onPress} style={[styles.finishButton, iosShadow, hasInvalidData && styles.buttonGrey]}>
    <Text style={{ fontSize: 24, color: 'white' }}>
      Finish Table
    </Text>
  </TouchableOpacity>
)

class Result extends React.Component {  
  _onChangeEmail = email => {
    const { actions } = this.props

    actions.setEmail(email)
  }

  _onPressNextStage = () => {
    const { actions, hasInvalidData } = this.props

    if (!hasInvalidData) { 
      actions.setNextStage()
    }
  }
	
	_extractValueAndAdd = (acc, curr) => {
		const num = prop('value', curr)

		return add(acc, num)
	}

  render () {
    const {
      sumDefault,
      sumNew,
      style,
      hasTestFinished,
      hasInvalidData
    } = this.props

    const oldNumbersString = `Old Revenue: ${sumDefault}`
    const newNumbersString = `New Revenue: ${sumNew}`

    return (
      <View style={style}>
        <Text style={styles.title}>
          Results
        </Text>
        <Text style={{ fontSize: 24, marginBottom: 12 }}>
          {oldNumbersString}
        </Text>
        <Text style={{ fontSize: 24, marginBottom: 12 }}>
          {newNumbersString}
        </Text>
        <DiffPercent />
        {hasTestFinished ? null : <FinishButton onPress={this._onPressNextStage} hasInvalidData={hasInvalidData} />}
      </View>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  email: getEmail,
  exportData: getExportData,
	sumDefault: getSumDefault,
  sumNew: getSumNew,
  stageCount: getStageCount,
  hasTestFinished: getHasTestFinished,
  hasInvalidData: getHasInvalidData,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setEmail, setNextStage }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Result)