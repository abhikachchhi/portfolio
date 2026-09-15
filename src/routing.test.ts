import { describe, expect, it } from 'vitest'
import { normalizePath } from './pathUtils'

describe('normalizePath', () => {
  it('keeps the homepage path intact', () => {
    expect(normalizePath('/')).toBe('/')
  })

  it('normalizes trailing slashes without changing the route', () => {
    expect(normalizePath('/about/')).toBe('/about')
    expect(normalizePath('/work/loop-tac///')).toBe('/work/loop-tac')
    expect(normalizePath('/playground/loop-tac/')).toBe('/playground/loop-tac')
  })
})
