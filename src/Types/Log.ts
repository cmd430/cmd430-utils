import type { ColorFN } from './Colors'

export type LogType = 'log' | 'info' | 'warn' | 'error' | 'debug'
export type LogTagAlignment = 'left' | 'center' | 'ceter-padded' | 'right' | 'none'

export interface LogTagOptions {
  timestamps?: boolean
  alignment?: LogTagAlignment
  colors?: boolean
  showHidden?: boolean
  showDebug?: boolean
}

export interface NoticeOptions {
  type?: LogType
  colorFn?: ColorFN
  style?: 'single' | 'rounded' | 'double'
}
