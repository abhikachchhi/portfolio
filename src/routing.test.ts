import { describe, expect, it } from 'vitest'
import { getAppPath, getBrowserPath, normalizePath } from './pathUtils'

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

describe('deployment base paths', () => {
  it('maps a GitHub Pages URL to an application route', () => {
    expect(getAppPath('/portfolio/projects/exercise-tracker', '/portfolio/')).toBe('/projects/exercise-tracker')
    expect(getAppPath('/portfolio/', '/portfolio/')).toBe('/')
  })

  it('maps application routes back to GitHub Pages URLs', () => {
    expect(getBrowserPath('/projects/exercise-tracker', '/portfolio/')).toBe('/portfolio/projects/exercise-tracker')
    expect(getBrowserPath('/', '/portfolio/')).toBe('/portfolio/')
  })
})
