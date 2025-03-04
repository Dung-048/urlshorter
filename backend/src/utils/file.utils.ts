const validExtensions = ['jpe', 'jfif', 'bmp', 'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];

export function validFileExtension(extension?: string | null): boolean {
    if (!extension) {
        return false;
    }

    return validExtensions.includes(extension);
}

export function getMimeType(fileName: string): string {
    switch (fileName.split('.').pop()) {
        case 'jpe':
        case 'jfif':
        case 'jpeg':
        case 'jpg':
            return 'image/jpeg';
        case 'bmp':
            return 'image/bmp';
        case 'png':
            return 'image/png';
        case 'gif':
            return 'image/gif';
        case 'webp':
            return 'image/webp';
        case 'svg':
            return 'image/svg+xml';
        default:
            return 'application/octet-stream';
    }
}

export function findFileExtensionByMimeType(mimeType: string): string {
    switch (mimeType) {
        case 'image/jpeg':
            return 'jpg';
        case 'image/bmp':
            return 'bmp';
        case 'image/png':
            return 'png';
        case 'image/gif':
            return 'gif';
        case 'image/webp':
            return 'webp';
        case 'image/svg+xml':
            return 'svg';
        default:
            return 'bin';
    }
}
