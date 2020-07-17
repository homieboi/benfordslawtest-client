const R = require('ramda')
const { log10, log, random, exp } = Math

const maxNumSize = 1000
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
        for (let i = 0; i < 5; i++) {
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

module.exports = { benfordsRangeGen, countFirstDigits, isComplientWithBenfordLaw, getSmallerNumSet }