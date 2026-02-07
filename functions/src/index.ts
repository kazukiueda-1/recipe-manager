import * as functions from "firebase-functions";
import cors from "cors";
import { scrapeRecipeFromUrl } from "./scrapeRecipe";
import { parseRecipeText, parseRecipeImage } from "./parseWithAI";

const corsHandler = cors({ origin: true });

export const scrapeRecipe = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
      }

      const { url } = req.body;
      if (!url) {
        res.status(400).json({ error: "URL is required" });
        return;
      }

      const content = await scrapeRecipeFromUrl(url);
      const recipe = await parseRecipeText(content);

      // Attach source info
      const sourceName = new URL(url).hostname.replace("www.", "");
      res.json({ ...recipe, sourceUrl: url, sourceName });
    } catch (error) {
      console.error("scrapeRecipe error:", error);
      res.status(500).json({ error: "Failed to parse recipe" });
    }
  });
});

export const parseVoiceText = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
      }

      const { text } = req.body;
      if (!text) {
        res.status(400).json({ error: "Text is required" });
        return;
      }

      const recipe = await parseRecipeText(text);
      res.json(recipe);
    } catch (error) {
      console.error("parseVoiceText error:", error);
      res.status(500).json({ error: "Failed to parse text" });
    }
  });
});

export const parseImage = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
      }

      const { image, mediaType } = req.body;
      if (!image || !mediaType) {
        res.status(400).json({ error: "image and mediaType are required" });
        return;
      }

      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(mediaType)) {
        res.status(400).json({ error: "Unsupported media type" });
        return;
      }

      const recipe = await parseRecipeImage(image, mediaType);
      res.json(recipe);
    } catch (error) {
      console.error("parseImage error:", error);
      res.status(500).json({ error: "Failed to parse image" });
    }
  });
});
