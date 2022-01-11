const fuelStep = n => n <= 1 ? n : n + fuelStep(n - 1)

const calculateFuelSpent = input => {
  const arrayOfNums = input.split(',').map(num => +num).sort((a, b) => b - a)
  const leastValue = arrayOfNums[arrayOfNums.length - 1]
  const greatestValue = arrayOfNums[0]
  const targetsAndFuel = {}
  for (let i = leastValue; i <= greatestValue; i++) {
    targetsAndFuel[i] = 0
  }

  arrayOfNums.forEach(num => {
    Object.keys(targetsAndFuel).forEach(key => {
      const distance = targetsAndFuel[key] += fuelStep(Math.abs(key - num))
    })
  })

  return Math.min(...Object.values(targetsAndFuel))
}
