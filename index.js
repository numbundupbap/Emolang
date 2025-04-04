import fs from "fs"

const data = fs.readFileSync("🤔.🤓😏👩‍💻", {encoding:"utf8"})
let dataArray = Array.from(data)

console.log(dataArray)
console.log(dataArray[0])

dataArray.filter(chr => {
  if (/\p{Emoji}/gu.test(chr)) return true
  if (chr === '\n') return true
  if (/[\s\uFE0F\u200D]/.test(chr)) return false

  throw new Error(`🤦🖕🔤${chr.codePointAt()}`)
})