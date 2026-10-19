const { spawnSync } = require('child_process')
const major = Number(process.versions.node.split('.')[0])
// VuePress 1 uses Webpack 4's legacy hash algorithm on OpenSSL 3 runtimes.
const flags = major >= 17 ? ['--openssl-legacy-provider'] : []
const result = spawnSync(process.execPath, [
  ...flags,
  require('path').join(require('path').dirname(require.resolve('vuepress')), 'cli.js'),
  ...process.argv.slice(2)
], { stdio: 'inherit' })
if (result.error) console.error(result.error)
process.exit(result.status === null ? 1 : result.status)
