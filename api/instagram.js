const GRAPH_API_VERSION_PATTERN = /^v\d+\.\d+$/;
const MAX_PAGES = 6;
const POSTS_PER_PAGE = 25;
const FETCH_TIMEOUT_MS = 8000;

function safeHttpsUrl(value) {
  if (typeof value !== "string") return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function safeInstagramPermalink(value) {
  if (typeof value !== "string") return null;

  try {
    const url = new URL(value);
    const isInstagramHost =
      url.hostname === "instagram.com" || url.hostname.endsWith(".instagram.com");

    return url.protocol === "https:" && isInstagramHost ? url.toString() : null;
  } catch {
    return null;
  }
}

function getImageUrl(media) {
  if (media.media_type === "IMAGE") {
    return safeHttpsUrl(media.media_url);
  }

  if (media.media_type !== "CAROUSEL_ALBUM") {
    return null;
  }

  const children = media.children?.data ?? [];
  const firstImage = children.find(
    (child) => child.media_type === "IMAGE" && safeHttpsUrl(child.media_url),
  );

  return safeHttpsUrl(firstImage?.media_url) ?? safeHttpsUrl(media.media_url);
}

function toPublicPost(media) {
  const imageUrl = getImageUrl(media);
  const permalink = safeInstagramPermalink(media.permalink);

  if (!imageUrl || !permalink || typeof media.id !== "string") {
    return null;
  }

  return {
    id: media.id,
    imageUrl,
    permalink,
    caption: typeof media.caption === "string" ? media.caption : "",
    timestamp: typeof media.timestamp === "string" ? media.timestamp : null,
  };
}

function setNoStore(res) {
  res.setHeader("Cache-Control", "no-store");
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    setNoStore(res);
    return res.status(405).json({ error: "Método não permitido." });
  }

  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const instagramUserId = process.env.INSTAGRAM_USER_ID;

  if (!accessToken || !instagramUserId) {
    setNoStore(res);
    return res.status(503).json({ error: "Feed do Instagram não configurado." });
  }

  const apiVersion = process.env.INSTAGRAM_GRAPH_API_VERSION || "v26.0";
  if (!GRAPH_API_VERSION_PATTERN.test(apiVersion)) {
    setNoStore(res);
    return res.status(503).json({ error: "Configuração do feed do Instagram inválida." });
  }

  const mediaUrl = new URL(
    `https://graph.facebook.com/${apiVersion}/${encodeURIComponent(instagramUserId)}/media`,
  );
  mediaUrl.searchParams.set(
    "fields",
    "id,caption,media_type,media_url,permalink,timestamp,children{id,media_type,media_url,thumbnail_url}",
  );
  mediaUrl.searchParams.set("limit", String(POSTS_PER_PAGE));

  const posts = [];
  let after;
  const deadline = Date.now() + FETCH_TIMEOUT_MS;

  try {
    for (let page = 0; page < MAX_PAGES && posts.length < 3; page += 1) {
      const remainingTime = deadline - Date.now();
      if (remainingTime <= 0) break;

      const pageUrl = new URL(mediaUrl);
      if (after) pageUrl.searchParams.set("after", after);

      const response = await fetch(pageUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
        signal: AbortSignal.timeout(remainingTime),
      });

      if (!response.ok) {
        setNoStore(res);
        return res.status(502).json({ error: "Feed do Instagram temporariamente indisponível." });
      }

      const result = await response.json();
      const media = Array.isArray(result.data) ? result.data : [];

      for (const item of media) {
        if (item.media_type !== "IMAGE" && item.media_type !== "CAROUSEL_ALBUM") {
          continue;
        }

        const post = toPublicPost(item);
        if (post) posts.push(post);
        if (posts.length === 3) break;
      }

      after = result.paging?.cursors?.after;
      if (posts.length === 3 || !after || media.length === 0) break;
    }

    res.setHeader("Cache-Control", "public, s-maxage=900, stale-while-revalidate=3600");
    res.setHeader("Vercel-CDN-Cache-Control", "max-age=900, stale-while-revalidate=3600");
    return res.status(200).json({ posts });
  } catch {
    setNoStore(res);
    return res.status(502).json({ error: "Feed do Instagram temporariamente indisponível." });
  }
}
