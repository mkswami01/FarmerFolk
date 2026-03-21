import { NextResponse } from "next/server";

function extractMeta(html: string) {
  const get = (pattern: RegExp): string => {
    const match = html.match(pattern);
    return match?.[1]?.trim() || "";
  };

  // Try OG tags first, then regular meta, then fallback to <title>
  const title =
    get(/<meta[^>]+property="og:title"[^>]+content="([^"]*)"/) ||
    get(/<meta[^>]+content="([^"]*)"[^>]+property="og:title"/) ||
    get(/<title[^>]*>([^<]*)<\/title>/);

  const description =
    get(/<meta[^>]+property="og:description"[^>]+content="([^"]*)"/) ||
    get(/<meta[^>]+content="([^"]*)"[^>]+property="og:description"/) ||
    get(/<meta[^>]+name="description"[^>]+content="([^"]*)"/) ||
    get(/<meta[^>]+content="([^"]*)"[^>]+name="description"/);

  const image =
    get(/<meta[^>]+property="og:image"[^>]+content="([^"]*)"/) ||
    get(/<meta[^>]+content="([^"]*)"[^>]+property="og:image"/);

  const siteName =
    get(/<meta[^>]+property="og:site_name"[^>]+content="([^"]*)"/) ||
    get(/<meta[^>]+content="([^"]*)"[^>]+property="og:site_name"/);

  return {
    title: siteName || title,
    description,
    image,
  };
}

export async function POST(request: Request) {
  const { url } = await request.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required." }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MarketFolk/1.0)",
        Accept: "text/html",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Could not reach that website." },
        { status: 400 }
      );
    }

    const html = await response.text();
    const meta = extractMeta(html);

    return NextResponse.json({
      businessName: meta.title || "",
      description: meta.description || "",
      image: meta.image || "",
    });
  } catch {
    return NextResponse.json(
      { error: "Could not fetch that website. Check the URL and try again." },
      { status: 400 }
    );
  }
}
