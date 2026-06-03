/**
 * Server-side PDF text-layer extraction.
 *
 * Used to ground LLM-extracted values against the actual text content of the
 * PDF so we can detect transcription errors (e.g., wallet address with an
 * inserted space, or a transposed character).
 *
 * Uses `unpdf` (a serverless-friendly PDF.js build) rather than `pdf-parse`,
 * which relies on a native binding that fails to load via dynamic import in
 * the deployed environment.
 *
 * Returns an empty string on any failure — callers should treat empty raw
 * text as "no grounding available" and fall back to format-only validation.
 */
export async function extractPdfText(base64Pdf: string): Promise<string> {
  try {
    const { extractText, getDocumentProxy } = await import("unpdf");
    const buffer = Buffer.from(base64Pdf, "base64");
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const { text } = await extractText(pdf, { mergePages: true });
    return typeof text === "string" ? text : "";
  } catch (err) {
    console.warn(
      "extractPdfText failed; continuing without text grounding:",
      err,
    );
    return "";
  }
}
