import { add, prop, reduce } from 'ramda'
import { createSelector } from 'reselect'
import { REAL } from '../constants'

const extractValueAndAdd = (acc, curr) => {
	const num = prop('value', curr)

	return add(acc, num)
}

const getUser = prop('user')

export const getStage = prop('stage')

const getNumbersReal = prop('numbersReal')

const getNumbersRandom = prop('numbersRandom')

const getCurrent = createSelector(
	getStage,
	getNumbersReal,
	getNumbersRandom,
	(stage, numbersReal, numbersRandom) => {
		if (stage === REAL) {
			return numbersReal
		}

		return numbersRandom
	}
)

export const getDefaultNumberSet = createSelector(
	getCurrent,
	prop('defaultNumberSet'),
)

export const getNewNumberSet = createSelector(
	getCurrent,
	prop('newNumberSet'),
)

export const getSumDefault = createSelector(getDefaultNumberSet, reduce(extractValueAndAdd, 0))

export const getSumNew = createSelector(getNewNumberSet, reduce(extractValueAndAdd, 0))

export const getHasTestStarted = prop('hasTestStarted')

export const getEmail = createSelector(getUser, prop('email'))

export const getExportData = createSelector(getNumbersRandom, getNumbersReal, (random, real) => [
	random.defaultNumberSet,
	random.newNumberSet,
	real.defaultNumberSet,
	real.newNumberSet
])

export const getStageCount = prop('stageCount')

export const getHasTestFinished = prop('hasTestFinished')

export const getHasInvalidData = createSelector(
	getNewNumberSet,
	newSet => {
		let hasInvalidData = false

		newSet.map(({ value }) => {
			if (value < 99 || value > 9999) {
				return hasInvalidData = true
			}

			return null
		})

		console.log('hasInvalidData', hasInvalidData)

		return hasInvalidData
	}
)