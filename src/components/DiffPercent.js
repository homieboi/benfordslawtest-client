import React from 'react'
import { Text, View } from 'react-native-web'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getSumDefault, getSumNew } from '../store/selectors'

const mapStateToProps = createStructuredSelector({
	sumDefault: getSumDefault,
  	sumNew: getSumNew,
})

const DiffPercent = connect(mapStateToProps)(({ sumDefault, sumNew, containerStyle, textStyle }) => {
	const ratio = (sumNew / sumDefault) || 1
	const diff = ratio - 1
	const diffPercent = Number((diff * 100).toFixed(2))
	const string = `${diffPercent}%`

	return (
  <View style={[{ marginBottom: 12 }, containerStyle]}>
    <Text style={[{ fontSize: 24 }, textStyle]}>
      {string}
    </Text>
  </View>
	)
})

export { DiffPercent }