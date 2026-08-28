import { useEffect, useRef } from 'react'
import './intro.css'

const INTRO_DURATION_MS = 7800

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const range = (progress: number, start: number, end: number) => clamp01((progress - start) / (end - start))
const smooth = (value: number) => value * value * (3 - 2 * value)
const easeOutQuint = (value: number) => 1 - Math.pow(1 - value, 5)
const easeInCubic = (value: number) => value * value * value
const pulse = (progress: number, riseStart: number, riseEnd: number, fallStart: number, fallEnd: number) => smooth(range(progress, riseStart, riseEnd)) * (1 - smooth(range(progress, fallStart, fallEnd)))

const timelineProperties = [
  '--drop-y', '--drop-opacity', '--drop-scale-x', '--drop-scale-y', '--surface-opacity', '--surface-scale',
  '--impact-opacity', '--impact-scale', '--ripple-one-scale', '--ripple-one-opacity', '--ripple-two-scale',
  '--ripple-two-opacity', '--ripple-three-scale', '--ripple-three-opacity', '--intro-reveal', '--title-opacity',
  '--title-blur', '--title-scale', '--nav-opacity', '--nav-blur', '--nav-y', '--nav-scale', '--eyebrow-opacity',
  '--eyebrow-blur', '--eyebrow-y', '--copy-opacity', '--copy-blur', '--copy-y', '--actions-opacity',
  '--actions-blur', '--actions-y', '--skip-opacity',
] as const

export function IntroExperience({ onComplete }: { onComplete: () => void }) {
  const completedRef = useRef(false)
  const skipRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.site-shell')
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    skipRef.current?.focus({ preventScroll: true })
    let frame = 0
    const startedAt = performance.now()

    const complete = () => {
      if (completedRef.current) return
      completedRef.current = true
      onComplete()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') complete()
    }

    const setNumber = (name: string, value: number) => root?.style.setProperty(name, value.toFixed(4))
    const setValue = (name: string, value: string) => root?.style.setProperty(name, value)

    const updateTimeline = (now: number) => {
      const progress = clamp01((now - startedAt) / INTRO_DURATION_MS)
      const mobile = window.innerWidth <= 700
      const rippleLimit = mobile ? 24 : 28
      const dropDistance = mobile ? 35 : 36

      const formation = smooth(range(progress, 0.02, 0.1))
      const fall = easeInCubic(range(progress, 0.06, 0.22))
      const compression = smooth(range(progress, 0.205, 0.255))
      setValue('--drop-y', `${fall * dropDistance}svh`)
      setNumber('--drop-opacity', formation * (1 - compression))
      setNumber('--drop-scale-x', 0.45 + formation * 0.55 + compression * 0.65)
      setNumber('--drop-scale-y', 0.45 + formation * 0.55 - compression * 0.84)

      setNumber('--surface-opacity', 0.4 * pulse(progress, 0.025, 0.1, 0.26, 0.48))
      setNumber('--surface-scale', 0.35 + 0.65 * easeOutQuint(range(progress, 0.04, 0.36)))
      const impact = pulse(progress, 0.205, 0.245, 0.27, 0.37)
      setNumber('--impact-opacity', impact)
      setNumber('--impact-scale', 0.2 + impact * 2.65)

      const waveOne = easeOutQuint(range(progress, 0.22, 0.79))
      const waveTwo = easeOutQuint(range(progress, 0.255, 0.87))
      const waveThree = easeOutQuint(range(progress, 0.3, 0.97))
      setNumber('--ripple-one-scale', 0.15 + waveOne * (rippleLimit - 0.15))
      setNumber('--ripple-two-scale', 0.15 + waveTwo * (rippleLimit - 0.15))
      setNumber('--ripple-three-scale', 0.15 + waveThree * (rippleLimit - 0.15))
      setNumber('--ripple-one-opacity', 0.72 * smooth(range(progress, 0.215, 0.255)) * Math.pow(1 - waveOne, 1.15))
      setNumber('--ripple-two-opacity', 0.5 * smooth(range(progress, 0.25, 0.29)) * Math.pow(1 - waveTwo, 1.18))
      setNumber('--ripple-three-opacity', 0.3 * smooth(range(progress, 0.295, 0.34)) * Math.pow(1 - waveThree, 1.2))

      const reveal = easeOutQuint(range(progress, 0.24, 0.91))
      setValue('--intro-reveal', `${reveal * 155}%`)

      const title = smooth(range(progress, 0.31, 0.84))
      setNumber('--title-opacity', title)
      setValue('--title-blur', `${(1 - title) * 9}px`)
      setNumber('--title-scale', 0.985 + title * 0.015)

      const nav = smooth(range(progress, 0.5, 0.9))
      setNumber('--nav-opacity', nav)
      setValue('--nav-blur', `${(1 - nav) * 4}px`)
      setValue('--nav-y', `${(1 - nav) * -0.7}rem`)
      setNumber('--nav-scale', 0.985 + nav * 0.015)

      const eyebrow = smooth(range(progress, 0.45, 0.84))
      const copy = smooth(range(progress, 0.52, 0.9))
      const actions = smooth(range(progress, 0.58, 0.92))
      setNumber('--eyebrow-opacity', eyebrow)
      setValue('--eyebrow-blur', `${(1 - eyebrow) * 2}px`)
      setValue('--eyebrow-y', `${(1 - eyebrow) * 0.55}rem`)
      setNumber('--copy-opacity', copy)
      setValue('--copy-blur', `${(1 - copy) * 2}px`)
      setValue('--copy-y', `${(1 - copy) * 0.75}rem`)
      setNumber('--actions-opacity', actions)
      setValue('--actions-blur', `${(1 - actions) * 2}px`)
      setValue('--actions-y', `${(1 - actions) * 0.75}rem`)
      setNumber('--skip-opacity', smooth(range(progress, 0.025, 0.09)) * (1 - smooth(range(progress, 0.93, 0.99))))

      if (progress < 1) frame = requestAnimationFrame(updateTimeline)
      else complete()
    }

    window.addEventListener('keydown', handleKeyDown)
    frame = requestAnimationFrame(updateTimeline)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      timelineProperties.forEach((property) => root?.style.removeProperty(property))
    }
  }, [onComplete])

  const skip = () => {
    if (completedRef.current) return
    completedRef.current = true
    onComplete()
  }

  return (
    <div className="intro-experience" role="dialog" aria-modal="true" aria-label="Opening portfolio introduction">
      <div className="intro-experience__stage" aria-hidden="true">
        <span className="intro-experience__glint" />
        <span className="intro-experience__surface" />
      </div>
      <div className="intro-experience__drop-path" aria-hidden="true"><span className="intro-experience__droplet" /></div>
      <div className="intro-experience__impact" aria-hidden="true">
        <span className="intro-experience__impact-core" />
        <span className="intro-experience__ripple intro-experience__ripple--one" />
        <span className="intro-experience__ripple intro-experience__ripple--two" />
        <span className="intro-experience__ripple intro-experience__ripple--three" />
      </div>
      <button ref={skipRef} className="intro-experience__skip" type="button" onClick={skip}>Skip <span aria-hidden="true">→</span></button>
    </div>
  )
}
