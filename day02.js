/*
  I converted the input here: https://dataconverter.curiousconcept.com/#
  using Input Format: CSV & Output Format: JSON
*/

const dive = input => {
  const flattened = input.map(directionArray => directionArray[0])
  let { x, y, a } = {x: 0, y: 0, a: 0 }
  flattened.map(entry => entry.split(" ")).forEach(entry => {
    if (entry[0] === "forward") {
      x += +entry[1]
      y += +entry[1] * a
    } else if (entry[0] === "down") {
      a += +entry[1]
    } else if (entry[0] === "up") {
      a -= +entry[1]
    }
  })
  return x * y
}
