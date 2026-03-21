import { NextResponse } from "next/server";

function extractMeta(html: string, url: string) {
  const get = (pattern: RegExp): string => {
    const match = html.match(pattern);
    return match?.[1]?.trim() || "";
  };

  const getAll = (pattern: RegExp): string[] => {
    const matches: string[] = [];
    let match;
    const global = new RegExp(pattern.source, "gi");
    while ((match = global.exec(html)) !== null) {
      if (match[1]?.trim()) matches.push(match[1].trim());
    }
    return matches;
  };

  // --- Business Name ---
  // Priority: og:site_name > og:title > <title> (cleaned)
  const siteName =
    get(/<meta[^>]+property="og:site_name"[^>]+content="([^"]*)"/) ||
    get(/<meta[^>]+content="([^"]*)"[^>]+property="og:site_name"/);

  const ogTitle =
    get(/<meta[^>]+property="og:title"[^>]+content="([^"]*)"/) ||
    get(/<meta[^>]+content="([^"]*)"[^>]+property="og:title"/);

  const pageTitle = get(/<title[^>]*>([^<]*)<\/title>/);

  // Clean title: remove common suffixes like " | Shop", " - Home", " – All Products"
  function cleanTitle(t: string): string {
    return t
      .replace(/\s*[|–—-]\s*(home|shop|store|all products|welcome|official site|official website).*$/i, "")
      .replace(/\s*[|–—-]\s*$/i, "")
      .trim();
  }

  const businessName = siteName || cleanTitle(ogTitle) || cleanTitle(pageTitle);

  // --- Description ---
  const ogDesc =
    get(/<meta[^>]+property="og:description"[^>]+content="([^"]*)"/) ||
    get(/<meta[^>]+content="([^"]*)"[^>]+property="og:description"/);

  const metaDesc =
    get(/<meta[^>]+name="description"[^>]+content="([^"]*)"/) ||
    get(/<meta[^>]+content="([^"]*)"[^>]+name="description"/);

  // --- Extract body text for richer description ---
  // Strip scripts, styles, nav, header, footer, then get visible text
  let bodyText = "";
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) {
    bodyText = bodyMatch[1]
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<nav[\s\S]*?<\/nav>/gi, "")
      .replace(/<header[\s\S]*?<\/header>/gi, "")
      .replace(/<footer[\s\S]*?<\/footer>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/&[a-z]+;/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Get meaningful sentences (10+ chars, not just menu items)
  const sentences = bodyText
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20 && s.length < 300)
    .filter((s) => !s.match(/^(menu|cart|sign|log|account|search|skip|cookie)/i))
    .slice(0, 5);

  // Build the best description
  let description = ogDesc || metaDesc || "";

  // If description is too short or generic, supplement with body text
  if (description.length < 30 && sentences.length > 0) {
    description = sentences.slice(0, 3).join(". ") + ".";
  } else if (!description && sentences.length > 0) {
    description = sentences.slice(0, 3).join(". ") + ".";
  }

  // --- Headings for product hints ---
  const h1s = getAll(/<h1[^>]*>([^<]*)<\/h1>/);
  const h2s = getAll(/<h2[^>]*>([^<]*)<\/h2>/);
  const headings = [...h1s, ...h2s]
    .filter((h) => h.length > 3 && h.length < 100)
    .filter((h) => !h.match(/^(menu|cart|sign|log|account|search|home|shop|all)/i))
    .slice(0, 6);

  // --- Image ---
  const ogImage =
    get(/<meta[^>]+property="og:image"[^>]+content="([^"]*)"/) ||
    get(/<meta[^>]+content="([^"]*)"[^>]+property="og:image"/);

  // Make relative image URLs absolute
  let image = ogImage;
  if (image && !image.startsWith("http")) {
    try {
      image = new URL(image, url).href;
    } catch {
      image = "";
    }
  }

  return {
    businessName,
    description,
    headings,
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
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Could not reach that website." },
        { status: 400 }
      );
    }

    const html = await response.text();
    const meta = extractMeta(html, url);

    return NextResponse.json({
      businessName: meta.businessName || "",
      description: meta.description || "",
      headings: meta.headings || [],
      image: meta.image || "",
    });
  } catch {
    return NextResponse.json(
      { error: "Could not fetch that website. Check the URL and try again." },
      { status: 400 }
    );
  }
}
