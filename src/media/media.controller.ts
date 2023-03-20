import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { MediaService } from './media.service';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';
import { Express } from 'express';
import * as saltedMd5 from 'salted-md5';

//gs://presupuesto-app-1582410219393.appspot.com/family-payments-invoice
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
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

  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaService.remove(+id);
  }
}
