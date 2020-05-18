const csv = require('csvtojson');
const yargs = require('yargs');
const fs = require('fs');
const request = require('request');

const argv = yargs
  .scriptName("synch.js")
  .usage('$0 [args]')
  .help()
  .argv;

const dataUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vST1PSewhKjWy5inyw_loCQU_EyoVeYOX0ydmTUS-kHts-fCckIgj6fvo8ov_ZJjIskUOb7OWdOu_ix/pub?gid=415914948&single=true&output=csv'
const jsonFilePath = './src/people.json';

csv()
  .fromStream(request.get(dataUrl))
  .then((jsonObj)=>{
      let data = JSON.stringify(jsonObj, 0, 2);
      fs.writeFileSync(jsonFilePath, data);
      console.log(`Updated ${jsonFilePath}`);
  })
  .catch(console.error);


