import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(
    @Headers('Authorization') auth: string,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    try {
      const keys = auth?.split(' ');
      if (keys?.[1] === '1234') {
        return this.paymentService.create(createPaymentDto);
      }
      return new HttpException('Missing auth', HttpStatus.FORBIDDEN);
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
