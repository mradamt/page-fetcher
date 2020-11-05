const fs = require('fs');


const writeContentToFile = (path, content) => {
  fs.writeFile(path, content, (err) => {
    if (err) throw err;
    fs.stat(path, (err, stats) => {
      console.log(`Hi I'm a biscuit. ${stats.size}`)
    })
  })
}

// console.log(`Downloaded and saved ${written} bytes to ${path}`)


// writeContentToFile('tester.txt', 'testy testy test');

const checkFile = function(path) {
  fs.access(path, (err) => {
    if (err) {
      console.log(No file exists)
    } else {

      console.log("eyhehehe")
    }
  })
}

checkFile('testerr.txt');