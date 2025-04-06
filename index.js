import fs from "fs"
import { parseEmoji } from "./emoji_parser.js"
import { tokenize } from "./lexer.js"
import { type } from "os";

const data = fs.readFileSync("🤔.🤓😏👩‍💻", { encoding: "utf8" })
const dataMap = parseEmoji(data)

let tokens = tokenize(dataMap); 

console.log(dataMap)
console.log(tokens)

debugger;