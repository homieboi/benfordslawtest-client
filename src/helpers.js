/* eslint-disable array-callback-return */
import data from './data.json'
const R = require('ramda')
const { log10, log, random, exp } = Math

const maxNumSize = 9999
const amountOfNum = 1000000
const reducingMap = [60, 35, 25, 20, 16, 13, 12, 10, 9] // for 200 numbers

const benfordsProbabilities = (() => {
    var result = []
    const rangeArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    
    rangeArray.map(d => {
			var probability = (log10(1 + 1 / d) * 100).toFixed(1)
			
			result.push(probability)
    })
    
    return result
})()

export const flipCoin = () => Math.random() - 0.5 > 0

const getReducedDistQuant = groups => {
	const groupsArray = Object.values(groups)

	var newGroups = []

	groupsArray.forEach((group, i) => {
		var newGroup = []

		group.map(num => {
			if (num >= 100) {
				newGroup.push(num)
			}
		})

		const newGroupSliced = newGroup.slice(0, reducingMap[i])

		newGroups.push(newGroupSliced)
	})

	return newGroups
}

const isComplientWithBenfordLaw = (distRandom = {}) => {
	const randNumValues = Object.values(distRandom)
	const roundedRandNumValues = randNumValues.map(num => num.toFixed(1))

	const arrayCombined = R.zip(roundedRandNumValues, benfordsProbabilities)
	const comparePairs = (acc, pair) => pair[0] === pair[1] && acc

	return R.reduce(comparePairs, true, arrayCombined)
}

const groupByFirstDigit = nums => {
	var groupsByFirstDigit = {
		1: [],
		2: [],
		3: [],
		4: [],
		5: [],
		6: [],
		7: [],
		8: [],
		9: [],
	}

	nums.map(num => {
		var firstDigit = parseInt(('' + num)[0], 10)
		groupsByFirstDigit[firstDigit].push(num)
	})

	return groupsByFirstDigit
}

// eslint-disable-next-line no-unused-vars
const sliceNFromGroups = (groups, n) => {
	const values = Object.values(groups)
	const result = []

	values.map(group => result.push(group.slice(-1 * n)))

	return result
}

const countFirstDigits = (numberSet, amountOfNum) => {
	const amountFactor = amountOfNum / 100
	var distByQuant = {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
		6: 0,
		7: 0,
		8: 0,
		9: 0,
	}

	numberSet.map(num => {
		var firstDigit = parseInt(('' + num)[0], 10)
		var currentDist = distByQuant[firstDigit]

		distByQuant[firstDigit] = currentDist + 1
	})

	let distPercent = {}
	Object.values(distByQuant).reduce((acc, value, index) => {
		const newValue = value / amountFactor
		
		distPercent[index + 1] = newValue
	}, {})

	return { distByQuant, distPercent }
}

const benfordsRangeGen = (maxNumSize, amountOfNum) => {
	var multiplier = log(maxNumSize)
	var table = []

	const rangeArray = [...Array(amountOfNum).keys()]

	rangeArray.map(() => {
		var number = parseInt(exp(multiplier * random()), 10)
		table.push(number)
	})

	return table
}

const shuffleArray = array => array.sort(() => Math.random() - 0.5);

const getSmallerNumSet = () => {
	var finalNumberSet = []
	var reducedDistQuant = []
		for (let i = 0; i < 10; i++) {
		const numSet = benfordsRangeGen(maxNumSize, amountOfNum)
		const { distPercent } = countFirstDigits(numSet, amountOfNum)
		const isComplient = isComplientWithBenfordLaw(distPercent)

		
		if (isComplient) {
			finalNumberSet = numSet
			break
		}
	}

	if (finalNumberSet.length > 0) {   
		const groups = groupByFirstDigit(finalNumberSet)

		reducedDistQuant = getReducedDistQuant(groups)
	}

	const result = shuffleArray(R.flatten(reducedDistQuant))

	return result
}

const createCsv = ([x, y, z, k], email) => {
	let csv = ''
	const csvHeader = `data:text/csv;charset=utf-8;%0D%0AContact Email Address: ${email}%0D%0AGiven Sample 1; Changed Sample 1; Given Sample 2; Changed Sample 2`
	csv += csvHeader

	x.map((item, i) => csv += `%0D%0A${x[i].value}; ${y[i].value}; ${z[i].value}; ${k[i].value}`)

	return csv
}

const numbersReal = (() => {
	var result = []
	const isDirty = false
	const parsedData = data.reduce((acc, curr, id) => {
		const item = R.prop('Einnahmen', curr)
		const parsed = parseInt(('' + item).replace(',', ''))
			
		return [...acc, parsed]
	}, [], data)

	const groups = groupByFirstDigit(parsedData)
	const reduced = getReducedDistQuant(groups)
	const shuffled = shuffleArray(R.flatten(reduced))

	shuffled.map((value, id) => result.push({ id, value, isDirty }))

	return result
})()

const numbersRandom = (() => {
	var orderedNumberSet = []
	const isDirty = false
	const numberSet = getSmallerNumSet()
			
	numberSet.map((value, id) => orderedNumberSet.push({ id, value, isDirty }))
	return orderedNumberSet
})()

export {
	benfordsRangeGen,
	countFirstDigits,
	createCsv,
	isComplientWithBenfordLaw,
	getSmallerNumSet,
	numbersReal,
	numbersRandom,
}