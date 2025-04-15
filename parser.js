export let TOKEN_TYPE = {
  any: 0,
  number: 1,
  plus: 2,
  minus: 3,
  multiply: 4,
  input: 5,
  output: 6,
  variable: 7,
  array: 8,
  push: 9,
  pop: 10,
  shift: 11,
  if: 12,
  goto: 13,
  label: 14,
  begin: 15,
  end: 16
}

const splitEmoji = (str) => {
  const segmenter = new Intl.Segmenter('und', { granularity: 'grapheme' })
  const emojiMap = str.split('\n').map(line => {
    let emojiArr = Array.from(segmenter.segment(line), segment => segment.segment)
    
    emojiArr = emojiArr.filter(chr => {
      if (/\p{Emoji}/gu.test(chr)) return true
      if (chr === '\n') return true
      if (/\s/.test(chr)) return false
  
      throw new Error(`🤦🖕🔤`)
    })

    return emojiArr
  }).filter(x => x.length)

  return emojiMap
}

const testCode = {
  SELECTOR: 65039,
  JOINER: 8205,
  ANY: -1,
  PERSON: -2,
  GENDER: -3,
  SKIN_TONE: -4,

  // 플래그, 합산해서 써야 함
  OPTIONAL: -256
}

const testEmoji = (emoji, ...emojiTypes) => {
  const emojiData = Array.from(emoji)

  const hasFlag = (req, flag) => !!(-req & -flag)

  // optional 때문에 길이 바뀔 수 있음
  // if (emojiData.length !== emojiTypes.length)
  //   return false
  let i = 0
  let j = 0

  for (; i < emoji.length && j < emojiTypes.length; i++, j++) {
    const data = emojiData[i]
    const req = emojiTypes[j]

    if (req === testCode.ANY)
      continue

    if (typeof req === 'string') {
      if (data !== req)
        return false
    }
    else {
      if (req >= 0) {
        if(data !== String.fromCodePoint(req))
          return false
      }
      else {
        let flag = true
        switch (-(-req & 0xff)) {
          case testCode.PERSON: {
            if (!['👨', '👩', '🧑'].includes(data))
              flag = false
            break
          }
          case testCode.GENDER: {
            if (!['♂', '♀'].includes(data))
              flag = false
            break
          }
          case testCode.SKIN_TONE: {
            if (!['🏻', '🏼', '🏽', '🏾', '🏿'].includes(data))
              flag = false
            break
          }
        }

        if (!flag) {
          if (hasFlag(req, testCode.OPTIONAL)) {
            i--
            continue
          }
          else {
            return false
          }
        }
      }
    }
  }

  return !(i < emoji.length && j < emojiTypes.length) // 동시 종료 확인
}

const emojiTypePairs = {
  '🗣️': TOKEN_TYPE.output,
  '📦': TOKEN_TYPE.variable,
  '👼': TOKEN_TYPE.minus,
  '🫵': TOKEN_TYPE.goto,
  '🛢️': TOKEN_TYPE.array,
  '👌': TOKEN_TYPE.push,
  '💦': TOKEN_TYPE.pop,
  '🤮': TOKEN_TYPE.shift,
  '🤕': TOKEN_TYPE.begin,
  '🪨': TOKEN_TYPE.begin,
  '🤠': TOKEN_TYPE.end,
  '🥕': TOKEN_TYPE.end,
  '☝️': TOKEN_TYPE.label,
  '🤓': TOKEN_TYPE.label,
  '🖕': TOKEN_TYPE.number,
  '🤏': TOKEN_TYPE.number,
  '🤹': TOKEN_TYPE.number,
  '🔞': TOKEN_TYPE.number,
  '👂': TOKEN_TYPE.input,
  '🤷': TOKEN_TYPE.if,
  '👯': TOKEN_TYPE.multiply,
  '💑': TOKEN_TYPE.plus
}

export const parseEmoji = (str) => { 
  const emojiMap = splitEmoji(str)
  const emojiTokenMap = []

  const t = testCode

  for (const emojiArr of emojiMap) {
    const emojiTokens = []
    for (const emoji of emojiArr) {
      let emojiType

      if (emoji in emojiTypePairs) {
        emojiType = emojiTypePairs[emoji]
      }
      else if (testEmoji(emoji, '👂', t.SKIN_TONE)) {
        emojiType = TOKEN_TYPE.input
      }
      else if (testEmoji(emoji, t.PERSON, t.JOINER, '🦲')) {
        emojiType = TOKEN_TYPE.number
      }
      else if (testEmoji(emoji, '🤷', t.JOINER, t.GENDER, t.SELECTOR)) {
        emojiType = TOKEN_TYPE.if
      }
      else if (testEmoji(emoji, '👯', t.JOINER, t.GENDER, t.SELECTOR)) {
        emojiType = TOKEN_TYPE.multiply
      }
      else if (testEmoji(emoji, t.PERSON, t.SKIN_TONE + t.OPTIONAL, t.JOINER, '❤', t.SELECTOR, t.JOINER, t.PERSON, t.SKIN_TONE + t.OPTIONAL)) {
        emojiType = TOKEN_TYPE.plus
      }
      else {
        emojiType = TOKEN_TYPE.any
      }

      emojiTokens.push({
        type: emojiType,
        emoji
      })
    }
    emojiTokenMap.push(emojiTokens)
  }

  return emojiTokenMap
}