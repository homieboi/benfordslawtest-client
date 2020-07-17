import React from 'react'
import { View, FlatList } from 'react-native-web'
import Empty from './Empty'
import { NumberItem } from './NumberItem'
import { connect } from 'react-redux'
import { createNumberSet, setNumber } from '../store/actions'
import { getDefaultNumberSet, getNewNumberSet } from '../store/selectors'

class NumbersList extends React.Component {
	_setNumber = (index, value) => {
		const { setNumber } = this.props

		console.log('setNumber', setNumber)

		setNumber({ index, value })
	}

  render() {
    const {
      defaultNumberSet,
      createNumberSet,
      newNumberSet,
    } = this.props

    if (!defaultNumberSet.length) {
      return (<Empty onPressGetNumbers={createNumberSet} />)
    }

		const renderItem = ({ item }) => {
			const { id, value } = item
        
    	return <NumberItem value={value} id={id} onChange={this._setNumber} />
  	}

    return (
      <View style={{ flex: 2, marginLeft: 100 }}>
        <FlatList data={newNumberSet} keyExtractor={item => item.id} numColumns={10} renderItem={renderItem} />
      </View>
    )
	}
}

const mapDispatchToProps = {
    createNumberSet,
    setNumber,
}

const mapStateToProps = state => ({
    defaultNumberSet: getDefaultNumberSet(state),
    newNumberSet: getNewNumberSet(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(NumbersList)