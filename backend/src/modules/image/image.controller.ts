import {
    BadRequestException,
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    Res,
    StreamableFile,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {ImageService} from './image.service';
import {ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {validUUid} from "../../utils/uuid.utils";
import {findFileExtensionByMimeType, getMimeType, validFileExtension} from "../../utils/file.utils";
import {createReadStream} from 'fs';
import {Response} from 'express';
import {ImageFormDto} from "./dto/image-form.dto";
import {decodeBase64} from "../../utils/base64.utils";

@ApiTags('Images')
@Controller('images')
export class ImageController {
    constructor(private readonly imageService: ImageService) {
    }

    @Post('upload/base64')
    async createBase64(@Body() data: ImageFormDto) {
        if (!data.file) {
            throw new BadRequestException('No base64 image provided');
        }

        const {mimeType, imageData} = decodeBase64(data.file);
        const extension = findFileExtensionByMimeType(mimeType);

        const file = {
            fieldname: 'file',
            originalname: 'image.' + extension,
            mimetype: mimeType,
            buffer: imageData,
            size: imageData.length
        } as Express.Multer.File;

        if (!file.mimetype.startsWith('image/')) {
            throw new BadRequestException('Uploaded file is not an image');
        }
        return {
            url: await this.imageService.create(file)
        };
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async create(@UploadedFile() file: Express.Multer.File) {
        if (!file.mimetype.startsWith('image/')) {
            throw new BadRequestException('Uploaded file is not an image');
        }
        return {
            url: await this.imageService.create(file)
        };
    }

    @Get(':fileName')
    @UseInterceptors(FileInterceptor('file'))
    async get(@Param('fileName') fileName: string, @Res({passthrough: true}) res: Response) {
        const [name, extension] = fileName.split('.');

        if (!validUUid(name) || !validFileExtension(extension)) {
            throw new NotFoundException('Invalid image name');
        }

        const path = await this.imageService.getFile(fileName);

        const file = createReadStream(path);

        res.set('Content-Type', getMimeType(fileName));
        res.set('Content-Disposition', `attachment; filename="${fileName}"`);

        return new StreamableFile(file);
    }
}
