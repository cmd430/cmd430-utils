export async function wait ({ minutes = 0, seconds = 0, milliseconds = 0 }) {
  const delay = (1000 * 60 * minutes) + (1000 * seconds) + milliseconds

  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}
