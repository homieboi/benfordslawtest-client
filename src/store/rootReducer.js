import { update } from 'ramda'
import {
    CREATE_NUMBER_SET,
    SET_NUMBER_VALUE
} from './types'
import { getSmallerNumSet } from '../helpers'

const DE = 'de'
const EN = 'en'
const RU = 'ru'

const langs = { DE, EN, RU }

const initialState = {
    user: {
        id: undefined,
        lang: langs.DE,
        name: '',
        email: '',
    },
    numbers: {
        isFetchingDefaultNumberSet: false,
        isSavingNewNuberSet: false,
        defaultNumberSet: [],
        newNumberSet: [],
    },
}

export const rootReducer = (state = initialState, action) => {
    const { payload, type } = action

    switch (type) {
        case CREATE_NUMBER_SET: {
            const numberSet = getSmallerNumSet()
            var orderedNumberSet = []

            numberSet.map((value, id) => {
                return orderedNumberSet.push({ id, value })
            })

            return {
                ...state,
                numbers: {
                    defaultNumberSet: orderedNumberSet,
                    newNumberSet: orderedNumberSet,
                },
            }
        }

        case SET_NUMBER_VALUE: {
            const { index, value } = payload

            return {
                ...state,
                numbers: {
                    ...state.numbers,
                    newNumberSet: update(index, {id: index, value }, state.numbers.newNumberSet)
                },
            }
        }
        
        default: return state
    }
}