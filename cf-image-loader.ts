export default function cloudflareLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  const params = [`width=${width}`, `quality=${quality || 75}`, 'format=auto', 'onerror=redirect']

  if (src.startsWith('https://cdn.mncgroup.ge')) {
    const path = src.replace('https://cdn.mncgroup.ge', '')
    return `https://cdn.mncgroup.ge/cdn-cgi/image/${params.join(',')}${path}`
  }

  return src
}
