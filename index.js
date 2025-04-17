import fs from "fs"
import { parseEmoji } from "./parser.js"
import { tokenize } from "./lexer.js"
import { type } from "os";
import { analyzeEmoji } from "./test.js";
import { joinEmoji } from "./test.js";

const data = fs.readFileSync("🤔.🤓😏👩‍💻", { encoding: "utf8" })
// const dataMap = parseEmoji(data)

// let tokens = tokenize(dataMap); 

// console.log(dataMap)
// console.log(tokens)

const necessary_emojis = "\
🤕🪨\n\
🤠🥕\n\
👂\n\
🗣️\n\
📦\n\
🛢️👌💦🤮\n\
🤷🤷‍♂️🤷‍♀️\n\
👯‍♀️👯‍♂️👯\n\
💑👩‍❤️‍🧑👩‍❤️‍👩🧑‍❤️‍👩👨‍❤️‍👨👨‍❤️‍👩👨‍❤️‍🧑👩‍❤️‍👨🧑‍❤️‍👨👩‍❤️‍🧑\n\
👼\n\
🫵\n\
☝️🤓\n\
👨‍🦲🖕🤏🤹🔞\n\
👨❤️‍👩\n\
👂🏿🧑🏻‍❤️‍🧑🏽👨🏻‍❤️‍👨🏿\n\
🧑‍🦲👨‍🦲👩‍🦲\n\
🧑🏻‍❤️‍🧑🏿\
"

console.log(parseEmoji(necessary_emojis))

// console.log(joinEmoji('🧑', '🏻', 8205, '❤', 65039, 8205, '🧑'))

// console.log('🧑🏻‍❤️‍🧑🏽')