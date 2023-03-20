import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PatchPaymentDto } from './dto/patch-payment.dto';
import { TokenGuard } from '../guard/token.guard';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @UseGuards(TokenGuard)
  create(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      return this.paymentService.create(createPaymentDto);
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
  @Get('/check')
  check() {
    return 'ok';
  }
}
