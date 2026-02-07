const FUNCTIONS_BASE_URL = 'https://us-central1-family-recipe-app-76c4b.cloudfunctions.net';

export async function scrapeAndParseRecipe(url: string) {
  const response = await fetch(`${FUNCTIONS_BASE_URL}/scrapeRecipe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  if (!response.ok) throw new Error('レシピの取得に失敗しました');
  return response.json();
}

export async function parseVoiceText(text: string) {
  const response = await fetch(`${FUNCTIONS_BASE_URL}/parseVoiceText`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) throw new Error('テキストの解析に失敗しました');
  return response.json();
}

export async function parseRecipeImage(image: string, mediaType: string) {
  const response = await fetch(`${FUNCTIONS_BASE_URL}/parseImage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image, mediaType }),
  });
  if (!response.ok) throw new Error('画像の解析に失敗しました');
  return response.json();
}
