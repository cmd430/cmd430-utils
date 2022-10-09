const { locale } = (() => Intl.DateTimeFormat().resolvedOptions())()

export const timestamp = () => new Date().toLocaleString(locale, {
  formatMatcher: 'best fit',
  weekday: 'short',
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
})
