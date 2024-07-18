export function cutContent(content: string, query: string, len = 100) {
  const i = content.toLowerCase().indexOf(query.toLowerCase());

  if (i === -1) {
    return content.length > len ? content.slice(0, len) + '...' : content;
  }

  const half = Math.floor(len / 2);
  const s = Math.max(i - half, 0);
  const e = Math.min(i + query.length + half, content.length);

  let r = content.slice(s, e);

  if (s > 0) {
    r = '...' + r;
  }

  if (e < content.length) {
    r += '...';
  }

  return r;
}
