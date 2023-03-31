import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  UseGuards,
} from '@nestjs/common';
import { MediaService } from './media.service';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';
import { Express } from 'express';
import * as saltedMd5 from 'salted-md5';
import { TokenGuard } from '../guard/token.guard';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @UseGuards(TokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 8 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const name = saltedMd5(file.originalname, 'SUPER-S@LT!');
    const fileName = name + path.extname(file.originalname);

    const image_url = await this.mediaService.create({
      fileName: `${fileName}`,
      buffer: file.buffer,
    });

    return { success: true, image_url };
  }
}
