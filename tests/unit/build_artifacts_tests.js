import assert from 'assert'
import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'

const root = path.resolve(__dirname, '../..')

describe('Build artifacts', function() {
	it('does not commit generated bundles', function() {
		const tracked = execFileSync('git', ['ls-files', 'dist', 'examples/dist'], { cwd: root, encoding: 'utf8' })
		assert.equal(tracked.trim(), '')
	})

	it('ignores generated bundle folders', function() {
		const ignored = fs.readFileSync(path.join(root, '.gitignore'), 'utf8').split('\n')
		assert(ignored.includes('dist'))
	})
})
