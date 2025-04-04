import fs from "fs"

const data = fs.readFileSync("🤔.🤓😏👩‍💻", {encoding:"utf8"})
const dataArray = Array.from(data)

console.log(data)
console.log(dataArray[0])