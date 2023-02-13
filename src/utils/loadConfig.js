import { toast } from '../components/Toast/index.js'

export function loadConfig(url) {
  console.log('figma-css-better: load remote config', url)
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      url,
      method: 'get',
      onload(xhr) {
        if (+xhr.status !== 200) {
          toast({ title: '配置加载失败' })
          reject(new Error('配置加载失败'))
          return
        }
        resolve(JSON.parse(xhr.response))
      },
      onerror(e) {
        toast({ title: '配置加载失败' + e.message })
        reject(e)
      },
    })
  })
}
