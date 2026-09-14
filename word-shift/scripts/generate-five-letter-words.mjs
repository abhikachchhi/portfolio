import fs from 'node:fs'
import wordListPath from 'word-list'

const outputPath = new URL('../src/data/allowedWords.generated.ts', import.meta.url)
const words = fs
  .readFileSync(wordListPath, 'utf8')
  .split(/\r?\n/)
  .map((word) => word.trim().toUpperCase())
  .filter((word) => /^[A-Z]{5}$/.test(word))

const uniqueWords = [...new Set(words)].sort()
const rows = []
for (let index = 0; index < uniqueWords.length; index += 12) {
  rows.push(`  ${uniqueWords.slice(index, index + 12).map((word) => `'${word}'`).join(', ')},`)
}

const source = [
  '// Generated from word-list 4.1.0 (MIT).',
  '// Regenerate with: npm run generate:words',
  'export const GENERATED_FIVE_LETTER_WORDS: string[] = [',
  ...rows,
  ']',
  '',
].join('\n')

fs.writeFileSync(outputPath, source)
console.log(`Generated ${uniqueWords.length} five-letter words.`)
