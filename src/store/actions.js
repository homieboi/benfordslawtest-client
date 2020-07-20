import {
	CREATE_NUMBER_SET,
	SET_NUMBER_RANDOM,
	SET_NUMBER_REAL,
	SET_HAS_TEST_STARTED,
	SET_NEXT_STAGE,
	SET_EMAIL,
} from './types'

export const createNumberSet = payload => ({ type: CREATE_NUMBER_SET, payload })

export const setHasTestStarted = payload => ({ type: SET_HAS_TEST_STARTED, payload })

export const setNumberRandom = payload => ({ type: SET_NUMBER_RANDOM, payload })

export const setNumberReal = payload => ({ type: SET_NUMBER_REAL, payload })

export const setNextStage = () => ({ type: SET_NEXT_STAGE })

export const setEmail = payload => ({ type: SET_EMAIL, payload })