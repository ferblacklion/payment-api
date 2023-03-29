import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { StorageService } from '../services/google/storage.service';

@Module({
  controllers: [MediaController],
  providers: [MediaService, StorageService],
})
export class MediaModule {}
