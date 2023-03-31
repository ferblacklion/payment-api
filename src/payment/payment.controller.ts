import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PatchPaymentDto } from './dto/patch-payment.dto';
import { TokenGuard } from '../guard/token.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as saltedMd5 from 'salted-md5';
import { MediaService } from '../media/media.service';

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly mediaService: MediaService,
  ) {}

  @Post()
  @UseGuards(TokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createPaymentDto: CreatePaymentDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|pdf)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 8 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      let image = null;
      if (file) {
        const name = saltedMd5(file.originalname, 'SUPER-S@LT!');
        const fileName = name + path.extname(file.originalname);

        image = await this.mediaService.create({
          fileName: `${fileName}`,
          buffer: file.buffer,
        });
      }

      return this.paymentService.create({ ...createPaymentDto, image });
    } catch (e) {
      throw e;
    }
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }
  @Patch(':id')
  @UseGuards(TokenGuard)
  async update(@Body() patchPaymentData: PatchPaymentDto, @Param() params) {
    try {
      const { id } = params;
      const updated = await this.paymentService.update(id, patchPaymentData);
      if (updated) return { success: true };
      return { success: false };
    } catch (e) {
      throw e;
    }
  }
}
