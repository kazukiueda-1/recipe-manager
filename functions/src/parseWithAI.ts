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

  return JSON.parse(content.text);
}
