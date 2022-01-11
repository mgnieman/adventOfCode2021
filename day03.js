/*
  I converted the input here: https://dataconverter.curiousconcept.com/#
  using Input Format: CSV & Output Format: JSON
*/

const getMoreCommonDigit = (str, position) => {
  let zeros = 0;
  let ones = 0;
  str.forEach(entry => {
    if (entry[position] === "1") {
      ones++
    } else {
      zeros++
    }
  })
  return ones >= zeros ? 1 : 0
}

const getLessCommonDigit = (str, position) => {
  let zeros = 0;
  let ones = 0;
  str.forEach(entry => {
    if (entry[position] === "1") {
      ones++
    } else {
      zeros++
    }
  })
  return ones < zeros ? 1 : 0
}

const powerConsumption = input => {
  const flattened = input.map(entry => entry[0])
  const gamma = []
  const epsilon = []
  for (let i = 0; i < flattened[0].length; i++) {
    gamma[i] = getMoreCommonDigit(flattened, i)
    epsilon[i] = 1 - gamma[i]
  }
  const gammaDec = parseInt(gamma.join(''), 2)
  const epsilonDec = parseInt(epsilon.join(''), 2)
  return gammaDec * epsilonDec
}

const getValuesWithCommonDigits = (arr, digit, i) => {
  const newArr = []
  arr.forEach(entry => {
    if (entry.charAt(i) === digit.toString()) {
      newArr.push(entry)
    }
  })
  return newArr
}

const getOxygenGeneratorRating = listOfBinaries => {
  let i = 0
  while (listOfBinaries.length > 1) {
    const moreCommonDigit = getMoreCommonDigit(listOfBinaries, i)
    listOfBinaries = getValuesWithCommonDigits(listOfBinaries, moreCommonDigit, i)
    i++
  }
  return listOfBinaries
}

const getCo2ScrubberRating = listOfBinaries => {
  let i = 0
  while (listOfBinaries.length > 1) {
    const lessCommonDigit = getLessCommonDigit(listOfBinaries, i)
    listOfBinaries = getValuesWithCommonDigits(listOfBinaries, lessCommonDigit, i)
    i++
  }
  return listOfBinaries
}

const lifeSupportRating = input => {
  const flattened = input.map(entry => entry[0])
  const oxygenRatingDecimal = parseInt(getOxygenGeneratorRating(flattened).join(''), 2)
  const co2RatingDecimal = parseInt(getCo2ScrubberRating(flattened).join(''), 2)
  return oxygenRatingDecimal * co2RatingDecimal
}
