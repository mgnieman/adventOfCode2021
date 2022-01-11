// I borrowed some ideas from https://www.youtube.com/watch?v=CDK4TxkEd60

const getproductOfThreeLargestBasins = input => {
  const clean = input => input.split('\n').map(entry => entry.trim()).map(str => str.split(''))
  const arrayOfArrays = clean(input)
  const zerosAndNines = arrayOfArrays
    .map(arr => arr.map(value => value))
      .map(arr => arr.map(val => val === '9' ? 1 : 0))

  const floodFill = (x, y, matrix) => {
    let size = 0
    if (matrix[y][x] === 1) {
      return size
    } else {
      matrix[y][x] = 1
      size++
      // right
      if (x < matrix[y].length - 1)
        size += floodFill(x + 1, y, matrix)
      // left
      if (x > 0) {
        size += floodFill(x - 1, y, matrix)
      }
      // below
      if (y < matrix.length - 1) {
        size += floodFill(x, y + 1, matrix)
      }
      // above
      if (y > 0) {
        size += floodFill(x, y - 1, matrix)
      }
      return size
    }
  }
    
  const basins = []

  for (let y = 0; y < zerosAndNines.length; y++) {
    for (let x = 0; x < zerosAndNines[y].length; x++) {
      const size = floodFill(x, y, zerosAndNines)
      if (size > 0) {
        basins.push(size)
      }
    }
  }

  return basins.sort((a, b) => b - a).slice(0, 3).reduce((acc, curr) => acc * curr)
}
