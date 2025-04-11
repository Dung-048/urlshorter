export class UrlUtils {
    static encodeUrl(url: string): string {
        return Buffer.from(url).toString('base64url');
    }
}