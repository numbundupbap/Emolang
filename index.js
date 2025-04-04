import fs from "fs"
import { parseEmoji } from "./emoji_parser.js"

const data = fs.readFileSync("🤔.🤓😏👩‍💻", { encoding: "utf8" })
const dataMap = parseEmoji(data)

console.log(dataMap)