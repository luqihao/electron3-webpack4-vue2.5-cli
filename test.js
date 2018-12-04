const fs = require("fs")

const entryFiles = fs.readdirSync(__dirname)

console.log(entryFiles)