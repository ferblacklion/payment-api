import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  person: string;
  @IsOptional()
  image: string;
}
