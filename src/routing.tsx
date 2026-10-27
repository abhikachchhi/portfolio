/* eslint-disable react-refresh/only-export-components -- Router context, hook, and link intentionally share this small dependency-free module. */
import { createContext, forwardRef, useContext, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react'
import { getBrowserPath } from './pathUtils'

type RouterValue = {
  path: string
  navigate: (to: string) => void
}

const RouterContext = createContext<RouterValue | null>(null)

export function RouterProvider({ children, value }: { children: ReactNode; value: RouterValue }) {
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRouter() {
  const router = useContext(RouterContext)
  if (!router) throw new Error('useRouter must be used within RouterProvider')
  return router
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ to, onClick, children, ...props }, ref) {
  const { navigate } = useRouter()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    navigate(to)
  }

  return <a ref={ref} href={getBrowserPath(to)} onClick={handleClick} {...props}>{children}</a>
})
