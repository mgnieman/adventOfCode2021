const numberOfIncreases = input => {
  const flattened = input.map(numArray => numArray[0])

  const sums = []
  for (let i = 0; i < flattened.length; i++) {
    const firstTerm = +flattened[i]
    const secondTerm = flattened[i + 1] ? +flattened[i + 1] : 0
    const thirdTerm = flattened[i + 2] ? +flattened[i + 2] : 0
    sums.push(firstTerm + secondTerm + thirdTerm)
  }

  let counter = 0
  for (let i = 0; i < sums.length; i++) {
    if (sums[i - 1] && sums[i] > sums[i - 1]) {
      counter++
    }
  }
  return counter
}
