const request = require('request');
const fs = require('fs');
const readline = require('readline');

/* Takes a URL and a local file path as command-line arguments 
 * and downloads the resource to the specified path. Example:
 * `node fetcher.js [url] [filePath]`
*/

// Parse command line args, extract url, extract local file path
const userUrl = process.argv[2];
const filePath = process.argv[3];

const validateInputs = (url, path) => {
  if (!url || !path) {
    console.log("ERROR: Incorrect input format, use `node fetcher.js [url] [filePath]`")
    return
  }
  downloadPage(url, path)
}

// Request [url], if successful, write page body to file at location [path]
const downloadPage = (url, path) => {
  request(url, (err, response, body) => {
    if (err) {
      console.log("ERROR: Download request failed. See error message below.")
      throw err;    
    }
    writeContentToFile(path, body);
  })
}

/*
// TODO::: Check if file already exists
const confirmOverwrite = (path, content) => {
  fs.access(path, (err) => {
    if (!err) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      rl.question('What do you think of Node.js? ', (answer) => {
        // TODO: Log the answer in a database
        console.log(`Thank you for your valuable feedback: ${answer}`);
      
        rl.close();
      });
    } else {
      console.log(`Hurrr ${path} doesn't exist`)
    }
  })
}
*/


// Overwrite the content in [path] with [content]
const writeContentToFile = (path, content) => {
  fs.writeFile(path, content, (err, written, string) => {
    if (err) {
    console.log("ERROR: File write failed. See error message below.")
    throw err;
    }
    fs.stat(path, (err, stats) => {
      console.log(`Downloaded and saved ${stats.size} bytes to ${path}`)
    })
  })
}


// Validate inputs and if valid trigger page download
validateInputs(userUrl, filePath)
// confirmOverwrite(filePath, "monkeys")
