import { describe, expect, it } from 'vitest'
import { getAdjacentProjects, getFeaturedProjects, getProjectBySlug, getPublishedProjects } from './projects'

describe('public project visibility', () => {
  it('publishes only the two completed projects', () => {
    expect(getPublishedProjects().map(({ slug }) => slug)).toEqual(['loop-tac', 'word-shift'])
    expect(getFeaturedProjects().map(({ slug }) => slug)).toEqual(['loop-tac', 'word-shift'])
  })

  it('does not resolve internal placeholder projects as public pages', () => {
    expect(getProjectBySlug('material-language')).toBeUndefined()
    expect(getProjectBySlug('signal-noise')).toBeUndefined()
    expect(getProjectBySlug('quiet-machine')).toBeUndefined()
  })

  it('moves between published projects without exposing placeholders', () => {
    const loopTac = getProjectBySlug('loop-tac')!
    const wordShift = getProjectBySlug('word-shift')!

    expect(getAdjacentProjects(loopTac)).toEqual({ previous: undefined, next: wordShift })
    expect(getAdjacentProjects(wordShift)).toEqual({ previous: loopTac, next: undefined })
  })
})
