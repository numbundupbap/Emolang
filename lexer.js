import { type } from "os";

export const tokenize = (dataMap) => {  
  let int = ['👨‍🦲', '🖕', '🤏', '🤹', '🔞'] // 은근슬쩍 스리슬적 넣었다.
  const tokens = dataMap.map(line => {
    let l = line.join('');
    let token = [];
    if (l == '🤕🪨') {
      token.push({type: "start"})
    } else if (l == '🤠🥕') {
      token.push({type: "end"})
    } else {
      let i=0
      let tp = token
      while (i < line.length) {
        if (line[i] == '👂') {
          tp.push({type: "input", params: []})
          tp = tp[tp.length - 1].params
        } else if (line[i] == '📦') {
          tp.push({type: 'variable', params: [line[i+1]]})
          i++
        } else if (int.includes(line[i])) {
          let t = i;
          while (int.includes(line[i])) { i++ }
          tp.push({type: "number", params: line.slice(t, i)});
          i--
        } else if (['🤷', '🤷‍♂️', '🤷‍♀️'].includes(line[i])) {
          tp.push({type: "if", params: []})
          tp = tp[tp.length - 1].params
        } else if (line[i] == '🗣️') {
          tp.push({type: 'print', params: []})
          tp = tp[tp.length - 1].params
        } else if (line[i] == '🫵') {
          tp.push({type: 'goto', params: [line[i+1]]})
          i++
        } else if (line.slice(i, i+2).join('') == '☝️🤓') {
          tp.push({type: 'label', params: [line[i+2]]})
          i += 2
        } else if (['👯‍♀️','👯‍♂️','👯'].includes(line[i])) {
          tp.push({type: 'multi'})
        } else if (['💑','👩‍❤️‍🧑','👩‍❤️‍👩','🧑‍❤️‍👩','👨‍❤️‍👨','👨‍❤️‍👩','👨‍❤️‍🧑','👩‍❤️‍👨','🧑‍❤️‍👨'].includes(line[i])) {
          tp.push({type: 'plus'})
        } else if (line[i] == '👼') {
          tp.push({type: "minus"})
        }
        i++
      }
    }

    return token
  })

  return tokens
}