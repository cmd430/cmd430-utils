export async function fetchJSON (input, init) {
  const res = await fetch(input, init)

  return res.text()
}
