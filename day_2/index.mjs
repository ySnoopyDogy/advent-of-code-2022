import fs from 'node:fs'
const inputPath = 
  process.env.NODE_ENV === 'TEST' 
    ? './example.txt'
    : process.argv.slice(2)[0] ?? './input.txt';

const input = fs.readFileSync(inputPath, {encoding: 'utf-8'}).split("\n").map(a => a.replace('\r', ''));

const choiceScore = { X: 1, Y: 2, Z: 3 };

const resultScore = { LOST: 0, DRAW: 3, WIN: 6 };

const todoResults = { LOST: 'X', DRAW: 'Y', WIN: 'Z' };

const figureWhatToPlay = (enemy, todo) => {
  console.log(enemy, todo)
  if(todo === todoResults.LOST) {
    if(enemy === 'A') return [enemy, 'Z'];
    if(enemy === 'B') return [enemy, 'X'];
    if(enemy === 'C') return [enemy, 'Y'];
  }

  if(todo === todoResults.DRAW) {
    if(enemy === 'A') return [enemy, 'X'];
    if(enemy === 'B') return [enemy, 'Y'];
    if(enemy === 'C') return [enemy, 'Z'];
  }

  if(todo === todoResults.WIN) {
    if(enemy === 'A') return [enemy, 'Y'];
    if(enemy === 'B') return [enemy, 'Z'];
    if(enemy === 'C') return [enemy, 'X'];
  }
}

const matchScore = (enemy, you) => {
  const baseScore = choiceScore[you]

  if(
    enemy === 'A' && you === 'X' || 
    enemy === 'B' && you === 'Y' ||
    enemy === 'C' && you === 'Z'
    ) return resultScore.DRAW + baseScore;

  if(
    enemy === 'A' && you === 'Y' || 
    enemy === 'B' && you === 'Z' ||
    enemy === 'C' && you === 'X'
    ) return resultScore.WIN + baseScore;

  return baseScore;
}

const firstPart = input.reduce((p,c) => {
  const toPlay = c.split(' ')

  const result = matchScore(toPlay[0], toPlay[1])

  return p + result
}, 0)

const secondPart = input.reduce((p,c) => {
  const toPlay = c.split(' ')
  const toCalculate = figureWhatToPlay(toPlay[0], toPlay[1])

  const result = matchScore(toCalculate[0], toCalculate[1])

  return p + result
}, 0)

console.log(firstPart)
console.log(secondPart)
