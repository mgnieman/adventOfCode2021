/*
  I converted the input here: https://dataconverter.curiousconcept.com/#
  using Input Format: CSV & Output Format: JSON
*/

const getBoard = (start, end) => {
  const board = []
  for (let i = start; i < end; i++) {
    board.push(allBoardsRaw[i])
  }
  return board
}

const getAllBoards = (input, numBoards) => {
  const boards = []
  for (let i = 1; i < numBoards; i++) {
    boards.push({
      boardNum: i,
      values: getValues(input, i)
    })
  }
  return boards
}

const getValues = (input, index) => {
  const rawVals = input.slice(index * 5, (index + 1) * 5)
  const rowsOfArrays = rawVals.map(row => row.replace(/^\s+/, '').replace(/  +/g, ' ').split(' '))
  const formattedVals = []
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      formattedVals.push(rowsOfArrays[i][j])
    }
  }
  return formattedVals
}

const checkForWinningRowOrColumn = (values, a, b, c, d, e) => {
  if (values[a] === 'X' && values[b] === 'X' && values[c] === 'X' && values[d] === 'X' && values[e] === 'X') {
    return true
  }
  return false
}

const checkForWinner = input => {
  const result = input.find(board => checkForWinningRowOrColumn(board.values, 0, 1, 2, 3, 4) ||
    checkForWinningRowOrColumn(board.values, 5, 6, 7, 8, 9) ||
    checkForWinningRowOrColumn(board.values, 10, 11, 12, 13, 14) ||
    checkForWinningRowOrColumn(board.values, 15, 16, 17, 18, 19) ||
    checkForWinningRowOrColumn(board.values, 20, 21, 22, 23, 24) ||
    checkForWinningRowOrColumn(board.values, 0, 5, 10, 15, 20) ||
    checkForWinningRowOrColumn(board.values, 1, 6, 11, 16, 21) ||
    checkForWinningRowOrColumn(board.values, 2, 7, 12, 17, 22) ||
    checkForWinningRowOrColumn(board.values, 3, 8, 13, 18, 23) ||
    checkForWinningRowOrColumn(board.values, 4, 9, 14, 19, 24)
  )
  return result
}

const findWinner = (boards, selectedNums) => {
  let winnerFound = false
  let i = 0;
  let selectedNumber
  while (winnerFound === false) {
    selectedNumber = selectedNums[i]
    boards.some(board => {
      board.values.forEach((value, index) => {
        if (value === selectedNumber) {
          board.values[index] = 'X'
        }
      })
    })
    i++
    if (checkForWinner(boards)) {
      winnerFound = true
    }
  }
  return {
    winningBoard: checkForWinner(boards),
    winningNumber: selectedNumber
  }
}

const bingo = input => {
  const selectedNums = input.shift()
  const allBoardsRaw = input.map(entry => entry[0])
  const boards = getAllBoards(allBoardsRaw, allBoardsRaw.length / 5)
  let winner
  while (boards.length > 0) {
    winner = findWinner(boards, selectedNums)
    const winnerIndex = boards.findIndex(board => board.boardNum === winner.winningBoard.boardNum)
    boards.splice(winnerIndex, 1)
  }
  const winningNumber = winner.winningNumber
  const unmarkedNums = winner.winningBoard.values.filter(num => num !== 'X')
  const sumOfUnmarkedNums = unmarkedNums.reduce((prev, curr) => +prev + +curr)
  return winningNumber * sumOfUnmarkedNums
}
