import rgba from 'color-rgba'

function isSameRgbaArr(a, b) {
  return a.every((i, index) => i === b[index])
}

export default function replace(content, colors) {
  const res = content.match(/(rgba?)\(.*?\)|#[a-fA-f\d]{6}|#[a-fA-f\d]{3}/g)
  let modified = false
  res?.forEach((i) => {
    const foundColor = colors.find((c) => isSameRgbaArr(rgba(c.color), rgba(i)))
    if (foundColor) {
      modified = true
      content = content.replace(
        new RegExp(`${i}(?![a-fA-f\\d])`),
        foundColor.new
      )
    }
  })
  return {
    content,
    modified,
  }
}
