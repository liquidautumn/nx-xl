import { ExecutorContext } from '@nrwl/devkit'

import { runBuild } from '../../utils/run'
import { BuildExecutorSchema } from './schema'

export default async function runExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext
) {
  const projectName = context.projectName
  if (!projectName) throw new Error('Project name requited')
  const input = context.workspace.projects[projectName].root
  const output = options.output || ''

  return runBuild({ input, output }, {})
}
