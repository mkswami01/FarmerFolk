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
    const parsed = new URL(url);

    // Business name: derive from domain name
    // e.g. "www.papajoeshoney.com" → "Papajoeshoney" → "Papa Joes Honey"
    const hostname = parsed.hostname.replace(/^www\./, "");
    const domainBase = hostname.split(".")[0]; // "papajoeshoney"
    // Insert spaces before capital letters or between lowercase-uppercase transitions
    // Then split on common word boundaries in domain names
    const businessName = domainBase
      // Insert space before sequences of uppercase or between camelCase
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      // Split common compound words (e.g. "papajoeshoney" → "papa joes honey")
      .replace(/([a-z])(papa|joe|honey|farm|ranch|market|craft|bake|sweet|fresh|green|mountain|valley|wild|north|south|east|west|fort|old|town|creek|river|lake|golden|silver|sun|moon|star|bear|fox|bee|oak|pine|maple|cedar|sage|rose|lily|daisy)/gi, "$1 $2")
      .replace(/(papa|joe|honey|farm|ranch|market|craft|bake|sweet|fresh|green|mountain|valley|wild|north|south|east|west|fort|old|town|creek|river|lake|golden|silver|sun|moon|star|bear|fox|bee|oak|pine|maple|cedar|sage|rose|lily|daisy)([a-z])/gi, "$1 $2")
      .split(/[\s-_]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    // Fetch the given page for content
    const pageHtml = await fetchPage(url);
    if (!pageHtml) {
      return NextResponse.json(
        { error: "Could not reach that website." },
        { status: 400 }
      );
    }

    // Extract content (description, headings, image) from the given page
    const content = extractContent(pageHtml, url);

    return NextResponse.json({
      businessName,
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
