export const parseEmoji = (str) => {
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