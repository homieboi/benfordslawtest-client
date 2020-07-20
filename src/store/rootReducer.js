import { update } from 'ramda'
import {
	CREATE_NUMBER_SET,
	SET_NUMBER_RANDOM,
	SET_NUMBER_REAL,
	SET_HAS_TEST_STARTED,
	SET_NEXT_STAGE,
	SET_EMAIL,
} from './types'
import {
	getSmallerNumSet,
	flipCoin,
	numbersReal,
	numbersRandom,
} from '../helpers'
import { REAL, RANDOM } from '../constants'

const stages = [REAL, RANDOM]
const coin = flipCoin()
const initialStage = stages[+coin]

const initialState = {
	stageCount: 0,
	hasTestStarted: false,
	hasTestFinished: false,
	stage: initialStage,
	user: {
		id: undefined,
		email: '',
	},
	numbersReal: {
		defaultNumberSet: numbersReal,
		newNumberSet: numbersReal,
	},
	numbersRandom: {
		defaultNumberSet: numbersRandom,
		newNumberSet: numbersRandom,
	},
}

export const rootReducer = (state = initialState, action) => {
	const { payload, type } = action
	
	switch (type) {
		case CREATE_NUMBER_SET: {
			var orderedNumberSet = []
			
			const numberSet = getSmallerNumSet()
			numberSet.map((value, id) => orderedNumberSet.push({ id, value }))

			return {
				...state,
				numbersRandom: {
					defaultNumberSet: orderedNumberSet,
					newNumberSet: orderedNumberSet,
				},
			}
		}

		case SET_NUMBER_RANDOM: {
			const { id } = payload

			return {
				...state,
					numbersRandom: {
						...state.numbersRandom,
						newNumberSet: update(id, payload, state.numbersRandom.newNumberSet)
				},
			}
		}

		case SET_NUMBER_REAL: {
			const { id } = payload

			return {
				...state,
				numbersReal: {
					...state.numbersReal,
					newNumberSet: update(id, payload, state.numbersReal.newNumberSet)
				},
			}
		}

		case SET_HAS_TEST_STARTED:
			return {
				...state,
				hasTestStarted: true,
			}

		case SET_NEXT_STAGE: {
			const stage = state.stage === REAL ? RANDOM : REAL

			return {
				...state,
				hasTestFinished: state.stageCount === 1,
				stage,
				stageCount: state.stageCount + 1,
			}
		}

		case SET_EMAIL:
			return {
				...state,
				user: {
					...state.user,
					email: action.payload,
				}
			}
		
		default: return state
	}
}