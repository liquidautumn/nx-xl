import { ExecutorContext } from '@nrwl/devkit'
import { execSync } from 'child_process'

export function runTest(
  context: ExecutorContext,
  params: Array<string | undefined>,
  options: { cwd?: string; cmd?: string } = {}
): { success: boolean } {
  const cmd = options.cmd || 'python -m unittest discover'
  const cwd = options.cwd || process.cwd()
  const execute = `${cmd} ${params.filter((n) => n).join(' ')}`

  try {
    console.log(`Executing command: ${execute}`)
    execSync(execute, { cwd, stdio: [0, 1, 2] })
    return { success: true }
  } catch (e) {
    console.error(`Failed to execute command: ${execute}`, e)
    return { success: false }
  }
}
