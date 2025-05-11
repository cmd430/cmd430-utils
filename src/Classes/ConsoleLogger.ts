import { inspect } from 'node:util'
import { existsSync, unlinkSync , appendFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { strip } from '../Log'

/* eslint-disable no-underscore-dangle */
/**
 * @example
 * import { ConsoleLogger } from 'cmd430-utils/log'
 *
 * ConsoleLogger.setDir(import.meta.dir)              // optional defaults to cwd
 * ConsoleLogger.setNames('stdout.log', 'stderr.log') // optional these are the defaults
 * ConsoleLogger.enable()
 * ConsoleLogger.clear()                              // optional clears the log files
 */
export class ConsoleLogger {

  private static _console = {
    log: globalThis.console.log,
    info: globalThis.console.info,
    warn: globalThis.console.warn,
    error: globalThis.console.error,
    debug: globalThis.console.debug,
    group: globalThis.console.group,
    groupEnd: globalThis.console.groupEnd
  }
  private static _enabled: boolean = false
  private static _dirPath: string = '.'
  private static _stdOut: string = 'stdout.log'
  private static _stdErr: string = 'stderr.log'

  /**
   * Clear/Delete the log files if they exist
   */
  public static clear (): void {
    const stdOut = ConsoleLogger.stdOutPath
    const stdErr = ConsoleLogger.stdErrPath

    if (existsSync(stdOut)) unlinkSync(stdOut)
    if (existsSync(stdErr)) unlinkSync(stdErr)
  }

  private static get stdOutPath (): string {
    return resolve(ConsoleLogger._dirPath, ConsoleLogger._stdOut)
  }

  private static get stdErrPath (): string {
    return resolve(ConsoleLogger._dirPath, ConsoleLogger._stdErr)
  }

  private static _write (type: keyof typeof ConsoleLogger._console, args: Parameters<typeof console.log>): void {
    const path = type === 'error' ? ConsoleLogger.stdErrPath : ConsoleLogger.stdOutPath

    ConsoleLogger._console[type](...args)

    return appendFileSync(path, `${args.map(arg => strip((typeof(arg) === 'string') ? arg : inspect(arg, {
      colors: false,
      depth: 10
    }))).join(' ')}\n`, 'utf8')
  }

  /**
   * Enable writing console.<log|info|warn|error|debug|group|groupEnd> to log files
   */
  public static enable (): void {
    if (ConsoleLogger.enabled) return
    globalThis.console.log = (...args: Parameters<typeof console.log>): ReturnType<typeof console.log> => ConsoleLogger._write('log', args)
    globalThis.console.info = (...args: Parameters<typeof console.info>): ReturnType<typeof console.info> => ConsoleLogger._write('info', args)
    globalThis.console.warn = (...args: Parameters<typeof console.warn>): ReturnType<typeof console.warn> => ConsoleLogger._write('warn', args)
    globalThis.console.error = (...args: Parameters<typeof console.error>): ReturnType<typeof console.error> => ConsoleLogger._write('error', args)
    globalThis.console.debug = (...args: Parameters<typeof console.debug>): ReturnType<typeof console.debug> => ConsoleLogger._write('debug', args)
    globalThis.console.group = (...args: Parameters<typeof console.group>): ReturnType<typeof console.group> => ConsoleLogger._write('group', args)
    globalThis.console.groupEnd = (...args: Parameters<typeof console.groupEnd>): ReturnType<typeof console.groupEnd> => ConsoleLogger._write('groupEnd', args)
    ConsoleLogger._enabled = true
  }

  /**
   * Disable writing console.<log|info|warn|error|debug|group|groupEnd> to log files
   */
  public static disable (): void {
    if (ConsoleLogger.enabled === false) return
    globalThis.console.log = ConsoleLogger._console.log
    globalThis.console.info = ConsoleLogger._console.info
    globalThis.console.warn = ConsoleLogger._console.warn
    globalThis.console.error = ConsoleLogger._console.error
    globalThis.console.debug = ConsoleLogger._console.debug
    globalThis.console.group = ConsoleLogger._console.group
    globalThis.console.groupEnd = ConsoleLogger._console.groupEnd
    ConsoleLogger._enabled = false
  }

  /**
   * Toggle writing console.<log|info|warn|error|debug|group|groupEnd> to log files
   */
  public static toggle (): void {
    if (ConsoleLogger.enabled) {
      return ConsoleLogger.disable()
    }

    return ConsoleLogger.enable()
  }

  /**
   * Set the directory path for the log files
   */
  public static setDir (dirpath: string): void {
    ConsoleLogger._dirPath = dirpath
  }

  /**
   * File names for the two log files (stdout, stderr)
   */
  public static setNames (stdout: string, stderr: string): void {
    ConsoleLogger._stdOut = stdout
    ConsoleLogger._stdErr = stderr
  }

  /**
   * Check if writing the log files is enabled or not
   */
  public static get enabled (): boolean {
    return ConsoleLogger._enabled
  }

}
/* eslint-enable no-underscore-dangle */
