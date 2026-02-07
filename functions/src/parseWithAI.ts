import Anthropic from "@anthropic-ai/sdk";

const RECIPE_PROMPT = `あなたはレシピ解析アシスタントです。与えられたテキストからレシピ情報を抽出し、以下のJSON形式で返してください。
テキストがレシピでない場合は、できる限りの情報を推測してください。

{
  "title": "レシピ名",
  "description": "簡単な説明",
  "ingredients": [{"name": "材料名", "amount": "量", "unit": "単位"}],
  "steps": [{"order": 1, "instruction": "手順の説明"}],
  "servings": "2人分",
  "cookingTime": 30,
  "category": "主菜/副菜/汁物/ご飯もの/麺類/デザートのいずれか",
  "tags": ["和食", "簡単"],
  "sourceName": "サイト名(わかれば)",
  "memo": ""
}

JSONのみ返してください。マークダウンのコードブロックは不要です。`;

export async function parseRecipeText(text: string): Promise<Record<string, unknown>> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error("Anthropic API key not configured");
  }

  const client = new Anthropic({ apiKey });

  const message = await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: `${RECIPE_PROMPT}\n\n---\n\n${text}`,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type");
  }

  // Strip markdown code blocks if present
  let jsonText = content.text.trim();
  if (jsonText.startsWith("```")) {
    jsonText = jsonText.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
  }

  return JSON.parse(jsonText);
}

const IMAGE_RECIPE_PROMPT = `あなたはレシピ解析アシスタントです。与えられた画像からレシピ情報を読み取り、以下のJSON形式で返してください。
画像が料理本やレシピカードの場合は、記載されている内容を正確に読み取ってください。
料理の写真のみの場合は、料理名を推測し、一般的なレシピを作成してください。

{
  "title": "レシピ名",
  "description": "簡単な説明",
  "ingredients": [{"name": "材料名", "amount": "量", "unit": "単位"}],
  "steps": [{"order": 1, "instruction": "手順の説明"}],
  "servings": "2人分",
  "cookingTime": 30,
  "category": "主菜/副菜/汁物/ご飯もの/麺類/デザートのいずれか",
  "tags": ["和食", "簡単"],
  "memo": ""
}

JSONのみ返してください。マークダウンのコードブロックは不要です。`;

export async function parseRecipeImage(
  base64: string,
  mediaType: "image/jpeg" | "image/png" | "image/gif" | "image/webp"
): Promise<Record<string, unknown>> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error("Anthropic API key not configured");
  }

  const client = new Anthropic({ apiKey });

  const message = await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mediaType,
              data: base64,
            },
          },
          {
            type: "text",
            text: IMAGE_RECIPE_PROMPT,
          },
        ],
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type");
  }

  let jsonText = content.text.trim();
  if (jsonText.startsWith("```")) {
    jsonText = jsonText.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
  }

  return JSON.parse(jsonText);
}
