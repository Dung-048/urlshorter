import {Injectable} from '@nestjs/common';
import {ApiConfigService} from "../../shared/services/api-config.service";
import {v4 as uuid} from 'uuid';
import sharp from "sharp";


@Injectable()
export class ImageService {

    constructor(private readonly apiConfigService: ApiConfigService) {
    }

    async getFile(name: string) {
        return `${this.apiConfigService.imageService.storeDirectory}/${name}`
    }

    async create(file: Express.Multer.File) {
        const directory = this.apiConfigService.imageService.storeDirectory;
        const fileExtension = file.originalname.split('.').pop();
        const fileName = `${uuid()}.${fileExtension}`;
        const filePath = `${directory}/${fileName}`;

        await this.resizeImage(file, filePath);

        return `${this.apiConfigService.apiDomain}/images/${fileName}`;
    }

    private async resizeImage(file: Express.Multer.File, saveTo: string) {
        const imageLimitSize = this.apiConfigService.imageService.imageLimitSize;

        const image = sharp(file.buffer);
        const metadata = await image.metadata();
        const width = metadata.width!;
        const height = metadata.height!;
        const scale = Math.max(width, height) / imageLimitSize;

        if (scale > 1) {
            await image.resize(Math.ceil(width / scale), Math.ceil(height / scale))
                .toFile(saveTo);
        }

        image.toFile(saveTo);
    }

}
