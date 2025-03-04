import _ from 'lodash';

const BASE64_MIMETYPE_REGEX = /^data:([\dA-Za-z]+\/[\d+.A-Za-z-]+).*,/;
const BASE64_HEADER_REGEX = /^data:image\/\w+;base64,/;

export function decodeBase64(base64String: string) {
    const matches = base64String.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string format');
    }

    const mimeType = matches[1]!;
    const imageData = Buffer.from(matches[2]!, 'base64');

    return {mimeType, imageData};
}

export function extractDataFromBase64(base64String: string | null) {
    if (_.isEmpty(base64String)) {
        return null;
    }

    return base64String!.replace(BASE64_HEADER_REGEX, '');
}

export function extractMimeTypeFromBase64(base64String: string | null) {
    if (_.isEmpty(base64String)) {
        return null;
    }

    const match = base64String!.match(BASE64_MIMETYPE_REGEX);

    if (!match) {
        return null;
    }

    return match[1] ?? null;
}

export function base64DataToBuffer(base64Data: string) {
    return Buffer.from(base64Data, 'base64');
}
