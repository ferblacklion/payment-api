import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';
import { IsOptional } from 'class-validator';

export class PatchPaymentDto extends PartialType(CreatePaymentDto) {
  @IsOptional()
  image: string;
}
