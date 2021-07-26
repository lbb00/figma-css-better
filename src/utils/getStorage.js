export default function getStorage (key, def) {
  const res = localStorage.getItem(key)
  if (res) {
    return JSON.parse(res)
  } else {
    return def
  }
}
