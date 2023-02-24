import { IsNotEmpty } from 'class-validator';

export class CreateMediaDto {
  @IsNotEmpty()
  fileName: string;
  @IsNotEmpty()
  buffer: Buffer;
}
