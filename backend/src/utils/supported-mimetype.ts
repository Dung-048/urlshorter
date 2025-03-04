/* eslint-disable @typescript-eslint/naming-convention */
export function getSupportImageExtension(
  mimeType: string | null,
): string | null {
  if (mimeType === null) {
    return null;
  }

  const lowerCaseMimeType = mimeType.toLowerCase();

  const mimeToExtension: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/jpe': 'jpg',
    'image/jfif': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/bmp': 'bmp',
    'image/webp': 'webp',
  };

  return mimeToExtension[lowerCaseMimeType] ?? null;
}
