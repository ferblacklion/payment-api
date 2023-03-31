import { Injectable } from '@nestjs/common';
import { StorageService } from '../services/google/storage.service';

import { CreateMediaDto } from './dto/create-media.dto';

@Injectable()
export class MediaService {
  constructor(private storageService: StorageService) {}
  create(createMediaDto: CreateMediaDto) {
    return this.storageService.create(createMediaDto);
  }
}
