import { api } from "@/services/api";

const xrCache: Map<string, object> = new Map();

export async function loadXr(vid) {
  let xr = xrCache.get(vid);
  if (!xr) {
    const data = await api.bible.loadCrossReferences(vid);
    const lines = data.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const [bookId, chapterId] = vid.split(":");
      const _vid = `${bookId}:${chapterId}:${i + 1}`;
      xrCache.set(
        _vid,
        parseLine(lines[i]),
      );
    }
    xr = xrCache.get(vid);
  }
  return xr;
}
function parseLine(line: string) {
  const [, ...tokens] = line.split("`");
  const xrs = [];
  if (tokens) {
    tokens.forEach((xr) => {
      xrs.push(parseXr(xr));
    });
  }
  return xrs;
}
export function parseXr(xr) {
  const tokens = xr.split("₋");
  const vids = [];
  if (tokens.length > 1) {
    tokens[3].split(",").forEach((verseId) => {
      vids.push(`${tokens[1]}:${tokens[2]}:${verseId}`);
    });
  }
  return {
    title: tokens[0],
    vids,
  };
}
