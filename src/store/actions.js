import { CREATE_NUMBER_SET, SET_NUMBER_VALUE } from './types'

export const createNumberSet = payload => ({ type: CREATE_NUMBER_SET, payload })

export const setNumber = payload => ({ type: SET_NUMBER_VALUE, payload })