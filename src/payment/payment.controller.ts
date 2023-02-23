import { Controller, Get, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
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
  @Get('/check')
  check() {
    return 'ok';
  }
}
