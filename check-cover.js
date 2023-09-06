const fs = require('fs');
const cheerio = require('cheerio');


const html = fs.readFileSync('./coverage/lcov-report/index.html', 'utf8');
const $ = cheerio.load(html);

const statementsElement = $('.pad1y:contains("Statements") .strong');
const branchesElement = $('.pad1y:contains("Branches") .strong');
const functionsElement = $('.pad1y:contains("Functions") .strong');
const linesElement = $('.pad1y:contains("Lines") .strong');


const statements = parseFloat(statementsElement.text())
const branches = parseFloat(branchesElement.text())
const functions = parseFloat(functionsElement.text())
const lines = parseFloat(linesElement.text())
const rows = [{ name: "statements", value: statements }, { name: "branches", value: branches }, { name: "functions", value: functions }, { name: "lines", value: lines }]


rows.forEach(row => {
  if (row.value < 100) {
    throw new Error(`(${row.name}) -> coverage expected 100% NOT met with ${row.value}%`)
  }
})
