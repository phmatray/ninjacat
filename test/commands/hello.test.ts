import * as childProcess from 'child_process'

describe('hello', () => {
  function cli(args: string[], cwd: string): Promise<unknown> {
    return new Promise((resolve): void => {
      const command = `./bin/run ${args.join(' ')}`
      childProcess.exec(command, { cwd }, (error, stdout, stderr) => {
        error
        const result = {
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr,
        }
        resolve(result)
      })
    })
  }

  it('should be 0 code', async () => {
    const result = await cli(['hello'], '.')
    expect((result as any).code).toBe(0)
  })

  it('should contains REST API in the welcome message', async () => {
    const result = await cli(['hello'], '.')
    expect((result as any).stdout).toContain('REST API')
  })
})
