export interface TestExecutorSchema {
  testPattern?: string
  testFramework?: 'unittest' | 'supatest'
}