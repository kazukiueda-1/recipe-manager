import * as cheerio from "cheerio";

export async function scrapeRecipeFromUrl(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; RecipeBot/1.0)",
      "Accept": "text/html",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  // Remove script, style, nav, footer
  $("script, style, nav, footer, header, aside, iframe").remove();

  // Try to extract main content
  const selectors = [
    '[itemtype*="Recipe"]',
    ".recipe-content",
    ".recipe_body",
    "#recipe",
    "article",
    "main",
    "body",
  ];

  let content = "";
  for (const selector of selectors) {
    const el = $(selector).first();
    if (el.length && el.text().trim().length > 100) {
      content = el.text().replace(/\s+/g, " ").trim();
      break;
    }
  }

  if (!content) {
    content = $("body").text().replace(/\s+/g, " ").trim();
  }

  // Limit content length
  return content.slice(0, 5000);
}
