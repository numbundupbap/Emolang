import fs from "fs"
import { parseEmoji } from "./emoji_parser.js"
import { type } from "os";

const data = fs.readFileSync("🤔.🤓😏👩‍💻", { encoding: "utf8" })
const dataMap = parseEmoji(data)

let tokens = []; 

dataMap.forEach((s) => {
    let code = '';
    s.forEach((c, i) => {
        code += c;
        if (code == '☝️🤓') {
            tokens.push({type: "label", params: [s[i+1]]});
        } else if (code == '🤕🪨') {
            tokens.push({type: "start", params: []});
        } else if (code == '🤠🥕') {
            tokens.push({type: "exit", params: []});
        } else if (code == '📦') {}
    })
});

console.log(tokens)