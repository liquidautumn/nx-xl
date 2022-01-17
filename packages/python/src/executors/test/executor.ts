import { ExecutorContext } from '@nrwl/devkit'

import { runTest } from '../../utils/run'
import { TestExecutorSchema } from './schema'

export default async function runExecutor(
  options: TestExecutorSchema,
  context: ExecutorContext
) {
  const projectName = context.projectName
  if (!projectName) throw new Error('Project name requited')
  const sourceRoot = context.workspace.projects[projectName].root
  const cwd = `${sourceRoot}`
  const testDir = `.`
  const testPattern = options.testPattern ? '-p' : undefined

  return runTest(context, [testDir, testPattern], { cwd })
}
