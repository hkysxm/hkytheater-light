import { execFileSync } from 'node:child_process'

function git(cwd, args) {
  return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()
}

export function ensureFullGitHistory(cwd) {
  if (git(cwd, ['rev-parse', '--is-shallow-repository']) !== 'true') return

  // Fetch ancestors of the exact build commit. Do not pull or change the checkout.
  const commit = git(cwd, ['rev-parse', 'HEAD'])
  execFileSync('git', ['fetch', '--unshallow', '--no-tags', 'origin', commit], {
    cwd, stdio: ['ignore', 'pipe', 'pipe'], timeout: 180_000
  })
  if (git(cwd, ['rev-parse', '--is-shallow-repository']) === 'true') {
    throw new Error('Full Git history is required to sort articles by their first commit.')
  }
}

export function firstCommitTime(cwd, path) {
  // Literal pathspecs also handle brackets and other punctuation in article names.
  // Follow renames so moving an article does not reset its creation time.
  const output = git(cwd, ['log', '--follow', '--diff-filter=A', '--format=%ct', '--', `:(literal)${path}`])
  if (!output) return null // A new local article has not been committed yet.
  const times = output.split(/\s+/).map(Number)
  if (times.some(time => !Number.isFinite(time))) throw new Error(`Invalid Git timestamp for ${path}`)
  return Math.min(...times) * 1000
}

export function newestArticleFirst(a, b) {
  if (a.firstCommittedAt !== b.firstCommittedAt) {
    if (a.firstCommittedAt === null) return 1
    if (b.firstCommittedAt === null) return -1
    return b.firstCommittedAt - a.firstCommittedAt
  }
  return a.title.localeCompare(b.title, 'zh-CN') || a.url.localeCompare(b.url)
}
