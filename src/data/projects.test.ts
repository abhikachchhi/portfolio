import { describe, expect, it } from 'vitest'
import { getAdjacentProjects, getFeaturedProjects, getProjectBySlug, getPublishedProjects } from './projects'

describe('public project visibility', () => {
  it('publishes the two completed projects and the in-progress exercise tracker', () => {
    expect(getPublishedProjects().map(({ slug }) => slug)).toEqual(['loop-tac', 'word-shift', 'exercise-tracker'])
    expect(getFeaturedProjects().map(({ slug }) => slug)).toEqual(['loop-tac', 'word-shift', 'exercise-tracker'])
  })

  it('does not resolve internal placeholder projects as public pages', () => {
    expect(getProjectBySlug('material-language')).toBeUndefined()
    expect(getProjectBySlug('signal-noise')).toBeUndefined()
    expect(getProjectBySlug('quiet-machine')).toBeUndefined()
  })

  it('moves between published projects without exposing placeholders', () => {
    const loopTac = getProjectBySlug('loop-tac')!
    const wordShift = getProjectBySlug('word-shift')!
    const exerciseTracker = getProjectBySlug('exercise-tracker')!

    expect(getAdjacentProjects(loopTac)).toEqual({ previous: undefined, next: wordShift })
    expect(getAdjacentProjects(wordShift)).toEqual({ previous: loopTac, next: exerciseTracker })
    expect(getAdjacentProjects(exerciseTracker)).toEqual({ previous: wordShift, next: undefined })
  })

  it('uses real interface media for every published project preview and hero', () => {
    for (const project of getPublishedProjects()) {
      expect(project.thumbnail?.kind).toBe('interface')
      expect(project.heroMedia?.kind).toBe('interface')
    }
  })
})
