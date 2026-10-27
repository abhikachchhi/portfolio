export function normalizePath(path: string) {
  const normalized = path.replace(/\/+$/, '')
  return normalized || '/'
}

function normalizeBasePath(basePath: string) {
  const withLeadingSlash = basePath.startsWith('/') ? basePath : `/${basePath}`
  return normalizePath(withLeadingSlash)
}

export function getAppPath(browserPath: string, basePath = import.meta.env.BASE_URL) {
  const normalizedPath = normalizePath(browserPath)
  const normalizedBase = normalizeBasePath(basePath)

  if (normalizedBase === '/') return normalizedPath
  if (normalizedPath === normalizedBase) return '/'
  if (normalizedPath.startsWith(`${normalizedBase}/`)) return normalizePath(normalizedPath.slice(normalizedBase.length))
  return normalizedPath
}

export function getBrowserPath(appPath: string, basePath = import.meta.env.BASE_URL) {
  const normalizedPath = normalizePath(appPath)
  const normalizedBase = normalizeBasePath(basePath)

  if (normalizedBase === '/') return normalizedPath
  return normalizedPath === '/' ? `${normalizedBase}/` : `${normalizedBase}${normalizedPath}`
}
