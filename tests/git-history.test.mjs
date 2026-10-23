import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, writeFileSync, renameSync, rmSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { ensureFullGitHistory, firstCommitTime, newestArticleFirst } from '../docs/.vitepress/git-history.mjs'

const temp = mkdtempSync(join(tmpdir(), 'hky-git-history-'))
after(() => rmSync(temp, { recursive: true, force: true }))
const repo = join(temp, 'source')
mkdirSync(repo)
const git = (cwd, args, env = {}) => execFileSync('git', args, {
  cwd, encoding: 'utf8', env: { ...process.env, ...env }, stdio: ['ignore', 'pipe', 'pipe']
}).trim()
git(repo, ['init'])
git(repo, ['config', 'user.name', 'History Test'])
git(repo, ['config', 'user.email', 'history@example.invalid'])
const commit = (message, date) => {
  git(repo, ['add', '.'])
  git(repo, ['-c', 'commit.gpgsign=false', 'commit', '-m', message], { GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date })
}
mkdirSync(join(repo, 'docs'))
const original = 'docs/[原始]-文章.md'
writeFileSync(join(repo, original), 'original\n')
commit('Import first article', '2020-01-02T00:00:00Z')
writeFileSync(join(repo, original), 'original\nupdate\n')
commit('Update article', '2022-03-04T00:00:00Z')
const renamed = 'docs/[重命名]-文章.md'
renameSync(join(repo, original), join(repo, renamed))
commit('Rename article', '2023-05-06T00:00:00Z')
writeFileSync(join(repo, 'docs/new.md'), 'new\n')
commit('Add newer article', '2024-07-08T00:00:00Z')

test('first addition time survives updates and renames; literal names work', () => {
  assert.equal(firstCommitTime(repo, renamed), Date.parse('2020-01-02T00:00:00Z'))
  assert.equal(firstCommitTime(repo, 'docs/new.md'), Date.parse('2024-07-08T00:00:00Z'))
  assert.equal(firstCommitTime(repo, 'docs/not-yet-committed.md'), null)
})

test('shallow checkout retrieves complete history without changing HEAD or content', () => {
  const shallow = join(temp, 'shallow')
  git(temp, ['clone', '--depth=1', pathToFileURL(repo).href, shallow])
  const head = git(shallow, ['rev-parse', 'HEAD'])
  const content = readFileSync(join(shallow, renamed), 'utf8')
  assert.equal(git(shallow, ['rev-parse', '--is-shallow-repository']), 'true')
  ensureFullGitHistory(join(shallow, 'docs'))
  assert.equal(git(shallow, ['rev-parse', '--is-shallow-repository']), 'false')
  assert.equal(firstCommitTime(shallow, renamed), Date.parse('2020-01-02T00:00:00Z'))
  assert.equal(git(shallow, ['rev-parse', 'HEAD']), head)
  assert.equal(readFileSync(join(shallow, renamed), 'utf8'), content)
  assert.equal(git(shallow, ['status', '--short']), '')
  ensureFullGitHistory(shallow) // Already complete: no fetch needed.
})

test('newer imports lead, ties use titles and uncommitted articles go last', () => {
  const articles = [
    { title: 'Z', url: '/z', firstCommittedAt: 100 },
    { title: 'Local', url: '/local', firstCommittedAt: null },
    { title: 'A', url: '/a', firstCommittedAt: 100 },
    { title: 'Newest', url: '/new', firstCommittedAt: 200 }
  ]
  assert.deepEqual(articles.sort(newestArticleFirst).map(a => a.url), ['/new', '/a', '/z', '/local'])
})
