import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native-web'
import Empty from './Empty'
import { NumberItem } from './NumberItem'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { createNumberSet, setNumberRandom, setNumberReal, setEmail, setNextStage } from '../store/actions'
import { getStage, getStageCount, getDefaultNumberSet, getNewNumberSet } from '../store/selectors'
import { REAL } from '../constants'

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 12,
    textAlign: 'center',
    border: '1px solid black',
    paddingVertical: 4,
    paddingHorizontal: 24,
  },
})

class NumbersList extends React.Component {
	_setNumber = (index, value) => {
    const { actions, stage } = this.props
    
    if (stage === REAL) {
      actions.setNumberReal({ id: index, value, isDirty: true })
    } else { 
      actions.setNumberRandom({ id: index, value, isDirty: true })
    }
  }

  _createNumberSet = () => {
    const { actions } = this.props

    actions.createNumberSet()
  }
  
  _renderItem = ({ item }) => <NumberItem {...item} onChange={this._setNumber} />

  render() {
    const {
      defaultNumberSet,
      newNumberSet,
      numColumns,
      stageCount,
      style,
    } = this.props
    const titleWidth = numColumns * 80

    if (!defaultNumberSet.length) {
      return <Empty onPressGetNumbers={this._createNumberSet} style={style} />
    }

    return (
      <View style={style}>
        <Text style={[styles.title, { width: titleWidth }]}>
          {`Table #${stageCount + 1}`}
        </Text>
        <FlatList
          data={newNumberSet}
          keyExtractor={item => item.id}
          numColumns={numColumns}
          renderItem={this._renderItem}
        />
      </View>
    )
	}
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    createNumberSet,
    setNumberRandom,
    setNumberReal,
    setEmail,
    setNextStage
  }, dispatch),
})

const mapStateToProps = createStructuredSelector({
  defaultNumberSet: getDefaultNumberSet,
  newNumberSet: getNewNumberSet,
  stage: getStage,
  stageCount: getStageCount,
})

export default connect(mapStateToProps, mapDispatchToProps)(NumbersList)