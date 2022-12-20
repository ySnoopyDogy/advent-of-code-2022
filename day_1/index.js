const fs = require('node:fs')

const inputPath = process.argv.slice(2)[0] ?? './input.txt'

const input = fs.readFileSync(inputPath, {encoding: 'utf-8'}).split("\n\n");
const elves = input.map(a => a.split("\n")).map(b => b.map(c => Number(c)))

const calorias = elves.map(calorias => calorias.reduce((p,c) => p + c, 0))

calorias.sort((a,b) =>  b - a);

console.log('Maior Caloria: ', calorias[0])

console.log('Soma Maiores Calorias', calorias[0] + calorias[1] + calorias[2])







