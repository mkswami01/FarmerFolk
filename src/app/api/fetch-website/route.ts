import { NextResponse } from "next/server";

const FETCH_OPTIONS = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "text/html,application/xhtml+xml",
  },
  signal: undefined as AbortSignal | undefined,
};

function get(html: string, pattern: RegExp): string {
  const match = html.match(pattern);
  return match?.[1]?.trim() || "";
}

function getAll(html: string, pattern: RegExp): string[] {
  const matches: string[] = [];
  let match;
  const global = new RegExp(pattern.source, "gi");
  while ((match = global.exec(html)) !== null) {
    if (match[1]?.trim()) matches.push(match[1].trim());
  }
  return matches;
}

function cleanTitle(t: string): string {
  return t
    .replace(/\s*[|–—-]\s*(home|shop|store|all products|welcome|official site|official website|about\s*us|about|contact).*$/i, "")
    .replace(/\s*[|–—-]\s*$/i, "")
    .trim();
}

function extractBusinessName(html: string): string {
  const siteName =
    get(html, /<meta[^>]+property="og:site_name"[^>]+content="([^"]*)"/) ||
    get(html, /<meta[^>]+content="([^"]*)"[^>]+property="og:site_name"/);

  const ogTitle =
    get(html, /<meta[^>]+property="og:title"[^>]+content="([^"]*)"/) ||
    get(html, /<meta[^>]+content="([^"]*)"[^>]+property="og:title"/);

  const pageTitle = get(html, /<title[^>]*>([^<]*)<\/title>/);

  return siteName || cleanTitle(ogTitle) || cleanTitle(pageTitle);
}

function extractContent(html: string, url: string) {
  // --- Description ---
  const ogDesc =
    get(html, /<meta[^>]+property="og:description"[^>]+content="([^"]*)"/) ||
    get(html, /<meta[^>]+content="([^"]*)"[^>]+property="og:description"/);

  const metaDesc =
    get(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/) ||
    get(html, /<meta[^>]+content="([^"]*)"[^>]+name="description"/);

  // --- Extract body text ---
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

  const sentences = bodyText
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20 && s.length < 300)
    .filter((s) => !s.match(/^(menu|cart|sign|log|account|search|skip|cookie)/i))
    .slice(0, 5);

  let description = ogDesc || metaDesc || "";
  if (description.length < 30 && sentences.length > 0) {
    description = sentences.slice(0, 3).join(". ") + ".";
  } else if (!description && sentences.length > 0) {
    description = sentences.slice(0, 3).join(". ") + ".";
  }

  // --- Headings ---
  const h1s = getAll(html, /<h1[^>]*>([^<]*)<\/h1>/);
  const h2s = getAll(html, /<h2[^>]*>([^<]*)<\/h2>/);
  const headings = [...h1s, ...h2s]
    .filter((h) => h.length > 3 && h.length < 100)
    .filter((h) => !h.match(/^(menu|cart|sign|log|account|search|home|shop|all)/i))
    .slice(0, 6);

  // --- Image ---
  const ogImage =
    get(html, /<meta[^>]+property="og:image"[^>]+content="([^"]*)"/) ||
    get(html, /<meta[^>]+content="([^"]*)"[^>]+property="og:image"/);

  let image = ogImage;
  if (image && !image.startsWith("http")) {
    try {
      image = new URL(image, url).href;
    } catch {
      image = "";
    }
  }

  return { description, headings, image, bodyText };
}

async function fetchPage(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      ...FETCH_OPTIONS,
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const { url } = await request.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required." }, { status: 400 });
  }

  try {
    // Parse the given URL to get the root domain
    const parsed = new URL(url);
    const rootUrl = `${parsed.protocol}//${parsed.host}`;
    const isRootPage = parsed.pathname === "/" || parsed.pathname === "";

    // Always fetch the given page for content
    const pageHtml = await fetchPage(url);
    if (!pageHtml) {
      return NextResponse.json(
        { error: "Could not reach that website." },
        { status: 400 }
      );
    }

    // Extract content (description, headings, image) from the given page
    const content = extractContent(pageHtml, url);

    // For business name: use the root page if user gave a subpage
    let businessName = "";
    if (isRootPage) {
      businessName = extractBusinessName(pageHtml);
    } else {
      // Fetch root page separately for the business name
      const rootHtml = await fetchPage(rootUrl);
      if (rootHtml) {
        businessName = extractBusinessName(rootHtml);
        // Also grab the root image if the subpage doesn't have one
        if (!content.image) {
          const rootImage =
            get(rootHtml, /<meta[^>]+property="og:image"[^>]+content="([^"]*)"/) ||
            get(rootHtml, /<meta[^>]+content="([^"]*)"[^>]+property="og:image"/);
          if (rootImage) {
            content.image = rootImage.startsWith("http")
              ? rootImage
              : new URL(rootImage, rootUrl).href;
          }
        }
      } else {
        // Fallback: get name from the subpage itself
        businessName = extractBusinessName(pageHtml);
      }
    }

    return NextResponse.json({
      businessName: businessName || "",
      description: content.description || "",
      headings: content.headings || [],
      image: content.image || "",
    });
  } catch {
    return NextResponse.json(
      { error: "Could not fetch that website. Check the URL and try again." },
      { status: 400 }
    );
  }
}
