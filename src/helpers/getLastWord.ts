export function getLastWord (phrase: string): string | undefined {
  let word: string | undefined
  const pieces = phrase.split(' ')

  if (pieces?.length) {
    word = pieces[pieces.length - 1]
  }

  return word
}
