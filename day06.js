const shiftFishCounts = fishCounts => {
  const initialZeroCount = fishCounts[0].count
  for (let i = 0; i < 8; i++) {
    if (i === 6) {
      fishCounts[6].count = initialZeroCount + fishCounts[7].count
    } else if (i !== 8) {
      fishCounts[i].count = fishCounts[i + 1].count
    }
  }
  fishCounts[8].count = initialZeroCount
}

const countLanternfish = (input, cycles) => {
  const inputArray = input.split(',').map(value => +value)
  const fishCounts = {
        "0" : { count: 0, "hatch": false },
        "1" : { count: 0, "hatch": false },
        "2" : { count: 0, "hatch": false },
        "3" : { count: 0, "hatch": false },
        "4" : { count: 0, "hatch": false },
        "5" : { count: 0, "hatch": false },
        "6" : { count: 0, "hatch": false },
        "7" : { count: 0, "hatch": false },
        "8" : { count: 0, "hatch": false },
    };
    inputArray.forEach(num => fishCounts[num].count++)

    for (let i = 0; i < cycles; i++) {
      shiftFishCounts(fishCounts)
    }
    
    let totalNumberOfFish = 0
    Object.keys(fishCounts).forEach(key => {
      totalNumberOfFish += fishCounts[key].count
    })

    return totalNumberOfFish
  }
