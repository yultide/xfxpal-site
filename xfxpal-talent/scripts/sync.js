const csv = require('csvtojson');
const yargs = require('yargs');
const fs = require('fs');


const argv = yargs
  .scriptName("synch.js")
  .usage('$0 [args] csvfile')
  .help()
  .argv;

var csvFilePath = argv._[0] || './XFXPAL Talent.csv';
var jsonFilePath = './src/people.json';
console.log(`Processing ${csvFilePath} -> ${jsonFilePath}`);
csv()
  .fromFile(csvFilePath)
  .then((jsonObj)=>{
      let data = JSON.stringify(jsonObj, 0, 2);
      fs.writeFileSync(jsonFilePath, data);
      console.log(`Updated ${jsonFilePath}`);
  })
  .catch(console.error)

