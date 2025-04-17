// 테스트용

export const analyzeEmoji = (str) => {
  const segmenter = new Intl.Segmenter('und', { granularity: 'grapheme' })
  const emojiMap = str.split('\n').map(line => {
    let emojiArr = Array.from(segmenter.segment(line), segment => segment.segment)
    
    emojiArr = emojiArr.map(chr => {
      const sus = Array.from(chr).map(chr => {
        if (/\p{Emoji}/gu.test(chr)) return chr
        if (chr === '\n') return chr
        if (/\s/.test(chr)) return chr.codePointAt()

        return chr.codePointAt()
      })
      return sus
    })

    return emojiArr
  }).filter(x => x.length)

  return emojiMap
}

export const joinEmoji = (...data) => {
  let str = ""

  for (const chr of data) {
    if (typeof chr === 'string')
      str += chr
    else
      str += String.fromCodePoint(chr)
  }

  return str
}