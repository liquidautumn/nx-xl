import { execSync } from 'child_process'
import { ExecutorContext } from '@nrwl/devkit'

import { TestExecutorSchema } from './schema'
import executor from './executor'

jest.mock('child_process')

const options: TestExecutorSchema = {}
const context: ExecutorContext = {
  projectName: 'py',
  workspace: {
    projects: { py: { root: 'packages/py' } },
  },
} as unknown as ExecutorContext

describe('Test Executor', () => {
  beforeEach(() => {
    ;(execSync as jest.Mock).mockReset()
  })

  it('runs python unit test within project root', async () => {
    const output = await executor(options, context)
    expect(execSync).toHaveBeenCalledWith('python -m unittest discover .', {
      cwd: 'packages/py',
      stdio: [0, 1, 2],
    })
    expect(output.success).toBe(true)
  })
})
