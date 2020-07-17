import { add, reduce } from 'ramda'

export const getUser = state => state.user;

export const getIsFetchingDefaultNumberSet = state => state.numbers.isFetchingDefaultNumberSet

export const getIsSavingNewNumberSet = state => state.numbers.isSavingNewNumber

export const getDefaultNumberSet = state => state.numbers.defaultNumberSet

export const getNewNumberSet = state => state.numbers.newNumberSet

export const getDefaultNumberSetSum = state => reduce(add, 0, state.numbers.defaultNumberSet)

export const getNewNumberSetSum = state => reduce(add, 0, state.numbers.newNumberSet)